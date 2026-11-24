# code/

Kode yang di-render di PC lokal (laptop Shendi). Satu folder per serial,
satu subfolder per episode.

## Layout

```
code/
└── <nama-serial>/                 # misal: ml-dari-nol
    ├── README.md                  # premise serial + peta episode
    ├── referensi-*.md             # analisis referensi serial ini (misal: 3B1B)
    └── <epXX-nama-episode>/       # misal: ep01-apa-itu-neural-network
        ├── README.md              # status episode + cara jalan lokal
        ├── concept.md             # konsep + draft naskah episode
        ├── film/                  # proyek film (lemo-opuscar / MotionMaxxing)
        ├── vo/                    # file VO + timing
        ├── stills/                # stills gate (review sebelum full render)
        └── out/                   # hasil render + mux final
```

Satu serial = satu folder, satu episode = satu subfolder — konsep,
naskah, dan code tinggal bareng. Biar satu lirikan kelihatan: episode
ini, series ini, code-nya di sini.

## Engine

Engine-nya ada DI DALAM repo ini (di-vendor, bukan checkout terpisah):

- **lemo-opuscar** — `core/` (render tools + lib) + `styles/` (style yang
  dipakai) di root repo. JANGAN diedit. Semua perintah render jalan dari
  root repo dengan path relatif, contoh:
  `node core/render/video.mjs code/ml-dari-nol/ep01-apa-itu-neural-network/film ...`
- **MotionMaxxing** — proyek self-contained, jalan dari repo ini.
- **Blender (MCP)** — file `.blend` + script di folder episode.

Satu `node_modules/` di root repo (`npm install` sekali), dipakai bareng
semua film. Tidak ada tarball, tidak ada duplikasi.

## Aturan render

- **Render selalu di lokal** (GPU laptop aktif, ±1,6 dtk/frame untuk lemo).
  VM (±7 jam untuk 70 dtk) dan Colab (GPU tidak bisa dipakai Chrome)
  BUKAN pilihan untuk render film lemo — sudah dibuktikan di Ep 1.
- **Stills gate dulu:** 3–5 frame kunci direview Shendi sebelum full render.
- **Mux lokal:** video + `mix.wav` via ffmpeg loudnorm −14 LUFS.
  Musik bisa diganti tanpa re-render (re-mix + re-mux saja).
