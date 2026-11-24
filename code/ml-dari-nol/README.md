# ML dari Nol (nama kerja)

Serial penjelasan AI/ML ala 3Blue1Brown, dalam Bahasa Indonesia, untuk
@covryzne.ai. Visual-first, satu konsep per video, 60–90 detik, vertikal.

> Nama serial masih nama kerja — bisa diganti sebelum episode pertama tayang.

## Premise

3Blue1Brown tidak ada versi Indonesianya. Serial ini mengisi celah itu:
pedagogi 3B1B (intuisi dulu, rumus belakangan, jujur soal batas) dalam
Bahasa Indonesia sehari-hari, dengan gaya visual chalkboard.

Analisis lengkap cara 3B1B mengemas konten:
[`./referensi-3b1b-packaging.md`](./referensi-3b1b-packaging.md).

## Hubungan dengan episode lain

- **Ep 1 @covryzne.ai (hd-2d, "ML = belajar dari contoh")** adalah gerbang:
  penonton yang belum tahu ML sama sekali mulai dari sana.
- Serial ini adalah **deep-dive per topik**. Penonton Ep 1 yang penasaran
  "terus gimana caranya?" lanjut ke sini.

## Format per episode

- **Durasi:** 60–90 detik (naskah ±1.000 karakter).
- **Style visual:** lemo **chalkboard** (papan gelap + kapur warna — analog
  terdekat estetika Manim/3B1B). Alternatif: whiteboard / sketchnote
  (versi terang).
- **VO:** Rocky, monolog (sama seperti Ep 1). Tanpa pitch shift / efek.
- **Struktur:** hook kontras (3 dtk) → satu contoh berjalan → intuisi →
  formalisme sebagai kompresi → kejujuran soal batas → teaser episode
  berikut (1 kalimat).
- **Running example serial NN:** digit tulisan tangan MNIST 28×28 ("3").

## Peta episode — Season 1: Neural Network

Diadaptasi dari seri Neural Network 3B1B Ch. 1–2 (satu chapter = beberapa
episode TikTok).

| # | Judul kerja | Satu ide besar | Status |
|---|---|---|---|
| E01 | Otak Lu Baca Angka Ini dalam 0,1 Detik. Komputer? Butuh 13.000 Angka. | NN = fungsi raksasa 784 angka → 10 angka; "belajar" = mencari setting 13.000 weight+bias | Konsep + draft naskah |
| E02 | Gimana Komputer Belajar? Dia Cuma Menggelinding | Gradient descent: cost = seberapa payah; belajar = menggelinding ke lembah | Belum |
| E03 | Weight & Bias: 13.000 Knob yang Bisa Diputar | Weight = seberapa penting sambungan; bias = ambang aktif | Belum |
| E04 | Sigmoid vs ReLU: Fungsi Penjepit | Aktivasi harus 0–1; kenapa sigmoid ditinggalkan | Belum |
| E05 | Cost Function: Cara Komputer Tahu Dia Payah | Jumlah kuadrat selisih output vs target | Belum |
| E06 | Network-nya Ternyata Nggak Sepintar Harapan | Weight hasil training kelihatan acak; percaya diri menjawab ngawur untuk noise | Belum |
| E07 | Backprop: Siapa yang Salah? (teaser season 2) | Kredit/blame per weight — jembatan ke season 2 | Belum |

Season 2 (nanti): activation functions deep-dive, arsitektur (CNN, RNN,
Transformer), LLM.

## Workflow

1. **Konsep + naskah** ditulis di folder episode (`./epXX-*/concept.md`).
   **Harus dibaca/disetujui Shendi dulu. TIDAK ADA generate sebelum cocok.**
2. **Film code** (lemo-opuscar, style chalkboard) dibuat di folder episode
   yang sama (`./epXX-*/film/`), mengikuti layout proyek film lemo.
   Engine lemo-opuscar tetap di checkout terpisah — proyek film di luar
   library di-mount oleh tools lemo (`/@film/`).
3. **Stills gate:** 3–5 still kunci direview Shendi sebelum full render.
4. **Render di lokal** (laptop Shendi, GPU aktif — jauh lebih cepat dari
   VM/Colab). Lihat `README.md` di folder episode.
5. **Mux lokal:** video + `mix.wav` (disiapkan Muse) via ffmpeg loudnorm
   −14 LUFS. Video TIDAK perlu re-render kalau musik diganti.

## Judul alternatif E01 (bila judul kerja tidak cocok)

- "Neural Network Itu Cuma Fungsi (yang Rumit Banget)"
- "Apa Itu Neuron? (Bukan yang di Otak Lu)"
- "Kenapa Komputer Bodoh Baca Tulisan Tangan?"
