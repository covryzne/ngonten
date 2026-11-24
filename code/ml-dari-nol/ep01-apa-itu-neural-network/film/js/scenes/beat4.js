// Beat 4 — Diagram layer (l06–l08): 784 neuron input (cluster titik),
// 16-16 hidden, 10 output dengan neuron "3" menyala oranye.
// Region x 3250–4250 (panel FR). Kolom: input 3350, hidden 3600/3850, output 4100.
import { circle, centredLatin, line } from './helpers.js';

function dots(C, cx, y0, y1, n, r, t0, step, layer, o = {}) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const y = n === 1 ? (y0 + y1) / 2 : y0 + (y1 - y0) * i / (n - 1);
    out.push(circle(cx, y, r, t0 + i * step, .05, { w: 5, color: o.color || 'white', seed: (o.seed ?? 40) + i }));
  }
  return C.add(out, layer);
}

export function buildBeat4(C) {
  const { add, text, line: ln, L } = C;
  const t6 = L(6).start, t7 = L(7).start, t8 = L(8).start;
  // INPUT: cluster 40 titik (5 kolom x 8 baris) menyarankan 784 neuron
  const lab784 = add(centredLatin('784', 3350, 440, 85, t6 + 0.2, { seed: 41 }), 'FR');
  text('b4-784', '784', 'FR', lab784);
  const cluster = [];
  for (let r = 0; r < 8; r++) for (let c = 0; c < 5; c++) {
    cluster.push(circle(3310 + c * 20, 570 + r * 80, 11, t6 + 0.3 + (r * 5 + c) * .04, .05, { w: 5, seed: 42 + r * 5 + c }));
  }
  add(cluster, 'FR');
  const inLab = add(centredLatin('input', 3350, 1380, 50, t6 + 2.2, { seed: 43 }), 'FR');
  text('b4-input', 'input', 'FR', inLab);
  // OUTPUT: 10 neuron, neuron "3" (indeks 3) menyala oranye
  const lab10 = add(centredLatin('10', 4100, 440, 85, t7 + 0.1, { seed: 44 }), 'FR');
  text('b4-10', '10', 'FR', lab10);
  dots(C, 4100, 500, 1200, 10, 13, t7 + 0.2, .06, 'FR', { seed: 45 });
  const y3 = 500 + (1200 - 500) * 3 / 9;
  const hot = add([circle(4100, y3, 13, t7 + 1.2, .3, { w: 7, color: 'orange', seed: 46 })], 'FR');
  const lab3 = add(centredLatin('3', 4175, y3 + 22, 60, t7 + 1.6, { color: 'orange', seed: 47 }), 'FR');
  text('b4-3', '3', 'FR', [...hot, ...lab3]);
  const outLab = add(centredLatin('output', 4100, 1380, 50, t7 + 2.2, { seed: 48 }), 'FR');
  text('b4-output', 'output', 'FR', outLab);
  // HIDDEN: dua kolom 16 neuron
  const lab16a = add(centredLatin('16', 3600, 380, 80, t8 + 0.1, { seed: 49 }), 'FR');
  text('b4-16a', '16', 'FR', lab16a);
  dots(C, 3600, 450, 1250, 16, 12, t8 + 0.2, .05, 'FR', { seed: 50 });
  const lab16b = add(centredLatin('16', 3850, 380, 80, t8 + 1.0, { seed: 51 }), 'FR');
  text('b4-16b', '16', 'FR', lab16b);
  dots(C, 3850, 450, 1250, 16, 12, t8 + 1.2, .05, 'FR', { seed: 52 });
  const hidLab = add(centredLatin('hidden', 3725, 1400, 48, t8 + 2.2, { seed: 53 }), 'FR');
  text('b4-hidden', 'hidden', 'FR', hidLab);
  // beberapa garis sambungan tipis supaya terbaca sebagai network
  const conn = [
    [[3400, 650], [3590, 560]], [[3400, 850], [3590, 850]], [[3400, 1050], [3590, 1140]],
    [[3610, 600], [3840, 700]], [[3610, 850], [3840, 850]], [[3610, 1100], [3840, 1000]],
    [[3860, 734], [4090, 734]], [[3860, 1000], [4090, 1050]],
  ];
  conn.forEach((pts, i) => add([ln(pts, { w: 4, color: 'white', skip: .2, specks: 0, seed: 54 + i }, t8 + 2.4 + i * .12, .18)], 'FR'));
  return { end: t8 };
}
