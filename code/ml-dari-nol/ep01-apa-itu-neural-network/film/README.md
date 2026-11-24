# ML dari Nol E01 — "Apa itu neural network?" — film chalkboard

Film vertikal **1080×1920, 30 fps**, gaya lemo-opuscar `chalkboard`
(papan tulis + kapur, analog 3Blue1Brown). Durasi **98,46 detik** dengan
timing VO ESTIMASI (lihat di bawah).

- `index.html` + `js/app.js` — compositor (Canvas 2D + post WebGL2)
- `js/film.js` + `js/scenes/` — 7 beat + end card (semua stroke kapur)
- `story.js` — shot list + teks subtitle (membaca `vo_times.json`)
- `vo_times.json` — **SATU-SATUNYA sumber timing** (15 baris VO)
- `js/chalk.js`, `hand.js`, `hz.js`, `post.js`, `props.js`, `r2d.js`,
  `stage.js` — engine chalkboard yang dicopy dari demo lemo
  (`props.js`: glow radial di `drawFront` dihapus sesuai STYLE.md §9)
- `fonts/` — EMSDelight + EMSCasualHand (OFL, lihat `OFL-EMS.txt`)
- `tools/srt.mjs` — ekspor subtitle dari `vo_times.json` + `story.js`
- `out/ml-e01-chalkboard.srt` — subtitle 15 cue (regenerasi bila timing berubah)

Tidak ada kredit LemoLab di film. Tidak ada host (papannya yang jadi bintang).

## Cara render (di laptop, dari checkout lemo-opuscar)

Film ini di-render dari path EKSTERNAL — lemo me-mount proyek film di luar
checkout di `/@film/`, sementara `/core/`, `/styles/`, `/node_modules/`
tetap dari checkout lemo. Jadi: satu checkout lemo + satu `node_modules`
dipakai bareng semua film. Jalankan semua perintah dari **root checkout
lemo-opuscar** (bukan dari folder film ini).

```powershell
# sekali saja per sesi PowerShell (Playwright memakai Chrome terinstal;
# download browser Playwright dari CDN-nya gagal di koneksi ini)
$env:PLAYWRIGHT_CHROME = "C:\Program Files\Google\Chrome\Application\chrome.exe"

# smoke test: 1 still (cek GPU aktif — harus ~1-2 detik, tanpa catatan
# "software rendering")
node core/render/still.mjs D:\ngonten\code\ml-dari-nol\ep01-apa-itu-neural-network\film 5.0 --size 1080x1920 --out film\stills

# render penuh (video tanpa suara; ~40 menit di laptop ini untuk Ep 1 hd-2d,
# chalkboard ini jauh lebih ringan karena Canvas 2D)
node core/render/video.mjs D:\ngonten\code\ml-dari-nol\ep01-apa-itu-neural-network\film --fps 30 --workers 2 --size 1080x1920 --out ep01-video-only.mp4
```

Catatan:

- **TANPA `--q`**: gaya chalkboard tidak memakai query param (parameter
  `tilt=1&ss=1` itu khusus hd-2d, jangan dipakai di sini).
- ffmpeg harus ada di PATH (`winget install ffmpeg`).
- Stills gate yang sudah terverifikasi di VM (24 Nov 2026): t=5, 21, 28, 46,
  60, 70, 90, 96 — semua lolos baca (angka 3 terbaca, teks besar terbaca,
  tidak ada elemen tertutup/terpotong).

## Ganti timing VO asli (saat VO Rocky sudah ada)

1. Ganti `vo_times.json` dengan timing asli — format sama: array
   `{"line": n, "start": s, "end": s, "dur": s}` per baris (15 baris).
2. Regenerasi subtitle: `node film/tools/srt.mjs`
   (atau dari root lemo: `node <path-film>/tools/srt.mjs`).
3. Render ulang. TIDAK ADA edit scene: semua stroke + kamera + DUR dihitung
   dari `vo_times.json` (`story.js` `makeStory`).

## Mux audio (nanti, setelah mix.wav jadi)

```powershell
ffmpeg -i ep01-video-only.mp4 -i mix.wav -c:v copy -af loudnorm=I=-14:TP=-1:LRA=11 -c:a aac -b:a 192k -shortest ml-e01-neural-network.mp4
```
