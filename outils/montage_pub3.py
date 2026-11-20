# Montage de la pub 3 « 2005 » (DIMI contre YANIS) : python3 montage_pub3.py <dossier de travail> <sortie.mp4> [runway|voix]
# Le dossier de travail contient : f11/ (images du plan de 11 s), fc/ (retournement de card_c), f/ (retournement de card_a),
# les sons pub3_11s.mp4, pub3_test4s.mp4, pub3_test4s_c.mp4, pub3_voix_dimi.mp3, pub3_voix_yanis.mp3, carton.mp4 (anim2.py)
# et annonceur.mp3 (voix « Papolé ! On va pas polémiquer ! »).
# « voix » : les répliques sont les fichiers de voix d'origine posés sur l'image ; « runway » : le son généré par Runway.
import os, sys, subprocess, numpy as np
from PIL import Image, ImageDraw, ImageFont
D, OUT = sys.argv[1], sys.argv[2]
MODE = sys.argv[3] if len(sys.argv) > 3 else "voix"
W, H, FPS, SR = 1080, 1920, 24, 48000
ICI = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(ICI, "carton", "bowlby.ttf")

def img(dossier, n):
    return Image.open(f"{D}/{dossier}/{n:03d}.png").convert("RGB")

def son(fichier, debut, duree):
    """Son mono 48 kHz d'un fichier, de debut à debut+duree (secondes), complété de silence."""
    r = subprocess.run(["ffmpeg", "-v", "error", "-ss", str(debut), "-t", str(duree), "-i", f"{D}/{fichier}",
                        "-ac", "1", "-ar", str(SR), "-f", "s16le", "-"], capture_output=True, check=True).stdout
    a = np.frombuffer(r, dtype=np.int16).astype(np.float32) / 32768
    n = int(round(duree * SR))
    return np.pad(a, (0, max(0, n - len(a))))[:n]

