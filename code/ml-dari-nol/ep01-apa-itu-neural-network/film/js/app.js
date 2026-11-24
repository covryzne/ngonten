// ML dari Nol E01 — compositor. Canvas 2D (dinding, papan, kapur) + WebGL2 post pass.
// Disederhanakan dari demo chalkboard: tanpa wet streak, tanpa wipe, tanpa subtitle
// plate (subtitle jadi file .srt terpisah). Panel geser dipakai untuk end card.
import { clamp, lerp, ss, eio } from '/core/lib.js';
import { bake, drawStroke, n1, rng } from './chalk.js';
import { installDeposit, grainTile } from './r2d.js';
import { Post } from './post.js';
import { loadSvgFont } from './hand.js';
import { bakeWall, bakeSlate, WALL, PW, BH } from './stage.js';
import { drawFront } from './props.js';
import { makeStory } from '../story.js';

const Q = new URLSearchParams(location.search), W = innerWidth, H = innerHeight;
const cv = document.getElementById('c');
cv.width = W; cv.height = H;
await loadSvgFont('fonts/EMSDelight.svg');
await loadSvgFont('fonts/EMSCasualHand.svg', 'child');
installDeposit();

const VT = await (await fetch('vo_times.json')).json();
const ST = makeStory(VT);
const { build } = await import('./film.js');
const F = build(W, H, ST);
for (const s of F.S) bake(s, s.o.R || 2);
window.DUR = F.DUR; window.EV = F.EV;

// ───────── static pictures
const WALLI = bakeWall();
const BACK = bakeSlate(PW + 140, BH, 61), FR = bakeSlate(PW, BH, 71, true), FL = bakeSlate(PW, BH, 81, true);
const TILE = grainTile();

const post = new Post(cv, W, H);
const main = new OffscreenCanvas(W, H), mx = main.getContext('2d');
const PAT = mx.createPattern(TILE, 'repeat');
const KS = W / 1920;                                    // camera scales are given for a 1920-wide frame
const view = c0 => { const c = { ...c0, s: c0.s * KS }; return { ...c, m: [c.s, 0, 0, c.s, W / 2 - c.cx * c.s, H / 2 - c.cy * c.s], toScreen: (x, y) => [W / 2 + (x - c.cx) * c.s, H / 2 + (y - c.cy) * c.s], W, H }; };

function frame(t) {
  const c = F.camAt(t), v = view(c), ox = F.slideX(t);
  mx.setTransform(1, 0, 0, 1, 0, 0); mx.globalCompositeOperation = 'source-over'; mx.globalAlpha = 1; mx.filter = 'none';
  mx.fillStyle = '#000'; mx.fillRect(0, 0, W, H);
  mx.setTransform(...v.m); mx.imageSmoothingQuality = 'high';
  mx.drawImage(WALLI.cv, WALL[0], WALL[1], WALL[2], WALL[3]);
  // back board and its chalk (only ever seen once the panel has moved)
  if (ox > 1) {
    mx.drawImage(BACK.cv, -BACK.m, 0, BACK.cv.width, BH);
    for (const s of F.S) if (s.layer === 'BK' && t > s.t0) drawStroke(mx, s, t);
  }
  // FR (static), then FL on its offset with a soft occlusion shadow on what is behind its left edge
  mx.drawImage(FR.cv, PW - FR.m, 0, FR.cv.width, BH);
  for (const s of F.S) if (s.layer === 'FR' && t > s.t0) drawStroke(mx, s, t);
  if (ox > 1) { const g = mx.createLinearGradient(ox - 60, 0, ox, 0); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.45)'); mx.fillStyle = g; mx.fillRect(ox - 60, 0, 60, BH); }
  mx.drawImage(FL.cv, ox - FL.m, 0, FL.cv.width, BH);
  mx.setTransform(v.m[0], 0, 0, v.m[3], v.m[4] + ox * v.s, v.m[5]);
  for (const s of F.S) if (s.layer === 'FL' && t > s.t0) drawStroke(mx, s, t);
  mx.setTransform(...v.m);
  // slate micro grain where it can be seen
  if (v.s / KS > .6) {
    mx.save(); mx.beginPath(); mx.rect(0, 0, 6400, BH); mx.clip();
    PAT.setTransform(new DOMMatrix([.25, 0, 0, .25, 0, 0])); mx.globalCompositeOperation = 'soft-light'; mx.globalAlpha = Math.min(.2, (v.s / KS - .6) * .3);
    mx.fillStyle = PAT; mx.fillRect(0, 0, 6400, BH); mx.restore();
  }
  // morning light from the windows on the left: a soft falloff and a slanted patch low on the left
  mx.save(); mx.setTransform(...v.m);
  const lg = mx.createLinearGradient(-1500, 0, 7900, 0); lg.addColorStop(0, 'rgb(255,250,240)'); lg.addColorStop(.45, 'rgb(236,236,232)'); lg.addColorStop(1, 'rgb(196,198,200)');
  mx.globalCompositeOperation = 'multiply'; mx.fillStyle = lg; mx.fillRect(-1500, -1500, 9400, 4900);
  mx.globalCompositeOperation = 'screen'; mx.filter = `blur(${Math.max(3, 40 * v.s)}px)`;
  const pane = (x, y, w, h, a) => { mx.fillStyle = `rgba(255,212,150,${a})`; mx.beginPath(); mx.moveTo(x, y); mx.lineTo(x + w, y + w * .28); mx.lineTo(x + w, y + w * .28 + h); mx.lineTo(x, y + h); mx.closePath(); mx.fill(); };
  for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) pane(-260 + i * 400, 1060 + j * 330 + i * 400 * .28, 360, 300, .07 - i * .018);
  mx.restore();
  // the chalk's front: a few bright grains where the writing is now
  for (const s of F.S) {
    if (t <= s.t0 || t >= s.t1) continue;
    const f = s.prog(t); const p = s.at(f * s.len), o = s.layer === 'FL' ? ox : 0;
    drawFront(mx, t, v, p[0] + o, p[1], s.color, Math.min(s.w, 9), .5);
  }
  return c;
}

const shotOf = t => F.camAt(t).shot;
window.render = t => {
  const c = frame(t);
  const tp = t - .5 / 30, pc = shotOf(tp) === c.shot ? F.camAt(tp) : c, k = pc.s / c.s;
  const bl = [k, 0, 0, 0, k, 0, W / 2 - k * W / 2 + pc.s * KS * (c.cx - pc.cx), H / 2 - k * H / 2 + pc.s * KS * (c.cy - pc.cy), 1];
  post.draw(main, bl, t, .3);
};
window.TEXTS = t => {
  const c = F.camAt(t), v = view(c), ox = F.slideX(t), out = [];
  for (const q of F.TX) {
    if (t < q.t0 || t >= q.t1) continue;
    const o = q.layer === 'FL' ? ox : 0, [a, b] = v.toScreen(q.box[0] + o, q.box[1]), [d, e] = v.toScreen(q.box[2] + o, q.box[3]);
    out.push({ id: q.id, text: q.text, x0: a, y0: b, x1: d, y1: e });
  }
  return out;
};
window.F = F;
window.render(+(Q.get('t') || 0));
window.READY = true;
