// ML dari Nol E01 — "Apa itu neural network?" — film-as-data.
// Membangun semua stroke kapur dari 7 scene + end card, kamera per shot,
// dan event (subtitle + foley kapur). SEMUA waktu berasal dari story.js
// (vo_times.json) — tidak ada waktu absolut yang di-hardcode di sini.
import { clamp, lerp, eio } from '/core/lib.js';
import { line } from './scenes/helpers.js';
import { buildBeat1 } from './scenes/beat1.js';
import { buildBeat2 } from './scenes/beat2.js';
import { buildBeat3 } from './scenes/beat3.js';
import { buildBeat4 } from './scenes/beat4.js';
import { buildBeat5 } from './scenes/beat5.js';
import { buildBeat6 } from './scenes/beat6.js';
import { buildBeat7 } from './scenes/beat7.js';
import { buildEndcard } from './scenes/endcard.js';

export function build(W, H, ST) {
  const S = [], TX = [], EV = [];
  const L = n => ST.LINES[n];
  const add = (strokes, layer) => { for (const s of strokes) { s.layer = layer; S.push(s); } return strokes; };
  const text = (id, txt, layer, strokes, t1 = ST.DUR) => {
    const x0 = Math.min(...strokes.flatMap(s => s.pts.map(p => p[0]))), x1 = Math.max(...strokes.flatMap(s => s.pts.map(p => p[0])));
    const y0 = Math.min(...strokes.flatMap(s => s.pts.map(p => p[1]))), y1 = Math.max(...strokes.flatMap(s => s.pts.map(p => p[1])));
    const t0 = Math.min(...strokes.map(s => s.t0));
    TX.push({ id, text: txt, layer, t0, t1, box: [x0, y0, x1, y1] });
  };
  const C = { add, text, line, L, ST };
  buildBeat1(C); buildBeat2(C); buildBeat3(C); buildBeat4(C);
  buildBeat5(C); buildBeat6(C); buildBeat7(C); buildEndcard(C);
  S.sort((a, b) => a.t0 - b.t0);

  // ── camera: one shot per beat, slight drift inside each shot ──
  const shots = ST.SHOTS.map(s => ({
    ...s,
    keys: [[s.a, s.cx, s.cy, s.s], [s.b, s.cx + 12, s.cy + 6, s.s]],
  }));
  const camAt = t => {
    const sh = shots.find(s => t >= s.a && t < s.b) || shots[shots.length - 1];
    const [[t0, x0, y0, s0], [t1, x1, y1, s1]] = sh.keys;
    const f = eio(clamp((t - t0) / (t1 - t0), 0, 1));
    return { cx: lerp(x0, x1, f), cy: lerp(y0, y1, f), s: lerp(s0, s1, f), shot: sh.id };
  };

  // ── sliding panel: FL moves right once, after the VO ends ──
  const slideX = t => 3200 * eio(clamp((t - ST.slide0) / (ST.slide1 - ST.slide0), 0, 1));

  // ── events: subtitle lines + chalk foley onsets ──
  for (const v of ST.VO) EV.push({ t: v.t, type: 'sub', id: v.id, end: v.end, text: v.sub });
  for (const s of S) EV.push({ t: s.t0, type: 'chalk', layer: s.layer });
  EV.sort((a, b) => a.t - b.t);

  return { S, TX, EV, DUR: ST.DUR, slideX, camAt, shots };
}
