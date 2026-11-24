# E01 — Apa Itu Neural Network?

> Status: FILM SELESAI — 8/8 stills gate LOLOS (24 Nov 2026). Durasi
> 98,46 dtk (estimasi timing VO). Berikutnya: Shendi generate VO di
> ElevenLabs (Rocky, v4, dari `./script-elevenlabs.txt`) → kirim MP3 ke
> Covryzne → timing asli + mix → Shendi render + mux lokal.
> Konsep + naskah: `./concept.md`.

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

Semua perintah dari **root repo** (di mana pun lu clone — tidak ada path
hardcode). Prasyarat (sekali aja): `npm install` di root repo, ffmpeg,
Chrome.

```powershell
# Chrome untuk render (sekali per jendela PowerShell)
$env:PLAYWRIGHT_CHROME="C:\Program Files\Google\Chrome\Application\chrome.exe"

# 1. Stills gate (3-5 frame kunci, review dulu sebelum render penuh)
node core/render/still.mjs code/ml-dari-nol/ep01-apa-itu-neural-network/film 2 15 30 45 60 --size 1080x1920 --out code/ml-dari-nol/ep01-apa-itu-neural-network/stills

# 2. Full render (video tanpa audio)
node core/render/video.mjs code/ml-dari-nol/ep01-apa-itu-neural-network/film --fps 30 --workers 2 --size 1080x1920 --out code/ml-dari-nol/ep01-apa-itu-neural-network/out/ep01-video-only.mp4

# 3. Mux dengan mix.wav (disiapkan Muse, extract audio pack di root repo)
ffmpeg -i code/ml-dari-nol/ep01-apa-itu-neural-network/out/ep01-video-only.mp4 -i mix.wav -c:v copy -af loudnorm=I=-14:TP=-1:LRA=11 -c:a aac -b:a 192k -shortest code/ml-dari-nol/ep01-apa-itu-neural-network/out/ep01-final.mp4
```

Render lokal adalah jalur utama (GPU laptop aktif, ±1,6 dtk/frame) —
VM/Colab bukan pilihan untuk render film lemo (sudah dibuktikan: VM ±7 jam,
Colab GPU tidak bisa dipakai Chrome).
