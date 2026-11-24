// Beat 3 — Neuron = tempat angka (l05): satu lingkaran neuron, busur oranye
// menyapu (aktivasi naik), "0 -> 1". Region x 2100–3150 (panel FL).
import { arc } from '../chalk.js';
import { circle, arrow, centredLatin } from './helpers.js';

export function buildBeat3(C) {
  const { add, text, L } = C;
  const t5 = L(5).start;
  const cx = 2625, cy = 800;
  const ring = add([circle(cx, cy, 300, t5 + 0.2, 1.1, { w: 10, color: 'white', seed: 31 })], 'FL');
  text('b3-ring', 'neuron', 'FL', ring);
  const lab = add(centredLatin('NEURON', cx, 400, 72, t5 + 1.4, { seed: 32 }), 'FL');
  text('b3-neuron', 'NEURON', 'FL', lab);
  // busur aktivasi: menyapu 270 derajat saat VO bilang "dari nol sampai satu"
  const act = arc(cx, cy, 255, -Math.PI / 2, Math.PI, { kind: 'write', w: 14, color: 'orange', taper: .1, land: .8, seed: 33 });
  act.t0 = t5 + 2.0; act.t1 = t5 + 4.5;
  add([act], 'FL');
  // "0 -> 1" di bawah lingkaran
  const z = add(centredLatin('0', cx - 160, 1340, 85, t5 + 2.4, { seed: 34 }), 'FL');
  const ar = add(arrow(cx - 80, 1300, cx + 80, 1300, t5 + 2.9, 0.5, { w: 7, color: 'white' }), 'FL');
  const o = add(centredLatin('1', cx + 160, 1340, 85, t5 + 3.4, { seed: 35 }), 'FL');
  text('b3-01', '0 -> 1', 'FL', [...z, ...ar, ...o]);
  const ak = add(centredLatin('aktivasi', cx, 1480, 52, t5 + 3.9, { seed: 36 }), 'FL');
  text('b3-aktivasi', 'aktivasi', 'FL', ak);
  return { end: t5 };
}
