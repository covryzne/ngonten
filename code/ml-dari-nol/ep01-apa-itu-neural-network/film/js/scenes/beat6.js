// Beat 6 — Punchline (l11–l12): "13.000" raksasa oranye + "weight + bias".
// Region x 5050–5850 (panel FR).
import { centredLatin } from './helpers.js';

export function buildBeat6(C) {
  const { add, text, L } = C;
  const t11 = L(11).start, t12 = L(12).start;
  const big = add(centredLatin('13.000', 5450, 950, 190, t11 + 0.3, { color: 'orange', seed: 71, lspeed: 30 }), 'FR');
  text('b6-13000', '13.000', 'FR', big);
  const wb = add(centredLatin('weight + bias', 5450, 1130, 62, t11 + 2.6, { seed: 72 }), 'FR');
  text('b6-wb', 'weight + bias', 'FR', wb);
  // garis bawah saat VO bilang "setting ke-13.000 knob itu"
  const ul = add([C.line([[5100, 1000], [5800, 995]], { w: 8, seed: 73 }, t12 + 0.4, .4)], 'FR');
  text('b6-ul', 'underline', 'FR', ul);
  return { end: t12 };
}
