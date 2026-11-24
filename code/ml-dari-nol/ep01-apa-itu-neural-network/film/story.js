// ML dari Nol E01 — "Apa itu neural network?" — Chalkboard, VERTIKAL 1080x1920
// TIMING: semua waktu berasal dari vo_times.json (SATU-SATUNYA sumber).
// File itu sekarang berisi ESTIMASI (±89 dtk, pace Rocky 15,5 kar/dtk);
// saat VO asli (Rocky, ElevenLabs) tiba, ganti vo_times.json dengan timing
// asli dan SEMUA stroke + kamera + DUR ikut bergeser — tanpa edit scene.
// JANGAN hardcode waktu absolut di scene manapun: pakai LINES[n].start/end.
export const ENDCARD = 5.5; // detik end card setelah VO berakhir (3,5 dtk tidak
// cukup: slide panel 0,9 dtk + 3 blok teks butuh waktu baca; 5,5 dtk memberi
// baris terakhir ~2,7 dtk di layar penuh)

// Teks VO per baris (tag ekspresi [curious]/[excited]/[whispers] dilepas).
// Dipakai untuk subtitle events (.srt nanti) — BUKAN untuk timing.
export const SUBS_TEXT = {
  1: 'Ini angka 3. Corat-coret, resolusi cuma 28 kali 28 pixel — tapi otak lu langsung tahu ini 3.',
  2: 'Pixelnya beda-beda tiap tulisan, tapi otak lu tetap bilang: ini 3.',
  3: 'Sekarang suruh komputer ngelakuin hal yang sama — baca grid 28 kali 28 pixel, tebak angkanya.',
  4: 'Yang tadinya gampang, tiba-tiba jadi susah banget. Nah, di sinilah neural network masuk.',
  5: 'Neural network itu bukan otak tiruan. Isinya cuma neuron — tempat nyimpen angka dari nol sampai satu.',
  6: 'Gambar tadi punya 784 pixel — jadi layer pertamanya punya 784 neuron, satu buat tiap pixel.',
  7: 'Layer terakhir cuma 10 neuron, satu buat tiap angka. Yang paling terang, itu tebakannya.',
  8: 'Di tengahnya dua hidden layer, masing-masing 16 neuron. Di sinilah "pikirannya" terjadi.',
  9: 'Cara kerjanya: angka di satu layer nentuin angka di layer berikutnya, lewat jumlah berbobot.',
  10: 'Tiap sambungan punya weight — angka yang bilang seberapa penting sambungan itu. Plus satu bias per neuron.',
  11: 'Totalnya, network sekecil ini punya hampir 13.000 weight dan bias. 13.000 knob yang bisa diputar-putar.',
  12: '"Belajar" artinya: komputer mencari setting ke-13.000 knob itu sampai tebakannya benar.',
  13: 'Caranya? Coba-coba, ukur salahnya, perbaiki sedikit-sedikit. Namanya gradient descent.',
  14: 'Jadi neural network itu bukan magic. Dia cuma fungsi — fungsi raksasa dengan 13.000 parameter.',
  15: 'Besok gua kasih tau: gimana komputer nyari setting 13.000 angka itu tanpa nyoba satu-satu.',
};

// Shot = satu beat. Batasnya diambil dari garis VO (BUKAN angka absolut):
// [id, garisAwal, garisAkhir, cxKamera, skalaKamera]. cy selalu 850 (tengah papan).
const SHOT_DEF = [
  ['hook', 1, 2, 575, 1.45],       // angka 3 + grid 28x28
  ['contrast', 3, 4, 1575, 1.35],  // dua tulisan 3 + ???
  ['neuron', 5, 5, 2625, 1.45],    // satu neuron, 0 -> 1
  ['layers', 6, 8, 3750, 1.45],    // diagram 784-16-16-10 (s 1,2 menampilkan
  // jam dinding terpotong di sudut; s 1,4 masih menyisakan secuil — 1,45 bersih)
  ['weights', 9, 10, 4650, 1.45],  // sambungan + knob
  ['punchline', 11, 12, 5450, 1.35], // 13.000 besar
  ['teaser', 13, 15, 6125, 1.5],   // bola di bukit (gradient descent)
];

export function makeStory(VT) {
  const L = {};
  for (const r of VT) L[r.line] = { start: r.start, end: r.end, dur: r.dur };
  const voEnd = L[15].end;
  const DUR = +(voEnd + ENDCARD).toFixed(2);
  const SHOTS = SHOT_DEF.map(([id, a, b, cx, s]) => ({ id, a: L[a].start, b: L[b].end, cx, cy: 850, s }));
  SHOTS.push({ id: 'endcard', a: voEnd, b: DUR, cx: 1600, cy: 850, s: 1.25 });
  const VO = VT.map(r => ({ id: 'l' + String(r.line).padStart(2, '0'), t: r.start, end: r.end, sub: SUBS_TEXT[r.line] }));
  // Panel depan (FL) meluncur ke kanan untuk end card: mulai saat VO berakhir.
  const slide0 = voEnd, slide1 = voEnd + 0.9;
  const shotAt = t => SHOTS.find(s => t >= s.a && t < s.b) || SHOTS[SHOTS.length - 1];
  return { DUR, LINES: L, SHOTS, VO, shotAt, slide0, slide1, voEnd };
}
