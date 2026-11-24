// Beat 7 — Teaser (l13–l15): bola di puncak bukit (gradient descent, E02).
// Region x 5900–6350 (panel FR) — komposisi tinggi, cocok untuk frame vertikal.
import { circle, arrow, centredLatin } from './helpers.js';

export function buildBeat7(C) {
  const { add, text, L } = C;
  const t13 = L(13).start;
  const g = add(centredLatin('gradient', 6125, 370, 58, t13 + 0.2, { seed: 74 }), 'FR');
  const d = add(centredLatin('descent', 6125, 470, 58, t13 + 0.9, { seed: 75 }), 'FR');
  text('b7-gd', 'gradient descent', 'FR', [...g, ...d]);
  // bukit: gundukan bulat, bukan segitiga curam (stills 24 Nov: bukit
  // 730 unit terlalu tinggi dan runcing, terbaca seperti huruf A)
  const hill = add([C.line([[5900, 1350], [5960, 1150], [6040, 980], [6125, 900], [6210, 980], [6290, 1150], [6350, 1350]], { smooth: true, w: 9, seed: 76 }, t13 + 1.6, 1.2)], 'FR');
  text('b7-hill', 'hill', 'FR', hill);
  // bola di puncak, lalu panah turun di LUAR lereng kanan (bukan menempel lereng)
  const ball = add([circle(6125, 845, 55, t13 + 3.0, 0.5, { w: 9, seed: 77 })], 'FR');
  text('b7-ball', 'ball', 'FR', ball);
  const roll = add(arrow(6260, 1010, 6340, 1260, t13 + 3.8, 0.6, { w: 6, head: 28, seed: 78 }), 'FR');
  text('b7-roll', 'roll down', 'FR', roll);
  return { end: t13 };
}
