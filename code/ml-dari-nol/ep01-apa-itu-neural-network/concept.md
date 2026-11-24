# E01 — Otak Lu Baca Angka Ini dalam 0,1 Detik. Komputer? Butuh 13.000 Angka.

> Status: KONSEP + DRAFT NASKAH — menunggu approval judul dari Shendi.
> Judul alternatif ada di `../README.md`.

## Satu ide besar

Neural network = **fungsi raksasa** yang mengubah 784 angka (pixel gambar)
menjadi 10 angka (tebakan digit). Dan "belajar" artinya mencari setting
yang benar untuk **13.000 angka** di dalamnya (weight + bias).

## 7 beats (struktur naskah)

| # | Beat | Isi | Visual chalkboard |
|---|---|---|---|
| 1 | Hook kontras | Digit "3" corat-coret, 28×28 pixel — otak langsung tahu | Angka 3 ditulis kapur, grid 28×28 muncul |
| 2 | Kontras dibalik | Pixel beda-beda tiap tulisan, otak tetap tahu; suruh komputer? Tiba-tiba susah | Dua tulisan "3" berbeda, panah ke "???" |
| 3 | Neuron = tempat angka | Neuron cuma nyimpen angka 0–1 (aktivasi) | Satu lingkaran neuron, angka di dalamnya berubah 0→1 |
| 4 | Layer | 784 neuron input (satu per pixel) → 2 hidden layer × 16 → 10 output (satu per digit) | Diagram layer 784–16–16–10 digambar |
| 5 | Weight & bias | Sambungan antar neuron punya weight; tiap neuron punya bias | Garis sambungan + angka weight; knob diputar |
| 6 | Punchline 13.000 | Total ±13.000 weight+bias. "Belajar" = mencari setting ke-13.000 angka itu | Angka 13.000 ditulis besar |
| 7 | Teaser E02 | Caranya? Coba-coba, ukur salahnya, perbaiki sedikit-sedikit — gradient descent | Bola di atas bukit (teaser visual E02) |

## Style

- **Chalkboard** (lemo-opuscar): papan gelap + kapur warna. Analog terdekat
  estetika 3B1B/Manim.
- Running example: digit MNIST "3" — dipakai di semua beat.
- VO: Rocky, monolog. Tanpa pitch shift / efek (Bible §6).

## Draft naskah (15 baris, ±1.050 karakter, ±70 dtk)

> DRAFT — kata-kata final setelah judul di-approve. Tag ekspresi untuk
> generate VO di website ElevenLabs (Rocky, v4).

1. [curious] Ini angka 3. Corat-coret, resolusi cuma 28 kali 28 pixel — tapi otak lu langsung tahu ini 3.
2. Padahal pixelnya beda-beda tiap tulisan. Mata lu nangkep pola yang beda, tapi otak lu tetap bilang: ini 3.
3. Sekarang coba suruh komputer ngelakuin hal yang sama. Tulis program yang baca grid 28 kali 28 pixel, terus tebak angkanya berapa.
4. Yang tadinya gampang banget, tiba-tiba jadi susah banget. Nah, di sinilah neural network masuk.
5. Neural network itu bukan otak tiruan. Isinya cuma neuron — dan neuron itu cuma tempat nyimpen angka, dari nol sampai satu.
6. Gambar 3 tadi punya 784 pixel. Jadi layer pertama network ini punya 784 neuron, satu buat tiap pixel.
7. Layer terakhirnya cuma 10 neuron — satu buat tiap angka, nol sampai sembilan. Yang paling terang, itu tebakan network-nya.
8. Di tengahnya ada hidden layer — dua layer, masing-masing 16 neuron. Di sinilah "pikirannya" terjadi.
9. Cara kerjanya: angka di satu layer nentuin angka di layer berikutnya, lewat perkalian berbobot.
10. Tiap sambungan antar neuron punya weight — angka yang bilang seberapa penting sambungan itu. Plus satu bias per neuron.
11. Totalnya, network sekecil ini punya hampir 13.000 weight dan bias. 13.000 knob yang bisa diputar-putar.
12. Dan "belajar" itu artinya: komputer mencari setting ke-13.000 knob itu sampai tebakannya benar.
13. Caranya? Dia coba-coba, ukur salahnya, terus perbaiki sedikit-sedikit. Namanya gradient descent.
14. Jadi neural network itu bukan magic. Dia cuma fungsi — fungsi raksasa dengan 13.000 parameter.
15. [whispers] Besok gua kasih tau: gimana komputer nyari setting 13.000 angka itu tanpa nyoba satu-satu.

## Cara jalan di lokal

Lihat `README.md` di folder ini (perintah stills gate, full render,
dan mux — semuanya jalan di PC lokal).
