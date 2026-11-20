from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageEnhance
import math, random, os
W,H=1080,1920; FPS=24; DUR=5.0; N=int(DUR*FPS)
logo=Image.open('logo.webp').convert('RGBA'); k=Image.open('k.png').convert('RGBA'); n=Image.open('n.png').convert('RGBA')
bg=Image.new('RGB',(W,H),(60,8,10))
vig=Image.new('L',(W,H),0); d=ImageDraw.Draw(vig)
for i in range(60,0,-1):
    r=int(255*(1-i/60)**1.5); d.ellipse([W//2-i*14,H//2-i*24,W//2+i*14,H//2+i*24],fill=r)
vig=vig.filter(ImageFilter.GaussianBlur(80))
bg=Image.composite(Image.new('RGB',(W,H),(120,16,20)),bg,vig)
lw=820; lh=int(logo.height*lw/logo.width); L=logo.resize((lw,lh),Image.LANCZOS)
ch=720; cw=int(k.width*ch/k.height); K=k.resize((cw,ch),Image.LANCZOS).rotate(4,expand=True,resample=Image.BICUBIC); Nn=n.resize((cw,ch),Image.LANCZOS).rotate(-4,expand=True,resample=Image.BICUBIC)
gap=40; total=2*cw+gap; x0=(W-total)//2; cy=1010
bd=Image.new('RGBA',(260,260),(0,0,0,0)); bdd=ImageDraw.Draw(bd)
bdd.ellipse([10,10,250,250],fill=(200,20,24,255),outline=(255,255,255,255),width=12)
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',96)
tw=bdd.textlength('18+',font=font); bdd.text(((260-tw)/2,70),'18+',font=font,fill='white')
def ease_out_back(t):
    c1=1.70158; c3=c1+1; return 1+c3*(t-1)**3+c1*(t-1)**2
def scaled(img,s):
    s=max(s,0.01); return img.resize((max(1,int(img.width*s)),max(1,int(img.height*s))),Image.BICUBIC)
def paste_center(base,img,cx,cy):
    base.alpha_composite(img,(int(cx-img.width/2),int(cy-img.height/2)))
def shadow(base,img,cx,cy):
    sh=Image.new('RGBA',(img.width+80,img.height+80),(0,0,0,0)); sd=ImageDraw.Draw(sh); sd.rounded_rectangle([40,40,40+img.width,40+img.height],30,fill=(0,0,0,150))
    sh=sh.filter(ImageFilter.GaussianBlur(25)); paste_center(base,sh,cx,cy+12)
os.makedirs('frames2',exist_ok=True)
# slogan
sf=ImageFont.truetype('bowlby.ttf',92); TXT='ON VA PAS POLÉMIQUER !'
tmp=ImageDraw.Draw(Image.new('RGBA',(10,10))); bb=tmp.textbbox((0,0),TXT,font=sf,stroke_width=10)
SW,SH=bb[2]-bb[0]+40,bb[3]-bb[1]+40
SL=Image.new('RGBA',(SW,SH),(0,0,0,0)); sd=ImageDraw.Draw(SL)
sd.text((20-bb[0]+8,20-bb[1]+10),TXT,font=sf,fill=(0,0,0,200),stroke_width=10,stroke_fill=(0,0,0,200))
sd.text((20-bb[0],20-bb[1]),TXT,font=sf,fill=(246,228,186,255),stroke_width=10,stroke_fill=(150,10,14,255))
if SW>1000: SL=SL.resize((1000,int(SH*1000/SW)),Image.LANCZOS)
SL=SL.rotate(-3,expand=True,resample=Image.BICUBIC)
random.seed(1)
for f in range(N):
    t=f/FPS
    base=bg.convert('RGBA')
    # logo 0.3-0.75 : flies in from huge to normal with back ease
    if t>=0.3:
        p=min(1,(t-0.3)/0.45); s=3.0-2.0*ease_out_back(p) if p<1 else 1.0
        s=max(1.0,s) if p<1 else 1.0
        img=scaled(L,s); 
        breath=1+0.012*math.sin((t-0.75)*2*math.pi/2.2) if t>0.75 else 1
        img=scaled(img,breath); paste_center(base,img,W/2,250+lh/2)
    # cards stamp 0.9 (K) and 1.2 (N): from 1.6 scale to 1 with ease
    for img,t0,cx in ((K,0.9,x0-10+K.width/2),(Nn,1.2,x0+cw+gap+10+Nn.width/2)):
        if t>=t0:
            p=min(1,(t-t0)/0.3); s=1.6-0.6*ease_out_back(p) if p<1 else 1.0
            im=scaled(img,s); cyy=cy+img.height/2
            if p>=1: shadow(base,im,cx,cyy)
            paste_center(base,im,cx,cyy)
    # badge 1.6
    if t>=1.6:
        p=min(1,(t-1.6)/0.3); s=ease_out_back(p) if p<1 else 1.0
        im=scaled(bd,s); paste_center(base,im,W-170,190)
    if t>=1.9:
        p=min(1,(t-1.9)/0.25); s=2.2-1.2*ease_out_back(p) if p<1 else 1.0
        im=scaled(SL,s); paste_center(base,im,W/2,905)
    # impact shake
    dy=0
    for t0 in (0.75,1.2,1.5,2.15):
        if 0<=t-t0<2/FPS: dy=10 if int((t-t0)*FPS)%2==0 else -10
    fr=base.convert('RGB')
    if dy: fr=fr.transform(fr.size,Image.AFFINE,(1,0,0,0,1,dy))
    # camcorder look: saturation, slight blur, noise, scanlines
    fr=ImageEnhance.Color(fr).enhance(1.25).filter(ImageFilter.GaussianBlur(0.8))
    noise=Image.effect_noise((W,H),18).convert('L')
    fr=Image.blend(fr,Image.merge('RGB',(noise,noise,noise)),0.06)
    sl=Image.new('L',(W,H),255); sld=ImageDraw.Draw(sl)
    for y in range(0,H,4): sld.line([(0,y),(W,y)],fill=225)
    fr=Image.composite(fr,Image.new('RGB',(W,H),(0,0,0)),sl)
    # CRT off 3.7-4.0
    if t>=4.7:
        p=min(1,(t-4.7)/0.25)
        if p<0.8:
            h=max(4,int(H*(1-p/0.8)**2)); line=fr.resize((W,h)); fr=Image.new('RGB',(W,H),(0,0,0)); fr.paste(line,(0,(H-h)//2))
            if h<40:
                br=ImageEnhance.Brightness(fr).enhance(2.5); fr=br
        else:
            w=max(2,int(W*(1-(p-0.8)/0.2))); fr=Image.new('RGB',(W,H),(0,0,0)); dd=ImageDraw.Draw(fr); dd.rectangle([(W-w)//2,H//2-3,(W+w)//2,H//2+3],fill=(255,255,255))
    fr.save(f'frames2/f{f:04d}.png')
print('frames',N)