def etoile(fr, boite):
    """Couvre l'étoile de Runway (texte déformé) par une étoile dessinée à la main avec « PAPOLÉ ! »."""
    x0, y0, x1, y1 = boite
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    rx, ry = (x1 - x0) / 2 + 22, (y1 - y0) / 2 + 22
    d = ImageDraw.Draw(fr)
    pts = []
    for k in range(32):
        a = k * np.pi / 16
        f = 1.0 if k % 2 == 0 else 0.62
        pts.append((cx + rx * f * np.cos(a), cy + ry * f * np.sin(a)))
    d.polygon(pts, fill=(20, 10, 10))
    pts2 = [(cx + (p[0] - cx) * 0.9, cy + (p[1] - cy) * 0.9) for p in pts]
    d.polygon(pts2, fill=(255, 205, 40))
    pts3 = [(cx + (p[0] - cx) * 0.62, cy + (p[1] - cy) * 0.62) for p in pts]
    d.polygon(pts3, fill=(255, 245, 170))
    taille = int(rx * 0.30)
    fo = ImageFont.truetype(FONT, taille)
    t = "PAPOLÉ !"
    bb = d.textbbox((0, 0), t, font=fo, stroke_width=max(2, taille // 9))
    d.text((cx - (bb[2] - bb[0]) / 2 - bb[0], cy - (bb[3] - bb[1]) / 2 - bb[1]), t, font=fo, fill=(200, 20, 24),
           stroke_width=max(2, taille // 9), stroke_fill=(20, 10, 10))

# Boîtes de l'étoile de Runway (images 239 à 245 du plan de 11 s, en pixels 480×854), un peu élargies.
BOITES = {239: (144, 603, 336, 735), 240: (108, 568, 365, 755), 241: (70, 529, 415, 794), 242: (71, 529, 418, 793),
          243: (71, 529, 418, 793), 244: (71, 529, 418, 793), 245: (71, 529, 418, 793)}

plans = []  # (liste d'images 480×854, son)
# 1. Les deux cartes posées face cachée (plan de 11 s, 0 à 2,1 s). Ici viendront les mains de Léo.
plans.append(([img("f11", i) for i in range(1, 52)], son("pub3_11s.mp4", 0, 51 / FPS)))
# 1 bis. Les mains de Léo (« Pa-po-lé », puis les deux V) : mains.mp4 s'il est là, sinon 3,5 s d'écran noir avec « PAPOLÉ ! ».
if os.path.exists(f"{D}/mains.mp4"):
    os.makedirs(f"{D}/fm", exist_ok=True)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{D}/mains.mp4", "-vf", f"fps={FPS},scale=480:854",
                    f"{D}/fm/%03d.png"], check=True)
    fm = sorted(os.listdir(f"{D}/fm"))
    plans.append(([Image.open(f"{D}/fm/{x}").convert("RGB") for x in fm], son("mains.mp4", 0, len(fm) / FPS)))
else:
    noir = Image.new("RGB", (480, 854), (0, 0, 0))
    sp = np.zeros(int(3.5 * SR), dtype=np.float32)
    pp = son("papole.mp3", 0, 2.09)
    sp[int(0.4 * SR):int(0.4 * SR) + len(pp)] = pp
    plans.append(([noir] * int(3.5 * FPS), sp))
# 2. DIMI retourne le Cher Dirigeant (test card_c, 0,1 à 3,0 s).
plans.append(([img("fc", i) for i in range(3, 73)], son("pub3_test4s_c.mp4", 2 / FPS, 70 / FPS)))
# 3. DIMI parle (plan de 11 s, 2,1 à 6,0 s).
s3 = son("pub3_11s.mp4", 51 / FPS, 93 / FPS)
if MODE == "voix":
    v = np.pad(son("pub3_voix_dimi.mp3", 0, 3.36), (int(0.3 * SR), 0))[:len(s3)]
    s3 = np.zeros_like(s3); s3[:len(v)] = v
plans.append(([img("f11", i) for i in range(52, 145)], s3))
# 4. Le moustachu apparaît (test card_a) : le dos seul, puis la face seule (la main du test est celle de DIMI : coupée).
dos = [img("f", 1)] * 10
face = [img("f", i) for i in range(46, 49)] + [img("f", 48)] * 21
plans.append((dos + face, np.concatenate([son("pub3_test4s.mp4", 0, 10 / FPS), son("pub3_test4s.mp4", 0.95, 24 / FPS)])))
# 5. YANIS parle (plan de 11 s, 6,0 à 8,0 s), puis 6. gros plan de DIMI qui se fige (8,0 à 9,1 s).
s5 = son("pub3_11s.mp4", 144 / FPS, 49 / FPS)
s6 = son("pub3_11s.mp4", 193 / FPS, 26 / FPS)
if MODE == "voix":
    v = son("pub3_voix_yanis.mp3", 0, 3.2)
    both = np.zeros(len(s5) + len(s6), dtype=np.float32)
    both[:len(v)] += v[:len(both)]
    s5, s6 = both[:len(s5)], both[len(s5):]
plans.append(([img("f11", i) for i in range(145, 194)], s5))
plans.append(([img("f11", i) for i in range(194, 220)], s6))
# 7. La table fracassée (9,1 à 11 s), étoile de Runway remplacée.
k = []
for i in range(220, 266):
    if not os.path.exists(f"{D}/f11/{i:03d}.png"):
        break
    fr = img("f11", i)
    if i in BOITES:
        etoile(fr, BOITES[i])
    k.append(fr)
plans.append((k, son("pub3_11s.mp4", 219 / FPS, len(k) / FPS)))

os.makedirs(f"{D}/montage", exist_ok=True)
n = 0
audio = []
for frames, a in plans:
    for fr in frames:
        n += 1
        fr.resize((W, H), Image.LANCZOS).save(f"{D}/montage/{n:05d}.png")
    audio.append(a)
# 8. Carton final (5 s, sans IA) avec la voix de l'annonceur.
nc = 0
r = subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{D}/carton.mp4", f"{D}/montage/c%05d.png"])
for f in sorted(x for x in os.listdir(f"{D}/montage") if x.startswith("c")):
    n += 1; nc += 1
    os.rename(f"{D}/montage/{f}", f"{D}/montage/{n:05d}.png")
ca = np.zeros(int(nc / FPS * SR), dtype=np.float32)
an = son("annonceur.mp3", 0, 3.0)
p0 = int(1.8 * SR)
ca[p0:p0 + len(an)] += an[:max(0, len(ca) - p0)]
audio.append(ca)
a = np.concatenate(audio)
a = np.clip(a / max(1e-6, np.abs(a).max()) * 0.9, -1, 1)
open(f"{D}/montage.raw", "wb").write((a * 32767).astype(np.int16).tobytes())
subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", str(FPS), "-i", f"{D}/montage/%05d.png",
                "-f", "s16le", "-ar", str(SR), "-ac", "1", "-i", f"{D}/montage.raw",
                "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-c:a", "aac", "-b:a", "192k", "-ac", "2",
                "-shortest", OUT], check=True)
print("images", n, "durée", round(n / FPS, 2), "s ->", OUT)
