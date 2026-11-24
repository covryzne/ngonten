# ngonten

Repo konten @covryzne.ai — dari riset sampai video siap render.
Satu repo untuk semua serial. Render selalu di PC lokal.

## Alurnya (4 langkah)

1. **Transkrip** — `yt-converter/transcribe.py` tarik transkrip video
   referensi (misal 3Blue1Brown) → tersimpan di `yt-converter/transcripts/`.
2. **Konsep** — dari transkrip, dibuat konsep + naskah per episode di
   `code/<serial>/<episode>/concept.md`.
3. **Bundle** — film code (lemo-opuscar) dibuat di
   `code/<serial>/<episode>/film/`.
4. **Render lokal** — dari checkout lemo-opuscar (engine + node_modules
   global, install sekali, dipakai bareng semua film), render film-nya.
   Perintah lengkap ada di `README.md` tiap episode.

## Peta folder

```
ngonten/
├── yt-converter/    # tool transkrip + hasil transkrip (referensi)
├── code/            # semua serial + episode (konsep, naskah, film)
│   └── ml-dari-nol/ # serial ML ala 3Blue1Brown (Bahasa Indonesia)
│       └── ep01-apa-itu-neural-network/  # episode 1: konsep + naskah + film
└── requirements.txt # dependensi yt-converter
```

## Mulai dari mana?

- **Mau liat episode yang lagi jalan:**
  `code/ml-dari-nol/ep01-apa-itu-neural-network/` — semua tentang E01 ada
  di satu folder itu (konsep, naskah, film, cara render).
- **Mau nambah referensi baru:** jalanin `yt-converter/transcribe.py`
  (interaktif, atau `transcribe.py <URL> --lang en`).
- **Mau render:** baca `README.md` di folder episode — perintahnya ada
  di situ.
