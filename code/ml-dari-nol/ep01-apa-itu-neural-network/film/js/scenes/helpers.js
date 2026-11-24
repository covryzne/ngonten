// Shared drawing helpers for the chalkboard scenes (stroke builders only —
// no times are hardcoded here; callers pass t0/dur from the VO timing table).
import { Stroke, catmull, arc } from '../chalk.js';
import { writeLatin, latinWidth } from '../hand.js';

// One chalk stroke from a polyline (demo film.js pattern).
export const line = (pts, o, t0, dur) => {
  const s = new Stroke(o.smooth ? catmull(pts, 10) : pts, { kind: 'write', taper: .2, taperLen: .2, land: .6, skip: .14, endSpecks: true, specks: .6, ...o });
  s.t0 = t0; s.t1 = t0 + dur; return s;
};

// Centred Latin text (single-line EMS handwriting font). Returns Stroke[].
export const centredLatin = (txt, cx, by, cap, t, o = {}) =>
  writeLatin(txt, cx - latinWidth(txt, cap) / 2, by, cap, t, o);

// A hand-drawn "3": ONE continuous stroke through the glyph's control points
// (catmull-smoothed). Two separate arcs + a flick did NOT read as a "3"
// (stills 24 Nov: looked like ")" with a floating dash) — a single path with
// a proper middle pinch is what the eye recognises. (cx, cy) = centre,
// size = full height. Returns [Stroke] with t0/t1 set.
export function digit3(cx, cy, size, t0, dur, o = {}) {
  const s = size, w = o.w ?? size * .032;
  const pts = [
    [cx - .16 * s, cy - .40 * s], [cx + .02 * s, cy - .48 * s], [cx + .22 * s, cy - .40 * s],
    [cx + .30 * s, cy - .24 * s], [cx + .22 * s, cy - .08 * s], [cx + .02 * s, cy + .00 * s],
    [cx + .24 * s, cy + .10 * s], [cx + .32 * s, cy + .28 * s], [cx + .24 * s, cy + .44 * s],
    [cx + .02 * s, cy + .48 * s], [cx - .14 * s, cy + .42 * s],
  ];
  const st = line(pts, { smooth: true, w, color: o.color || 'white', seed: o.seed ?? 7, wob: o.wob ?? 1.6, rwob: o.rwob ?? .025 }, t0, dur);
  return [st];
}

// A 28x28 pixel grid with the "3" pattern lit up (MNIST).
// (x0, y0) = top-left, cell = cell size. Grid lines draw in parallel;
// filled cells light up with a slight stagger. Returns Stroke[].
export function pixelGrid(x0, y0, cell, t0, o = {}) {
  const N = 28, W = N * cell, color = o.color || 'orange', seed = o.seed ?? 3;
  const out = [];
  // grid lines: verticals then horizontals, drawn in parallel batches
  for (let i = 0; i <= N; i++) {
    out.push(line([[x0 + i * cell, y0], [x0 + i * cell, y0 + W]], { w: 1.6, color: 'white', skip: .3, specks: 0, seed: seed + i }, t0, .3));
    out.push(line([[x0, y0 + i * cell], [x0 + W, y0 + i * cell]], { w: 1.6, color: 'white', skip: .3, specks: 0, seed: seed + 100 + i }, t0 + .3, .3));
  }
  // the "3" pattern: two right-side arcs + middle bar, sampled per cell.
  // Threshold + dot size chosen so the 3 reads at 1080p (stills 24 Nov:
  // dist 1.15 / w 0.44 read as random speckle, not a digit).
  const near = (x, y, cx2, cy2, r, a0, a1) => {
    const dx = x - cx2, dy = y - cy2, d = Math.hypot(dx, dy), a = Math.atan2(dy, dx);
    return Math.abs(d - r) < 1.35 && a >= a0 && a <= a1;
  };
  let k = 0;
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
    const x = i + .5, y = j + .5;
    const on3 = near(x, y, 14.5, 8, 5.5, -1.3, 1.3) || near(x, y, 14.5, 19, 6, -1.25, 1.35) || (y >= 12.5 && y <= 15 && x >= 10.5 && x <= 17);
    if (!on3) continue;
    const px = x0 + x * cell, py = y0 + y * cell;
    const d = new Stroke([[px, py], [px + .1, py]], { kind: 'write', w: cell * .6, color, taper: 0, land: .4, skip: .2, specks: .4, seed: seed + 200 + k });
    d.t0 = t0 + .6 + (k % 9) * .05; d.t1 = d.t0 + .12; out.push(d); k++;
  }
  out.end = t0 + 1.2;
  return out;
}

// A circle (full arc) as one chalk stroke.
export function circle(cx, cy, r, t0, dur, o = {}) {
  const s = arc(cx, cy, r, -Math.PI / 2, Math.PI * 1.5, { kind: 'write', taper: .1, land: .8, ...o });
  s.t0 = t0; s.t1 = t0 + dur; return s;
}

// An arrow: shaft + head (two strokes).
export function arrow(x0, y0, x1, y1, t0, dur, o = {}) {
  const a = Math.atan2(y1 - y0, x1 - x0), L = o.head ?? 34;
  const shaft = line([[x0, y0], [x1, y1]], { ...o }, t0, dur * .7);
  const h = line([[x1 + Math.cos(a + 2.6) * L, y1 + Math.sin(a + 2.6) * L], [x1, y1], [x1 + Math.cos(a - 2.6) * L, y1 + Math.sin(a - 2.6) * L]], { w: o.w ?? 7, color: o.color || 'white', taper: .1 }, t0 + dur * .7, dur * .3);
  return [shaft, h];
}
