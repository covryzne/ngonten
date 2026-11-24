# code/

Kode yang di-render di PC lokal (laptop Shendi). Satu folder per serial,
satu subfolder per episode.

## Layout

```
code/
└── <nama-serial>/                 # misal: ml-dari-nol
    └── <epXX-nama-episode>/       # misal: ep01-apa-itu-neural-network
        ├── README.md              # status episode + cara jalan lokal
        ├── film/                  # proyek film (lemo-opuscar / MotionMaxxing)
        ├── vo/                    # file VO + timing
        ├── stills/                # stills gate (review sebelum full render)
        └── out/                   # hasil render + mux final
```

Konsep + naskah TIDAK di sini — itu dokumen, tempatnya di `series/`.
Folder ini khusus kode + aset render.

## Engine

Engine-nya tetap di checkout terpisah (bukan di repo ini):

- **lemo-opuscar** — proyek film di repo ini di-mount oleh tools lemo
  (`/@film/`), jadi path film bisa di luar checkout lemo-opuscar.
- **MotionMaxxing** — proyek self-contained, jalan dari repo ini.
- **Blender (MCP)** — file `.blend` + script di folder episode.

## Aturan render

- **Render selalu di lokal** (GPU laptop aktif, ±1,6 dtk/frame untuk lemo).
  VM (±7 jam untuk 70 dtk) dan Colab (GPU tidak bisa dipakai Chrome)
  BUKAN pilihan untuk render film lemo — sudah dibuktikan di Ep 1.
- **Stills gate dulu:** 3–5 frame kunci direview Shendi sebelum full render.
- **Mux lokal:** video + `mix.wav` via ffmpeg loudnorm −14 LUFS.
  Musik bisa diganti tanpa re-render (re-mix + re-mux saja).
