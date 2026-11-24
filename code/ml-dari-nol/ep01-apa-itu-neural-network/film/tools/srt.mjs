// Export subtitles from vo_times.json + story.js (no burned-in subtitles in the film).
// Usage: node tools/srt.mjs [--out out/ml-e01-chalkboard.srt]
import fs from 'fs'; import path from 'path';
import { fileURLToPath } from 'url';
import { makeStory } from '../story.js';
const DEMO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const VT = JSON.parse(fs.readFileSync(path.join(DEMO, 'vo_times.json'), 'utf8'));
const ST = makeStory(VT);
const fmt = t => { const m = Math.floor(t / 60), s = Math.floor(t % 60), ms = Math.round((t % 1) * 1000); return `00:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(ms).padStart(3, '0')}`; };
let out = '';
ST.VO.forEach((v, i) => { out += `${i + 1}\n${fmt(v.t)} --> ${fmt(v.end)}\n${v.sub}\n\n`; });
const outPath = path.resolve(opt('--out', path.join(DEMO, 'out', 'ml-e01-chalkboard.srt')));
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out);
console.log('wrote', outPath, ST.VO.length, 'cues, DUR', ST.DUR + 's');
