// Beat 2 — Kontras dibalik (l03–l04): dua tulisan "3" yang berbeda + "???",
// lalu istilah "neural network" diperkenalkan. Region x 1100–2050 (panel FL).
import { digit3, centredLatin } from './helpers.js';

export function buildBeat2(C) {
  const { add, text, L } = C;
  const t3 = L(3).start, t4 = L(4).start;
  // dua tulisan 3 yang berbeda — rapi dan corat-coret
  const a = add(digit3(1380, 720, 430, t3 + 0.2, 1.1, { color: 'orange', seed: 21 }), 'FL');
  const b = add(digit3(1780, 730, 400, t3 + 1.6, 1.1, { color: 'orange', seed: 22, wob: 4, rwob: .06 }), 'FL');
  text('b2-3a', '3', 'FL', a); text('b2-3b', '3', 'FL', b);
  // "???" saat VO bilang "tebak angkanya"
  const q = add(centredLatin('???', 1575, 1180, 95, t3 + 3.2, { seed: 23 }), 'FL');
  text('b2-q', '???', 'FL', q);
  // "neural network" saat VO bilang "di sinilah neural network masuk"
  const nn = add(centredLatin('neural network', 1575, 1420, 68, t4 + 0.6, { seed: 24 }), 'FL');
  text('b2-nn', 'neural network', 'FL', nn);
  return { end: t4 };
}
