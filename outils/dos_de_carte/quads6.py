import cv2,numpy as np,json
# robust per-side line fit of the card's outer (white border) edge, frames 115-120
SEED={115:[[205,166],[280,206],[255,299],[183,253]],116:[[212,167],[297,204],[266,307],[184,271]],
      117:[[209,176],[298,200],[273,313],[189,291]],118:[[207,184],[299,202],[279,321],[190,303]],
      119:[[206,195],[299,208],[283,331],[193,317]],120:[[204,210],[297,220],[287,345],[195,337]]}
def inter(l1,l2):
    (vx1,vy1,x1,y1),(vx2,vy2,x2,y2)=l1,l2
    A=np.array([[vx1,-vx2],[vy1,-vy2]],np.float64); b=np.array([x2-x1,y2-y1],np.float64)
    t=np.linalg.solve(A,b); return (x1+vx1*t[0], y1+vy1*t[0])
def fit(i,thS=90,thV=140):
    im=cv2.imread(f'fr/{i:04d}.png'); hsv=cv2.cvtColor(im,cv2.COLOR_BGR2HSV); S,V=hsv[...,1],hsv[...,2]
    m=((S<thS)&(V>thV)).astype(np.uint8)*255
    reg=np.zeros_like(m); cv2.fillConvexPoly(reg,np.array(SEED[i],np.int32),255); reg=cv2.dilate(reg,np.ones((21,21),np.uint8))
    m=cv2.bitwise_and(m,reg); m=cv2.morphologyEx(m,cv2.MORPH_CLOSE,np.ones((5,5),np.uint8))
    n,lab,st,_=cv2.connectedComponentsWithStats(m); k=1+np.argmax(st[1:,4]); mm=(lab==k).astype(np.uint8)*255
    cnt,_=cv2.findContours(mm,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE); c=max(cnt,key=cv2.contourArea)
    hull=cv2.convexHull(c).reshape(-1,2).astype(np.float32)
    # densify hull edges so every side has many points
    pts=[]
    for a,b in zip(hull,np.roll(hull,-1,0)):
        n_=int(max(2,np.linalg.norm(b-a)))
        for t in np.linspace(0,1,n_,endpoint=False): pts.append(a+(b-a)*t)
    pts=np.array(pts,np.float32)
    rect=cv2.minAreaRect(c); box=cv2.boxPoints(rect)  # 4 corners
    # order box: top-left, top-right, bottom-right, bottom-left
    s=box.sum(1); d=box[:,0]-box[:,1]
    tl=box[np.argmin(s)]; br=box[np.argmax(s)]; tr=box[np.argmax(d)]; bl=box[np.argmin(d)]
    sides=[(tl,tr),(tr,br),(br,bl),(bl,tl)]
    lines=[]
    for a,b in sides:
        ab=b-a; L=np.linalg.norm(ab); nrm=np.array([-ab[1],ab[0]])/L
        dist=np.abs((pts-a)@nrm); along=((pts-a)@ab)/L
        sel=pts[(dist<4.0)&(along>L*0.08)&(along<L*0.92)]
        vx,vy,x0,y0=cv2.fitLine(sel.reshape(-1,1,2),cv2.DIST_HUBER,0,0.01,0.01).ravel()
        lines.append((vx,vy,x0,y0))
    q=[inter(lines[3],lines[0]),inter(lines[0],lines[1]),inter(lines[1],lines[2]),inter(lines[2],lines[3])]
    return np.array(q,np.float32),mm
def expand(q,d):
    q=np.array(q,np.float32); out=[]
    for k in range(4):
        p=q[k]; a=q[(k-1)%4]; b=q[(k+1)%4]
        u=(a-p)/np.linalg.norm(a-p); v=(b-p)/np.linalg.norm(b-p); bis=u+v; bis/=np.linalg.norm(bis)
        ang=np.arccos(np.clip(np.dot(u,v),-1,1)); out.append(p-bis*(d/np.sin(ang/2)))
    return np.array(out,np.float32)
if __name__=='__main__':
    res={}
    for i in range(115,121):
        q,mm=fit(i); res[i]=q.tolist(); print(i,np.round(q,1).tolist())
        im=cv2.imread(f'fr/{i:04d}.png'); z=cv2.resize(im[150:360,160:320],None,fx=5,fy=5,interpolation=cv2.INTER_CUBIC)
        P=lambda p:(int(round((p[0]-160)*5)),int(round((p[1]-150)*5)))
        cv2.polylines(z,[np.array([P(p) for p in q],np.int32)],True,(0,255,0),1)
        cv2.polylines(z,[np.array([P(p) for p in expand(q,1.0)],np.int32)],True,(255,255,0),1)
        cv2.imwrite(f'fit_{i}.png',z)
    json.dump(res,open('quads6.json','w'))
