// Beat 5 — Weight & bias (l09–l10): dua neuron masuk ke satu neuron,
// label "w = 0.8" / "w = -0.3", sambungan bias, dan knob yang diputar.
// Region x 4300–5000 (panel FR).
import { arc } from '../chalk.js';
import { circle, arrow, centredLatin } from './helpers.js';
import { writeLatin } from '../hand.js';

export function buildBeat5(C) {
  const { add, text, L } = C;
  const t9 = L(9).start, t10 = L(10).start;
  const wl = add(centredLatin('weight', 4650, 420, 68, t9 + 0.2, { seed: 55 }), 'FR');
  text('b5-weight', 'weight', 'FR', wl);
  // dua neuron kiri -> satu neuron kanan
  const a1 = add([circle(4450, 650, 85, t9 + 0.4, .6, { w: 8, seed: 56 })], 'FR');
  const a2 = add([circle(4450, 1000, 85, t9 + 0.9, .6, { w: 8, seed: 57 })], 'FR');
  const b = add([circle(4900, 825, 95, t9 + 1.4, .6, { w: 8, seed: 58 })], 'FR');
  text('b5-n', 'neurons', 'FR', [...a1, ...a2, ...b]);
  const l1 = add([C.line([[4535, 650], [4805, 790]], { w: 7, seed: 59 }, t9 + 2.0, .3)], 'FR');
  const l2 = add([C.line([[4535, 1000], [4805, 860]], { w: 7, seed: 60 }, t9 + 2.4, .3)], 'FR');
  text('b5-lines', 'connections', 'FR', [...l1, ...l2]);
  // label weight — angka saja ("w = 0.8" selebar ~390 unit TIDAK MUAT di celah
  // 270 unit antar lingkaran; judul shot sudah "weight", jadi angkanya cukup)
  const w1 = add(centredLatin('0.8', 4670, 690, 60, t10 + 0.2, { seed: 61 }), 'FR');
  text('b5-w1', '0.8', 'FR', w1);
  const w2 = add(centredLatin('-0.3', 4700, 1030, 60, t10 + 0.8, { seed: 62 }), 'FR');
  text('b5-w2', '-0.3', 'FR', w2);
  // bias: node "1" kecil di atas neuron B + garis + label
  const biasNode = add([circle(4900, 560, 50, t10 + 1.4, .4, { w: 6, seed: 63 })], 'FR');
  const one = add(writeLatin('1', 4882, 582, 55, t10 + 1.8, { seed: 64 }), 'FR');
  const bl = add([C.line([[4900, 610], [4900, 730]], { w: 6, seed: 65 }, t10 + 2.0, .3)], 'FR');
  const biasLab = add(writeLatin('bias', 4935, 685, 50, t10 + 2.3, { seed: 66 }), 'FR');
  text('b5-bias', 'bias', 'FR', [...biasNode, ...one, ...bl, ...biasLab]);
  // knob: lingkaran + jarum + panah putar
  const knob = add([circle(4650, 1380, 110, t10 + 2.6, .6, { w: 8, seed: 67 })], 'FR');
  const needle = add([C.line([[4650, 1380], [4728, 1302]], { w: 8, seed: 68 }, t10 + 3.3, .25)], 'FR');
  const rot = arc(4650, 1380, 150, -0.5, 0.9, { kind: 'write', w: 6, color: 'white', taper: .1, land: .8, seed: 69 });
  rot.t0 = t10 + 3.6; rot.t1 = t10 + 4.1;
  add([rot], 'FR');
  const head = add(arrow(4650 + 150 * Math.cos(0.9) - 14, 1380 + 150 * Math.sin(0.9) - 6, 4650 + 150 * Math.cos(0.9), 1380 + 150 * Math.sin(0.9), t10 + 4.1, .2, { w: 6, head: 26 }), 'FR');
  const knobLab = add(centredLatin('knob', 4650, 1580, 50, t10 + 4.4, { seed: 70 }), 'FR');
  text('b5-knob', 'knob', 'FR', [...knob, ...needle, ...head, ...knobLab]);
  return { end: t10 };
}
