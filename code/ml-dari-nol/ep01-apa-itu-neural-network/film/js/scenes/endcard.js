// End card (papan BELAKANG, layer BK): terungkap saat panel depan meluncur
// ke kanan setelah VO berakhir. Semua waktu relatif ke ST.voEnd.
import { centredLatin } from './helpers.js';

export function buildEndcard(C) {
  const { add, text, ST } = C;
  const v = ST.voEnd;
  // Ditulis lebih awal + lebih cepat: stills 24 Nov menunjukkan baris terakhir
  // belum selesai di t=96,0 (baru "nyari setting 13.000 anc").
  const t1 = add(centredLatin('ML dari Nol', 1600, 720, 115, v + 0.15, { seed: 91, lspeed: 150 }), 'BK');
  text('ec-title', 'ML dari Nol', 'BK', t1);
  const t2 = add(centredLatin('@covryzne.ai', 1600, 900, 78, v + 0.7, { seed: 92, lspeed: 170 }), 'BK');
  text('ec-handle', '@covryzne.ai', 'BK', t2);
  const t3 = add(centredLatin('Besok: gimana komputer', 1600, 1080, 50, v + 1.2, { seed: 93, lspeed: 220 }), 'BK');
  text('ec-next1', 'Besok: gimana komputer', 'BK', t3);
  const t4 = add(centredLatin('nyari setting 13.000 angka itu', 1600, 1160, 50, v + 1.55, { seed: 94, lspeed: 220 }), 'BK');
  text('ec-next2', 'nyari setting 13.000 angka itu', 'BK', t4);
  return { end: v };
}
