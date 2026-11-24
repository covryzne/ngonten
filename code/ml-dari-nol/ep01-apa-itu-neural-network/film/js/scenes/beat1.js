// Beat 1 — Hook (l01–l02): angka "3" kapur raksasa + grid 28x28 menyala.
// Region x 100–1050 (panel FL). Kapur oranye = angka 3, komponen yang dilacak.
import { digit3, pixelGrid, centredLatin } from './helpers.js';

export function buildBeat1(C) {
  const { add, text, L } = C;
  const t1 = L(1).start, t2 = L(2).start;
  // angka 3 besar, ditulis saat VO bilang "Ini angka 3"
  const three = add(digit3(430, 800, 620, t1 + 0.15, 1.3, { color: 'orange', seed: 11 }), 'FL');
  text('b1-3', '3', 'FL', three);
  // grid 28x28 muncul saat VO bilang "resolusi cuma 28 kali 28 pixel"
  const grid = add(pixelGrid(760, 560, 13, t1 + 1.6, { color: 'orange', seed: 13 }), 'FL');
  const lab = add(centredLatin('28x28', 942, 1010, 58, t1 + 2.9, { seed: 14 }), 'FL');
  text('b1-grid', '28x28', 'FL', lab);
  // l02: kamera menahan — tidak ada tulisan baru (waktu baca)
  return { end: t2 };
}
