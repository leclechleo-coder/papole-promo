#!/bin/sh
# Plan des mains de la pub 3, tiré de la vidéo de Léo (20261120_234509.mp4, téléphone vertical, 73 s) :
#   sh mains_pub3.sh <video_de_leo.mp4> <papole.mp3> <sortie mains.mp4>
# 51,5-54,0 s : les poings (« Pa-po-lé ») ; 59,467 s : les deux V, figés 0,9 s. Recadré sur la table seule (754×1340),
# retourné en miroir (ongles noirs = DIMI à gauche), couleurs rapprochées de la table de Runway, grain.
set -e
S="$1"; P="$2"; O="$3"; T=$(mktemp -d)
F="crop=754:1340:163:160,hflip,scale=480:854:flags=lanczos,colorchannelmixer=rr=1.10:gg=1.0:bb=1.18,eq=brightness=0.07:contrast=0.88:saturation=0.85,noise=alls=7:allf=t,fps=24"
ffmpeg -v error -y -ss 51.5 -t 2.5 -i "$S" -vf "$F" -an -c:v libx264 -crf 14 "$T/a.mp4"
ffmpeg -v error -y -ss 59.467 -t 0.15 -i "$S" -vf "$F,tpad=stop_mode=clone:stop_duration=0.9" -an -c:v libx264 -crf 14 "$T/b.mp4"
printf "file a.mp4\nfile b.mp4\n" > "$T/l.txt"
ffmpeg -v error -y -f concat -i "$T/l.txt" -c copy "$T/v.mp4"
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$T/v.mp4")
ffmpeg -v error -y -i "$T/v.mp4" -f lavfi -t "$D" -i anullsrc=r=48000:cl=mono -i "$P" \
  -filter_complex "[2:a]adelay=300|300,apad[p];[1:a][p]amix=inputs=2:duration=first:normalize=0[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -shortest "$O"
rm -rf "$T"
