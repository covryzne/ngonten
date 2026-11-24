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

## Cara render (di laptop, dari root repo ngonten)

Engine-nya ada di repo ini (`core/` di root). Jalankan semua perintah dari
**root repo** (di mana pun lu clone — semua path relatif, tidak ada hardcode
drive). Prasyarat (sekali aja): `npm install` di root repo, ffmpeg, Chrome.

```powershell
# sekali saja per sesi PowerShell (Playwright memakai Chrome terinstal;
# download browser Playwright dari CDN-nya gagal di koneksi ini)
$env:PLAYWRIGHT_CHROME = "C:\Program Files\Google\Chrome\Application\chrome.exe"

# smoke test: 1 still (cek GPU aktif — harus ~1-2 detik, tanpa catatan
# "software rendering")
node core/render/still.mjs code/ml-dari-nol/ep01-apa-itu-neural-network/film 5.0 --size 1080x1920 --out code/ml-dari-nol/ep01-apa-itu-neural-network/stills

# render penuh (video tanpa suara; chalkboard jauh lebih ringan dari hd-2d
# karena Canvas 2D — Ep 1 hd-2d butuh ~40 menit, yang ini lebih cepat)
node core/render/video.mjs code/ml-dari-nol/ep01-apa-itu-neural-network/film --fps 30 --workers 2 --size 1080x1920 --out code/ml-dari-nol/ep01-apa-itu-neural-network/out/ep01-video-only.mp4
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
2. Regenerasi subtitle (dari root repo):
   `node code/ml-dari-nol/ep01-apa-itu-neural-network/film/tools/srt.mjs`
3. Render ulang. TIDAK ADA edit scene: semua stroke + kamera + DUR dihitung
   dari `vo_times.json` (`story.js` `makeStory`).

## Mux audio (nanti, setelah mix.wav jadi)

Jalankan dari root repo (extract audio pack di root repo):

```powershell
ffmpeg -i code/ml-dari-nol/ep01-apa-itu-neural-network/out/ep01-video-only.mp4 -i mix.wav -c:v copy -af loudnorm=I=-14:TP=-1:LRA=11 -c:a aac -b:a 192k -shortest code/ml-dari-nol/ep01-apa-itu-neural-network/out/ep01-final.mp4
```
