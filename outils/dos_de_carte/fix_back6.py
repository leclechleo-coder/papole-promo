import cv2,numpy as np,os,shutil,json
from quads6 import fit,expand
dos=cv2.imread('gen_back.png',cv2.IMREAD_UNCHANGED); dh,dw=dos.shape[:2]
os.makedirs('fr_fix6',exist_ok=True)
for f in sorted(os.listdir('fr')): shutil.copy('fr/'+f,'fr_fix6/'+f)
ims={i:cv2.imread(f'fr/{i:04d}.png') for i in range(110,126)}
body=np.array([44,35,108],np.float32)
SRC=np.float32([[0,0],[dw,0],[dw,dh],[0,dh]])

# ---- sharp frames 115-120 : auto-fitted outer edge, expanded by 1 px, opaque
AUTO={}
for i in range(115,121):
    q,_=fit(i); AUTO[i]=expand(q,1.0)
# per-frame look: (texture gaussian blur, vertical motion blur px, alpha feather sigma)
LOOK={115:(2.0,0,1.4),116:(1.0,0,0.9),117:(1.0,0,0.9),118:(1.0,0,0.9),119:(1.3,3,1.2),120:(1.6,6,1.8)}

def warp_back(q):
    M=cv2.getPerspectiveTransform(SRC,np.float32(q))
    w=cv2.warpPerspective(dos,M,(480,854),flags=cv2.INTER_AREA,borderMode=cv2.BORDER_CONSTANT,borderValue=(0,0,0,0))
    w3=w[...,:3].astype(np.float32); wa=w[...,3:4].astype(np.float32)/255.0
    return w3*wa+body*(1-wa)   # rounded corners of the source filled with body colour -> no hole inside the quad

def poly_alpha(q,feather):
    # anti-aliased polygon rendered at 4x then downsampled, then feathered
    big=np.zeros((854*4,480*4),np.uint8); cv2.fillConvexPoly(big,np.int32(np.round(np.array(q)*4)),255,lineType=cv2.LINE_AA)
    a=cv2.resize(big,(480,854),interpolation=cv2.INTER_AREA).astype(np.float32)/255.0
    if feather>0: a=cv2.GaussianBlur(a,(0,0),feather)
    return a

def vblur(img,k):
    if k<=1: return img
    ker=np.zeros((int(k),1),np.float32); ker[:,0]=1.0/int(k); return cv2.filter2D(img,-1,ker)

# exposure matching on a patch of the sofa, grain correlated frame to frame
ref={i:cv2.cvtColor(ims[i],cv2.COLOR_BGR2GRAY)[40:120,20:120].mean() for i in range(112,123)}
refm=float(np.mean([ref[i] for i in range(115,121)]))
rs=np.random.RandomState(11); noise_prev=None
def grain():
    global noise_prev
    nz=rs.normal(0,2.0,(854,480,3)).astype(np.float32)
    noise_prev=nz if noise_prev is None else 0.7*noise_prev+0.3*nz
    return noise_prev

def composite(i,q,tex_blur,vk,feather,alpha_mul=1.0,alpha_map=None):
    im=ims[i].astype(np.float32)
    w3=warp_back(q)
    if tex_blur>0: w3=cv2.GaussianBlur(w3,(0,0),tex_blur)
    w3=vblur(w3,vk)
    gain=float(np.clip(ref[i]/refm,0.92,1.08)); w3=np.clip(w3*gain,0,255)
    w3=np.clip(w3+grain(),0,255)
    a=poly_alpha(q,feather)
    a=vblur(a,vk)
    if alpha_map is not None: a=a*alpha_map
    alpha=(a*alpha_mul)[...,None]
    out=np.clip(im*(1-alpha)+w3*alpha,0,255).astype(np.uint8)
    cv2.imwrite(f'fr_fix6/{i:04d}.png',out); return out

yy=np.mgrid[0:854,0:480][0].astype(np.float32)
# 112 : card just starting to rise, magenta smear -> tint with blurred back
composite(112,[(204,263),(270,250),(289,345),(210,356)],4.0,12,3.0,alpha_mul=0.55)
# 113 : translucent mid-flight smear
composite(113,[(192,174),(276,182),(268,322),(196,318)],5.0,10,4.0,alpha_mul=0.6)
# 114 : strongly motion-blurred, almost in place
composite(114,[(193,172),(280,184),(270,297),(187,288)],3.5,4,3.5,alpha_mul=0.85)
# 115-120 : opaque, measured
for i in range(115,121):
    tb,vk,fe=LOOK[i]; composite(i,AUTO[i],tb,vk,fe,1.0)
# 121-122 : card dropping fast, long vertical smear
composite(121,[(195,272),(300,274),(300,425),(195,423)],3.0,35,3.0,alpha_mul=0.9,alpha_map=np.clip((440-yy)/40.0,0,1))
composite(122,[(195,325),(300,327),(300,485),(195,483)],4.0,45,3.0,alpha_mul=0.6,alpha_map=np.clip((500-yy)/40.0,0,1))
json.dump({i:np.array(AUTO[i]).tolist() for i in AUTO},open('auto_quads6.json','w'))
print('done')
