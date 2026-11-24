# E01 — Apa Itu Neural Network?

> Status: NASKAH FINAL (menunggu dibaca Shendi). Style chalkboard LOCKED.
> Berikutnya: Shendi generate VO di ElevenLabs (Rocky, v4) → film code
> dibangun dengan timing VO asli. Konsep + naskah: `./concept.md`,
> file siap-paste VO: `./script-elevenlabs.txt`.

## Rencana

- **Serial:** ML dari Nol (3B1B-style, Bahasa Indonesia)
- **Style:** chalkboard (lemo-opuscar) — LOCKED 24 Nov 2026
- **Engine:** lemo-opuscar (pipeline 9 langkah, sudah terbukti di Ep 1 hd-2d)
- **VO:** Rocky, monolog (±70 dtk, 15 baris — lihat concept.md)
- **Render:** lokal (laptop Shendi)

## Layout (setelah film code dibuat)

```
ep01-apa-itu-neural-network/
├── film/      # main.js, story.js, + modul scene chalkboard
├── vo/        # vo-rocky-full.mp3 + potongan per baris + vo_times.json
├── stills/    # 3-5 still kunci (gate review)
└── out/       # ep01-video-only.mp4 + ep01-final.mp4 + .srt
```

## Cara jalan di lokal (setelah film code ada)

```powershell
# dari checkout lemo-opuscar
$env:PLAYWRIGHT_CHROME="C:\Program Files\Google\Chrome\Application\chrome.exe"

# 1. Stills gate
node core/render/still.mjs D:\ngonten\code\ml-dari-nol\ep01-apa-itu-neural-network\film 2 15 30 45 60 --q 'tilt=1&ss=1' --size 1080x1920 --out stills-ep01

# 2. Full render
node core/render/video.mjs D:\ngonten\code\ml-dari-nol\ep01-apa-itu-neural-network\film --fps 30 --workers 2 --q 'tilt=1&ss=1' --size 1080x1920 --out ep01-video-only.mp4

# 3. Mux (mix.wav disiapkan Muse)
ffmpeg -i ep01-video-only.mp4 -i mix.wav -c:v copy -af loudnorm=I=-14:TP=-1:LRA=11 -c:a aac -b:a 192k -shortest ep01-final.mp4
```

> Sesuaikan drive letter (`D:\ngonten\...`) dengan lokasi clone repo di PC lu.
