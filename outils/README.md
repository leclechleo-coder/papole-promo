# Outils des pubs Runway de Papolé

Dépôt PUBLIC (servi par jsDelivr pour que Runway lise les images de référence) :
`https://cdn.jsdelivr.net/gh/leclechleo-coder/papole-promo@<commit>/<chemin>` (attendre environ 60 s après un push, sinon 404).
Ne jamais mettre ici de vidéo finale (elles vont dans le dépôt privé `leclechleo-coder/medias-jeux`, et seulement après l'accord de Léo).

| Chemin | Rôle |
|---|---|
| `serve.py` | `python3 serve.py /chemin/vers/PAPOL-/web` : sert les pages de rendu sur le port 8766 |
| `render_card.py` | `python3 render_card.py "Le Chat" sortie.png` : vraie carte officielle (1212×1659, fond transparent) rendue par le moteur du jeu (Chrome + playwright, `/usr/bin/google-chrome`) |
| `render_fusion.py` | `python3 render_fusion.py "<P>" "<E>" "<O>" sortie.png` : la carte fusionnée Tag-team de trois cartes |
| `web/` | pages `_promo_carte.html`, `_promo_fusion.html` et leurs scripts (absentes du dépôt du jeu) |
| `carton/anim2.py` | carton final 5 s, 1080×1920 (logo, deux cartes, badge 18+, slogan, extinction cathodique). Lancer depuis `carton/` ; remplacer `k.png`/`n.png` par les deux cartes voulues ; sortie dans `frames2/`, puis `ffmpeg -framerate 24 -i frames2/f%04d.png -c:v libx264 -pix_fmt yuv420p -crf 16 carton.mp4` |
| `dos_de_carte/` | correction image par image d'un dos de carte dans une vidéo (pub 1) : bords mesurés automatiquement, dos opaque, grain et exposition raccordés |
| `prompts_qui_marchent/` | les deux prompts Seedance qui ont donné les pubs 1 et 2 (modèles à suivre : courts) |
| `../voix/` | voix déjà validées (annonceur Mathieu « PAPOLÉ ! », « Papolé ! On va pas polémiquer ! », LISA) |
| `../assets*/` | images de référence envoyées à Runway (cartes avec noms neutres : `card_a`, `card_b`…) |
