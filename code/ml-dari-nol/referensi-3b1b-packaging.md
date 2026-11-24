# Cara 3Blue1Brown Mengemas Konten — Analisis

Referensi untuk serial ML @covryzne.ai. Dianalisis dari transkrip 2 video
seri Neural Network (Grant Sanderson):

- Ch. 1 — "But what is a neural network?" (`aircAruvnKk`, 3.361 kata)
- Ch. 2 — "Gradient descent, how neural networks learn" (`IHZwWFHWa-w`, 3.606 kata)

> Sumber transkrip (kanonik, hasil `yt-converter/transcribe.py`):
> [`yt-converter/transcripts/But what is a neural network Deep learning chapter 1 [aircAruvnKk]/`](../../yt-converter/transcripts/But%20what%20is%20a%20neural%20network%20Deep%20learning%20chapter%201%20%5BaircAruvnKk%5D/)
> dan
> [`yt-converter/transcripts/Gradient descent, how neural networks learn Deep Learning Chapter 2 [IHZwWFHWa-w]/`](../../yt-converter/transcripts/Gradient%20descent%2C%20how%20neural%20networks%20learn%20Deep%20Learning%20Chapter%202%20%5BIHZwWFHWa-w%5D/).
> Kalau ada transkrip video lain ditambahkan, analisis ini tetap berlaku —
> yang dipelajari adalah *pola kemasannya*, bukan isi satu video.

## Formula kemasan 3B1B (9 pola)

### 1. Hook = keheranan pada hal yang biasa
Bukan pertanyaan, tapi kontras: "Otak lu baca angka 3 corat-coret ini
tanpa usaha — coba suruh komputer ngelakuin hal yang sama, tiba-tiba jadi
susah banget." Yang trivial buat manusia, sulit buat mesin. Rasa heran itu
yang bikin penonton bertahan.

### 2. Janji + batas scope, diucapkan eksplisit
"Video ini cuma soal *struktur*. Video berikutnya soal *learning*."
Satu video = satu pekerjaan. Penonton tahu persis apa yang akan didapat
dan apa yang TIDAK dibahas kali ini.

### 3. Satu contoh berjalan (running example)
Satu contoh dipakai untuk SEMUA ide abstrak: digit tulisan tangan MNIST
28×28. Tidak pernah ganti contoh di tengah jalan. Abstraksi selalu
berlabuh ke contoh yang sama.

### 4. Intuisi dulu, formalisme belakangan
Neuron = "tempat nyimpen angka 0–1". Weight = "knob yang bisa diputar".
Gradient descent = "bola menggelinding di bukit". Cost = "seberapa payah
network ini". Rumus/matrix datang BELAKANGAN sebagai *kompresi* dari
intuisi ("cara menulis yang lebih ringkas"), bukan sebagai pembuka.

### 5. Jujur soal pilihan arbitrer dan batas
"16 neuron itu angka yang enak dilihat di layar." "Pilihan ini arbitrer."
Dan puncaknya di Ch. 2: network ternyata TIDAK melakukan apa yang
diharapkan (weight-nya kelihatan hampir acak; percaya diri menjawab
ngawur untuk gambar noise). Kejujuran ini yang membangun trust —
penonton merasa diajak mikir, bukan didikte.

### 6. Ajak penonton ikut eksperimen pikiran
"Bayangin lu yang mendesain...", "Coba posisikan diri lu sebagai
network-nya...", "Run with me on this one." Orang kedua, kolaboratif,
bukan ceramah.

### 7. Recap + jembatan antar episode
Ch. 2 dibuka dengan recap singkat Ch. 1, menyatakan dua tujuan,
ditutup teaser Ch. 3 (backprop). Episode saling mengunci — penonton
episode 2 tanpa episode 1 tetap bisa ikut, tapi ada alasan menonton
yang sebelumnya.

### 8. Penutup = ajakan belajar aktif + sumber
"Pause dan pikirkan..." + rujukan buku gratis (Nielsen), blog (Distill,
Chris Olah). 3B1B memposisikan diri sebagai pintu masuk, bukan tujuan
akhir.

### 9. Pace tenang, visual yang membawa beban
±180 kata/menit. VO menjelaskan apa yang ditunjukkan visual — bukan
sebaliknya. Visual bukan hiasan; visual ADALAH penjelasannya.

## Adaptasi ke TikTok 60–90 dtk (Bahasa Indonesia)

| Pola 3B1B | Adaptasi TikTok |
|---|---|
| Hook kontras (±60 dtk untuk terurai) | Dipadatkan ke 3 detik pertama, struktur kontrasnya sama |
| Satu video = satu chapter (19 mnt) | Satu video = SATU ide; satu chapter 3B1B jadi 4–6 episode |
| Satu running example | Dipertahankan: digit MNIST "3" untuk seluruh serial NN |
| Intuisi dulu, rumus belakangan | Dipertahankan; rumus cukup disinggung, bukan ditulis penuh |
| Kejujuran soal batas | Dipertahankan — jadi pembeda dari konten "AI itu magic" |
| Recap + teaser | Recap 1 kalimat di awal; teaser 1 kalimat di akhir |
| Pace 180 kata/mnt | ±15 kata/detik tetap; VO Rocky, monolog |
| Visual Manim (dark bg, vektor) | Style lemo **chalkboard** (papan gelap + kapur warna) — analog terdekat |

## Prinsip serial kita (turunan dari analisis ini)

1. **Satu ide besar per episode.** Kalau naskah butuh "dan juga...", itu
   episode lain.
2. **Contoh berjalan tidak ganti-ganti** dalam satu serial.
3. **Jangan mulai dari rumus.** Mulai dari hal yang bisa dilihat/dirasakan.
4. **Sebut batasnya.** "Ini yang network-nya TIDAK bisa" adalah konten,
   bukan kelemahan.
5. **Tiap episode ditutup teaser episode berikut** (1 kalimat).
