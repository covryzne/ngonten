# ngonten

Repo konten @covryzne.ai — dari riset sampai video siap render.
**Satu repo, satu root:** engine + semua serial ada di sini.
Semua perintah jalan dari root repo ini. Render selalu di PC lokal.

## Setup sekali

```powershell
git clone https://github.com/covryzne/ngonten.git
cd ngonten
npm install   # sekali aja — node_modules di root, dipakai bareng semua film
```

Butuh: Node ≥ 20, ffmpeg, Chrome.
Chrome dipakai lewat `PLAYWRIGHT_CHROME` (lihat perintah render di bawah).

## Alurnya (4 langkah)

1. **Transkrip** — `yt-converter/transcribe.py` tarik transkrip video
   referensi (misal 3Blue1Brown) → tersimpan di `yt-converter/transcripts/`.
2. **Konsep** — dari transkrip, dibuat konsep + naskah per episode di
   `code/<serial>/<episode>/concept.md`.
3. **Bundle** — film code dibuat di `code/<serial>/<episode>/film/`.
4. **Render** — dari root repo ini, contoh untuk E01:
   `node core/render/video.mjs code/ml-dari-nol/ep01-apa-itu-neural-network/film --fps 30 --workers 2 --size 1080x1920 --out code/ml-dari-nol/ep01-apa-itu-neural-network/out/ep01-video-only.mp4`
   (perintah lengkap tiap episode ada di `README.md` folder episode itu).

## Peta folder

```
ngonten/
├── README.md, package.json  # peta ini + dependensi (playwright-core, three)
├── node_modules/            # (gitignored) install sekali, dipakai semua film
├── core/                    # engine lemo-opuscar — JANGAN diedit
├── styles/                  # style lemo yang dipakai (chalkboard) — referensi
├── yt-converter/            # tool transkrip + hasil transkrip
└── code/                    # semua serial + episode (konsep, naskah, film)
    └── ml-dari-nol/         # serial ML ala 3Blue1Brown (Bahasa Indonesia)
        └── ep01-apa-itu-neural-network/   # E01: konsep + naskah + film
```

## Mulai dari mana?

- **Mau liat episode yang lagi jalan:**
  `code/ml-dari-nol/ep01-apa-itu-neural-network/` — semua tentang E01 ada
  di satu folder itu (konsep, naskah, film, cara render).
- **Mau nambah referensi baru:** jalanin `yt-converter/transcribe.py`
  (interaktif, atau `transcribe.py <URL> --lang en`).
- **Mau render:** baca `README.md` di folder episode — perintahnya ada
  di situ, semua path relatif dari root repo.

## Lisensi

- Konten dan code di `code/` + `yt-converter/`: lihat `LICENSE` (milik Shendi).
- `core/` + `styles/` adalah code lemo-opuscar (github.com/lemomo-ai/lemo-opuscar)
  yang di-vendor ke repo ini — lisensinya di `lemo-LICENSE` + `lemo-LICENSES/`.
