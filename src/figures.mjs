// Hand-drawn SVG figures. Each key matches a "FIG x.y" id in the markdown.
// Parts are <g class="part" data-part="n">; callouts are <g class="lbl" data-part="n">.
// Colours come from CSS classes (see styles.css → "Figure palette") so the colour code stays consistent.

const co = (n, x1, y1, x2, y2) =>
  `<g class="lbl" data-part="${n}"><path class="leader" d="M${x1},${y1} L${x2},${y2}"/><circle class="ldot" cx="${x1}" cy="${y1}" r="4"/><circle class="bdg" cx="${x2}" cy="${y2}" r="13"/><text class="bdg-t" x="${x2}" y="${y2 + 5}">${n}</text></g>`;

// Outlined "tube" for vessels / nerves: ink outline underneath, colour on top.
const tube = (d, cls, w = 8) =>
  `<path class="tube-o" d="${d}" stroke-width="${w + 6}"/><path class="tube ${cls}" d="${d}" stroke-width="${w}"/>`;

const part = (n, inner) => `<g class="part" data-part="${n}">${inner}</g>`;

const dot = (path, cls, dur, begin) =>
  `<circle class="flow ${cls}" r="5"><animateMotion dur="${dur}s" begin="-${begin}s" repeatCount="indefinite" path="${path}"/></circle>`;

/* ---------------- FIG 2.1 — Layers ---------------- */
const wave = Array.from({ length: 11 }, () => 'q-20,14 -40,0').join(' ');
const fatLobules = [];
for (let x = 52; x < 460; x += 34) {
  fatLobules.push(`<circle class="lobule" cx="${x}" cy="${x % 68 ? 112 : 168}" r="9"/>`);
}
const fibres = [];
for (let y = 206; y < 260; y += 11) fibres.push(`<path class="fibre" d="M34,${y} H466"/>`);

const fig21 = `<svg viewBox="0 0 560 340" role="img">
<defs><pattern id="bonedots21" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="2.2" class="sp"/><circle cx="12" cy="11" r="1.6" class="sp"/></pattern></defs>
${part(8, `<rect class="o2 f-bone" x="30" y="270" width="440" height="50"/><rect fill="url(#bonedots21)" x="30" y="270" width="440" height="50"/>`)}
${part(7, `<rect class="o2 f-perio" x="30" y="262" width="440" height="8"/>`)}
${part(6, `<rect class="o2 f-muscle" x="30" y="196" width="440" height="66"/>${fibres.join('')}`)}
${part(5, `<rect class="o2 f-fascia" x="30" y="180" width="440" height="16"/>`)}
${part(3, `<rect class="o2 f-fat" x="30" y="100" width="440" height="80"/>${fatLobules.join('')}`)}
${part(4, tube('M30,130 C150,118 300,142 470,126', 't-vein', 10) + tube('M30,160 C160,168 320,150 470,160', 't-nerve', 5))}
${part(2, `<rect class="o2 f-dermis" x="30" y="48" width="440" height="52"/>`)}
${part(1, `<path class="o2 f-skin" d="M30,30 H470 V50 ${wave} Z"/>`)}
<rect class="o f-none" x="30" y="30" width="440" height="290" rx="4"/>
${co(1, 450, 40, 512, 34)}${co(2, 450, 82, 512, 72)}${co(3, 440, 110, 512, 108)}
${co(4, 420, 129, 512, 144)}${co(5, 450, 188, 512, 186)}${co(6, 450, 230, 512, 226)}
${co(7, 450, 266, 512, 262)}${co(8, 450, 298, 512, 300)}
</svg>`;

/* ---------------- FIG 3.1 — Long bone ---------------- */
const fig31 = `<svg viewBox="0 0 400 620" role="img">
<defs><pattern id="spongy31" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="2.2" class="sp"/><circle cx="11" cy="10" r="1.6" class="sp"/></pattern></defs>
${part(5, `<path class="o f-bone2" d="M120,134 L280,134 C280,170 245,180 245,205 L245,415 C245,440 280,450 280,486 L120,486 C120,450 155,440 155,415 L155,205 C155,180 120,170 120,134 Z"/>`)}
${part(4, `<path class="o f-meta" d="M120,134 L280,134 C280,170 245,180 245,205 L155,205 C155,180 120,170 120,134 Z"/><path class="o f-meta" d="M155,415 L245,415 C245,440 280,450 280,486 L120,486 C120,450 155,440 155,415 Z"/>
<path fill="url(#spongy31)" d="M120,134 L280,134 C280,170 245,180 245,205 L155,205 C155,180 120,170 120,134 Z"/><path fill="url(#spongy31)" d="M155,415 L245,415 C245,440 280,450 280,486 L120,486 C120,450 155,440 155,415 Z"/>`)}
${part(6, `<rect class="o f-marrow" x="177" y="186" width="46" height="250" rx="22"/>`)}
${part(2, `<path class="o f-bone" d="M120,120 L120,80 Q120,40 200,38 Q280,40 280,80 L280,120 Z"/><path fill="url(#spongy31)" d="M120,120 L120,80 Q120,40 200,38 Q280,40 280,80 L280,120 Z"/>
<path class="o f-bone" d="M120,500 L280,500 L280,540 Q280,580 200,582 Q120,580 120,540 Z"/><path fill="url(#spongy31)" d="M120,500 L280,500 L280,540 Q280,580 200,582 Q120,580 120,540 Z"/>`)}
${part(3, `<rect class="o f-cart" x="120" y="120" width="160" height="14"/><rect class="o f-cart" x="120" y="486" width="160" height="14"/>`)}
${part(1, `<path class="o f-cart" d="M120,84 Q120,40 200,38 Q280,40 280,84 L268,86 Q268,54 200,52 Q132,54 132,86 Z"/><path class="o f-cart" d="M120,536 Q120,580 200,582 Q280,580 280,536 L268,534 Q268,566 200,568 Q132,566 132,534 Z"/>`)}
${part(7, `<path class="perio" d="M147,196 L147,424"/><path class="perio" d="M253,196 L253,424"/>`)}
${part(8, tube('M30,400 C80,385 120,360 150,335 L190,302', 't-art', 6))}
${co(1, 250, 48, 352, 40)}${co(2, 250, 98, 352, 92)}${co(3, 272, 127, 352, 136)}${co(4, 238, 172, 352, 182)}
${co(5, 234, 300, 352, 282)}${co(6, 200, 360, 352, 350)}${co(7, 253, 400, 352, 412)}${co(8, 109, 364, 40, 320)}
</svg>`;

/* ---------------- FIG 5.2 — Synovial joint ---------------- */
const fig52 = `<svg viewBox="0 0 520 420" role="img">
${part(3, `<path class="f-fluid" d="M170,110 C110,140 110,280 170,310 L350,310 C410,280 410,140 350,110 Z"/>`)}
${part(5, tube('M160,80 C78,130 78,290 160,340', 't-lig', 8))}
${part(4, tube('M170,104 C102,136 102,284 170,316', 't-cap', 10) + tube('M350,104 C418,136 418,284 350,316', 't-cap', 10))}
${part(2, `<path class="synm" d="M166,148 L166,122 C122,148 122,272 166,298 L166,272"/><path class="synm" d="M354,148 L354,122 C398,148 398,272 354,298 L354,272"/>`)}
${part(6, `<path class="o f-bone" d="M170,10 L170,150 Q170,190 260,192 Q350,190 350,150 L350,10"/><path class="o f-bone" d="M170,410 L170,270 Q170,230 260,228 Q350,230 350,270 L350,410"/>
<text class="lab" x="260" y="80" text-anchor="middle">BONE A</text><text class="lab" x="260" y="350" text-anchor="middle">BONE B</text>`)}
${part(1, `<path class="o f-cart" d="M170,150 Q170,190 260,192 Q350,190 350,150 L338,142 Q338,176 260,178 Q182,176 182,142 Z"/><path class="o f-cart" d="M170,270 Q170,230 260,228 Q350,230 350,270 L338,278 Q338,244 260,242 Q182,244 182,278 Z"/>`)}
${co(1, 300, 184, 486, 160)}${co(2, 387, 210, 486, 215)}${co(3, 230, 210, 36, 130)}
${co(4, 388, 146, 486, 96)}${co(5, 99, 210, 36, 260)}${co(6, 310, 60, 486, 36)}
</svg>`;

/* ---------------- FIG 6.2 — Levers ---------------- */
const beam = (by) => `<rect class="o f-bone" x="60" y="${by - 6}" width="480" height="12" rx="6"/>`;
const fulcrum = (fx, by) => `<polygon class="o f-scrublt" points="${fx - 24},${by + 40} ${fx + 24},${by + 40} ${fx},${by + 6}"/><text class="lever-t" x="${fx}" y="${by + 35}">F</text>`;
const load = (lx, by) => `<rect class="o f-muscle" x="${lx - 26}" y="${by - 58}" width="52" height="52" rx="6"/><text class="lever-t lt-light" x="${lx}" y="${by - 26}">L</text>`;
const effort = (ex, by, dir) =>
  dir === 'down'
    ? `<path class="arrow" d="M${ex},${by - 74} L${ex},${by - 26}"/><polygon class="arrowhead" points="${ex - 12},${by - 28} ${ex + 12},${by - 28} ${ex},${by - 9}"/><text class="lever-t" x="${ex + 24}" y="${by - 46}">E</text>`
    : `<path class="arrow" d="M${ex},${by + 74} L${ex},${by + 26}"/><polygon class="arrowhead" points="${ex - 12},${by + 28} ${ex + 12},${by + 28} ${ex},${by + 9}"/><text class="lever-t" x="${ex + 24}" y="${by + 56}">E</text>`;
const fig62 = `<svg viewBox="0 0 600 440" role="img">
${part(1, `<text class="lab" x="60" y="22">1ST ORDER · F IN THE MIDDLE</text>${beam(95)}${fulcrum(300, 95)}${effort(110, 95, 'down')}${load(500, 95)}`)}
${part(2, `<text class="lab" x="60" y="166">2ND ORDER · L IN THE MIDDLE</text>${beam(235)}${fulcrum(80, 235)}${load(300, 235)}${effort(520, 235, 'up')}`)}
${part(3, `<text class="lab" x="60" y="306">3RD ORDER · E IN THE MIDDLE ★ MOST COMMON</text>${beam(375)}${fulcrum(80, 375)}${effort(300, 375, 'up')}${load(500, 375)}`)}
${co(1, 540, 95, 578, 60)}${co(2, 540, 235, 578, 200)}${co(3, 540, 375, 578, 340)}
</svg>`;

/* ---------------- FIG 7.1 — Artery vs vein ---------------- */
const vasa = [[150, 47], [243, 140], [150, 233], [57, 140], [430, 72], [535, 140], [430, 208], [325, 140]]
  .map(([x, y]) => `<circle class="f-art o1" cx="${x}" cy="${y}" r="4"/>`).join('');
const fig71 = `<svg viewBox="0 0 600 300" role="img">
${part(3, `<circle class="o f-adv" cx="150" cy="140" r="100"/><ellipse class="o f-adv" cx="430" cy="140" rx="118" ry="80"/>${vasa}`)}
${part(2, `<circle class="o f-media" cx="150" cy="140" r="86"/><ellipse class="o f-media" cx="430" cy="140" rx="90" ry="55"/>`)}
${part(1, `<circle class="o f-intima" cx="150" cy="140" r="50"/><ellipse class="o f-intima" cx="430" cy="140" rx="82" ry="48"/>`)}
${part(4, `<circle class="o f-art" cx="150" cy="140" r="42"/><ellipse class="o f-vein" cx="430" cy="140" rx="75" ry="42"/>`)}
<text class="lab" x="150" y="276" text-anchor="middle">ARTERY · THICK MEDIA</text><text class="lab" x="430" y="276" text-anchor="middle">VEIN · THICK ADVENTITIA</text>
${co(3, 84, 74, 24, 40)}${co(2, 102, 92, 24, 95)}${co(1, 117, 107, 24, 150)}${co(4, 136, 126, 24, 205)}
${co(3, 535, 140, 578, 140)}${co(2, 430, 89, 578, 60)}${co(1, 430, 185, 578, 222)}
</svg>`;

/* ---------------- FIG 7.3 — Anastomosis vs end artery ---------------- */
const cross = (x, y) => `<path class="xmark" d="M${x - 11},${y - 11} L${x + 11},${y + 11} M${x + 11},${y - 11} L${x - 11},${y + 11}"/>`;
const bPath = 'M260,40 C240,120 200,170 150,200 L150,238';
const fig73 = `<svg viewBox="0 0 640 330" role="img">
<text class="lab lab-b" x="150" y="22" text-anchor="middle">ANASTOMOSIS</text><text class="lab lab-b" x="490" y="22" text-anchor="middle">END ARTERY</text>
<path class="divider" d="M320,10 L320,320"/>
${part(3, `<ellipse class="o f-tissue" cx="150" cy="268" rx="80" ry="42"/><text class="lab" x="150" y="273" text-anchor="middle">ALIVE ✓</text>`)}
${part(2, tube('M260,40 C240,120 200,170 150,200', 't-art', 7) + tube('M150,200 L150,232', 't-art', 7) + dot(bPath, 'f-paper', 2.4, 0) + dot(bPath, 'f-paper', 2.4, 0.8) + dot(bPath, 'f-paper', 2.4, 1.6) + `<text class="lab" x="272" y="38">B</text>`)}
${part(1, tube('M40,40 C60,120 100,170 150,200', 't-art', 7) + cross(68, 113) + `<text class="lab" x="22" y="38">A</text>` + tube('M490,40 L490,78', 't-art', 7) + cross(490, 80))}
${part(5, `<path class="o f-infarct" d="M410,208 L570,208 L530,300 L450,300 Z"/><text class="lab" x="490" y="262" text-anchor="middle">INFARCT</text>`)}
${part(4, tube('M490,92 L490,120', 't-dead', 7) + tube('M490,120 C470,150 440,180 430,212', 't-dead', 6) + tube('M490,120 L490,212', 't-dead', 6) + tube('M490,120 C510,150 540,180 550,212', 't-dead', 6))}
${co(1, 68, 113, 24, 170)}${co(1, 490, 80, 430, 60)}${co(2, 237, 104, 292, 150)}${co(3, 215, 255, 292, 262)}
${co(4, 530, 175, 610, 140)}${co(5, 535, 280, 610, 300)}
</svg>`;

/* ---------------- FIG 8.3 — Lymph node ---------------- */
const follicles = [[115, 170], [138, 112], [196, 74], [270, 64], [345, 78], [138, 228], [196, 266], [270, 276], [345, 262]]
  .map(([x, y]) => `<circle class="o2 f-foll" cx="${x}" cy="${y}" r="17"/><circle class="f-germ" cx="${x}" cy="${y}" r="8"/>`).join('');
const bean = 'M90,170 C90,70 190,40 290,45 C400,50 470,100 470,140 C470,160 430,160 430,170 C430,180 470,180 470,200 C470,240 400,290 290,295 C190,300 90,270 90,170 Z';
const aff = (x1, y1, x2, y2) => `<path class="tube-o" d="M${x1},${y1} L${x2},${y2}" stroke-width="11"/><path class="tube t-lymph" d="M${x1},${y1} L${x2},${y2}" stroke-width="5" marker-end="url(#ah83)"/>`;
const fig83 = `<svg viewBox="0 0 600 340" role="img">
<defs><marker id="ah83" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" class="f-lymph o1"/></marker></defs>
${part(6, tube('M430,170 L590,170', 't-lymph', 8) + tube('M590,148 C540,148 470,154 440,162', 't-art', 5) + tube('M440,180 C470,186 540,192 590,192', 't-vein', 5))}
${part(2, `<path class="cap83" d="${bean}"/>`)}
<path class="f-cortex" d="${bean}"/>
${part(4, `<path class="f-para" d="M140,170 C140,100 210,80 290,85 C380,90 420,125 420,150 L420,190 C420,215 380,250 290,255 C210,260 140,240 140,170 Z"/>`)}
${part(5, `<path class="f-med o2" d="M200,170 C200,130 250,120 300,122 C360,125 415,150 432,170 C415,190 360,215 300,218 C250,220 200,210 200,170 Z"/>
<path class="cord" d="M220,160 C300,146 380,158 428,168"/><path class="cord" d="M220,182 C300,196 380,184 428,172"/><path class="cord" d="M250,140 C320,140 390,160 428,169"/><path class="cord" d="M250,202 C320,202 390,182 428,171"/>`)}
${part(3, follicles)}
<path class="o f-none" d="${bean}" stroke-width="5"/>
${part(1, aff(20, 170, 84, 170) + aff(55, 55, 110, 94) + aff(200, 4, 203, 45) + aff(205, 336, 203, 296) + aff(55, 292, 110, 248))}
${co(1, 50, 170, 24, 118)}${co(2, 290, 46, 340, 18)}${co(3, 196, 266, 140, 322)}
${co(4, 300, 240, 300, 324)}${co(5, 330, 160, 430, 30)}${co(6, 520, 170, 528, 116)}
</svg>`;

/* ---------------- FIG 9.2 — Spinal nerve ---------------- */
const dorsalRoot = 'M170,126 C215,104 255,100 300,106';
const postGang = 'M364,112 C400,120 425,150 446,182';
const ventralRoot = 'M164,252 C230,282 360,276 446,200';
const sensoryIn = 'M446,182 C425,150 400,120 364,112 L300,106 C255,100 215,104 170,126';
const motorOut = 'M164,252 C230,282 360,276 446,200 L515,191';
const fig92 = `<svg viewBox="0 0 690 380" role="img">
${part(1, `<ellipse class="o f-white" cx="130" cy="190" rx="110" ry="88"/>
<path class="o2 f-grey" d="M130,176 C116,170 104,150 98,124 C97,116 108,114 110,121 C114,140 122,156 130,160 C138,156 146,140 150,121 C152,114 163,116 162,124 C156,150 144,170 130,176 Z"/>
<path class="o2 f-grey" d="M130,198 C110,200 90,214 88,240 C87,256 106,260 114,250 C122,238 126,226 130,220 C134,226 138,238 146,250 C154,260 173,256 172,240 C170,214 150,200 130,198 Z"/>
<rect class="f-grey" x="118" y="170" width="24" height="32"/><circle class="f-ink" cx="130" cy="187" r="4"/>
<text class="lab" x="130" y="98" text-anchor="middle">DORSAL</text><text class="lab" x="130" y="296" text-anchor="middle">VENTRAL</text>`)}
${part(8, tube('M585,316 L585,372', 't-grey', 6) + tube('M554,222 C552,268 566,300 578,327', 't-white', 5) + tube('M568,233 C576,270 590,300 592,326', 't-grey', 5) + `<circle class="o f-symp" cx="585" cy="340" r="16"/>`)}
${part(6, tube('M512,188 C560,168 600,120 650,96', 't-nerve', 12))}
${part(7, tube('M512,194 C560,214 600,268 660,300', 't-nerve', 14))}
${part(4, tube(ventralRoot, 't-nerve', 10))}
${part(2, tube(dorsalRoot, 't-nerve', 10) + tube(postGang, 't-nerve', 10))}
${part(5, tube('M440,191 L515,191', 't-nerve', 20))}
${part(3, `<ellipse class="o f-nerve" cx="332" cy="108" rx="34" ry="22"/><circle class="f-paper o1" cx="320" cy="104" r="4"/><circle class="f-paper o1" cx="336" cy="114" r="4"/><circle class="f-paper o1" cx="346" cy="100" r="4"/>`)}
<g class="flows">${dot(sensoryIn, 'f-vein', 3, 0)}${dot(sensoryIn, 'f-vein', 3, 1)}${dot(sensoryIn, 'f-vein', 3, 2)}${dot(motorOut, 'f-art', 3, 0)}${dot(motorOut, 'f-art', 3, 1)}${dot(motorOut, 'f-art', 3, 2)}</g>
<text class="lab lab-vein" x="180" y="84">◄ SENSORY IN</text><text class="lab lab-art" x="196" y="306">MOTOR OUT ►</text>
${co(1, 60, 190, 30, 40)}${co(2, 240, 102, 240, 40)}${co(3, 332, 92, 332, 40)}${co(4, 298, 266, 298, 346)}
${co(5, 478, 191, 478, 128)}${co(6, 580, 144, 545, 88)}${co(7, 626, 279, 670, 236)}${co(8, 600, 340, 652, 356)}
</svg>`;

/* ---------------- FIG 10.1 — Serous membrane ---------------- */
const P = 'M199,330 C120,330 40,280 40,170 C40,60 130,15 230,15 C330,15 420,60 420,170 C420,280 340,330 261,330';
const fig101 = `<svg viewBox="0 0 460 370" role="img">
<path class="tube-o" d="${P}" stroke-width="44"/><path class="tube t-wall" d="${P}" stroke-width="38"/>
${part(3, `<path class="f-fluid" d="${P} Z"/>`)}
${part(1, `<path class="serous-p" d="${P}"/>`)}
${part(2, `<ellipse class="serous-v" cx="230" cy="165" rx="101" ry="81"/>`)}
${part(4, `<ellipse class="o f-muscle" cx="230" cy="165" rx="95" ry="75"/><text class="lab lt-light" x="230" y="160" text-anchor="middle">ORGAN</text><text class="emoji" x="230" y="192" text-anchor="middle">✊</text>`)}
${part(5, `<rect class="o f-muscle" x="205" y="236" width="50" height="124"/><path class="serous-v" d="M199,240 L199,330 M261,240 L261,330"/>`)}
${co(1, 420, 170, 444, 118)}${co(2, 331, 165, 444, 210)}${co(3, 360, 100, 444, 40)}${co(4, 160, 170, 18, 210)}${co(5, 230, 300, 120, 352)}
</svg>`;

/* ---------------- FIG 11.1 — X-ray density ---------------- */
const xr = [['#0B0B0B', 'AIR', 'lungs, gut gas'], ['#454545', 'FAT', 'darker grey'], ['#8C8C8C', 'SOFT TISSUE', '& fluid, organs'], ['#D6D6D6', 'BONE', 'calcium'], ['#FFFFFF', 'METAL', 'implants, barium']];
const fig111 = `<svg viewBox="0 0 640 210" role="img">
<text class="lab" x="20" y="22">◄ RADIOLUCENT (BLACK)</text><text class="lab" x="620" y="22" text-anchor="end">RADIOPAQUE (WHITE) ►</text>
${xr.map(([c, n, s], i) => part(i + 1, `<rect class="o" style="fill:${c}" x="${20 + i * 120}" y="38" width="120" height="96"/><text class="lab lab-b" x="${80 + i * 120}" y="160" text-anchor="middle">${n}</text><text class="lab lab-s" x="${80 + i * 120}" y="180" text-anchor="middle">${s}</text>`)).join('')}
<rect class="o f-none" x="20" y="38" width="600" height="96" rx="2"/>
${xr.map((_, i) => co(i + 1, 80 + i * 120, 110, 80 + i * 120, 70)).join('')}
</svg>`;

export const FIGURES = {
  '2.1': {
    svg: fig21,
    alt: 'Cut block of tissue showing, from surface to bone: wavy epidermis, dermis, yellow fatty superficial fascia carrying a blue superficial vein and a yellow cutaneous nerve, a thin grey deep fascia, rose-coloured muscle, dark periosteum and ivory bone.',
    legend: [
      ['Epidermis', 'Stratified squamous keratinised; no blood vessels'],
      ['Dermis', 'Connective tissue with vessels, nerves, glands, hair roots'],
      ['Superficial fascia', 'Fat + loose areolar tissue (site of SC injections)'],
      ['Superficial vein & cutaneous nerve', 'Vessels and nerves travel in the superficial fascia'],
      ['Deep fascia', 'Dense, inelastic sheet hugging the muscles'],
      ['Muscle', ''],
      ['Periosteum', 'Fibrous + osteogenic layer on bone'],
      ['Bone', ''],
    ],
  },
  '3.1': {
    svg: fig31,
    alt: 'Vertical young long bone: spongy epiphyses capped with blue articular cartilage at both ends, blue epiphyseal plates, flared metaphyses, a shaft of compact bone around a yellow medullary cavity, dark periosteum lines along the shaft, and a red nutrient artery entering the shaft obliquely.',
    legend: [
      ['Articular cartilage', 'Hyaline; no periosteum over it'],
      ['Epiphysis', 'Ends; ossify from secondary centres'],
      ['Epiphyseal (growth) plate', 'Hyaline cartilage → growth in length'],
      ['Metaphysis', 'Most vascular, most actively growing — osteomyelitis site in children'],
      ['Diaphysis (compact wall)', 'Shaft; ossifies from the primary centre'],
      ['Medullary cavity', 'Yellow marrow in adults; lined by endosteum'],
      ['Periosteum', 'Anchored by Sharpey’s fibres; growth in width; pain-sensitive'],
      ['Nutrient artery', 'Main supply: marrow + inner 2/3 of cortex'],
    ],
  },
  '5.2': {
    svg: fig52,
    alt: 'Two ivory bone ends facing each other, each capped with blue articular cartilage. A grey fibrous capsule wraps the joint, lined on its inner surface by a dashed pink synovial membrane that stops at the cartilage margins. Light-blue synovial fluid fills the cavity. A ligament runs outside the capsule on the left.',
    legend: [
      ['Articular cartilage', 'Hyaline (fibrocartilage in TMJ, SC & AC joints)'],
      ['Synovial membrane', 'Lines the capsule — never covers articular cartilage'],
      ['Joint cavity + synovial fluid', 'Lubricates and nourishes cartilage'],
      ['Fibrous capsule', 'Attached around the articular margins'],
      ['Ligament', 'Strengthens the capsule'],
      ['Bone ends', ''],
    ],
  },
  '6.2': {
    svg: fig62,
    alt: 'Three levers drawn as beams. First order: fulcrum in the middle, effort at one end, load at the other. Second order: fulcrum at one end, load in the middle, effort at the far end. Third order: fulcrum at one end, effort in the middle, load at the far end.',
    legend: [
      ['1st order — see-saw', 'Nodding at the atlanto-occipital joint'],
      ['2nd order — wheelbarrow', 'Standing on tiptoe'],
      ['3rd order — tweezers', 'Biceps flexing the elbow (speed & range, less power)'],
    ],
  },
  '7.1': {
    svg: fig71,
    alt: 'Cross-sections side by side. The artery is round with a small red lumen and a very thick muscular tunica media. The vein is flattened with a large blue lumen, a thin media and a thick outer adventitia. Small red dots in the adventitia represent vasa vasorum.',
    legend: [
      ['Tunica intima', 'Endothelium (+ internal elastic lamina in arteries)'],
      ['Tunica media', 'Smooth muscle ± elastic — thickest in arteries'],
      ['Tunica adventitia', 'Connective tissue + vasa vasorum — thickest in veins'],
      ['Lumen', 'Small & round in artery; large & collapsed in vein'],
    ],
  },
  '7.3': {
    svg: fig73,
    alt: 'Left panel: two arteries A and B join in a loop that feeds a tissue blob; A is blocked with a cross but blood keeps flowing from B, so the tissue stays alive. Right panel: a single end artery is blocked at its stem; its branches carry no blood and the wedge of tissue it supplies turns grey — an infarct.',
    legend: [
      ['Blocked vessel ✖', ''],
      ['Collateral flow via the anastomosis', 'B keeps feeding the tissue'],
      ['Tissue survives', ''],
      ['End-artery branches', 'No backup channels'],
      ['Infarct', 'Wedge of dead tissue'],
    ],
  },
  '8.3': {
    svg: fig83,
    alt: 'Bean-shaped lymph node. Several green afferent vessels enter its convex surface. A thick capsule surrounds a cortex with round follicles, a paler paracortex, and a central medulla whose cords converge on the hilum, where one efferent lymph vessel leaves alongside an artery and a vein.',
    legend: [
      ['Afferent vessels (many)', 'Enter all over the convex surface'],
      ['Capsule', ''],
      ['Cortex — follicles', 'B cells'],
      ['Paracortex', 'T cells'],
      ['Medulla', 'Medullary cords and sinuses'],
      ['Hilum', 'Efferent vessel out; artery in, vein out'],
    ],
  },
  '9.2': {
    svg: fig92,
    alt: 'Cross-section of the spinal cord with a grey butterfly of grey matter. A yellow dorsal root with a bulging dorsal root ganglion and a yellow ventral root join to form a short thick spinal nerve, which forks into a dorsal ramus and a larger ventral ramus. White and grey rami communicantes link the ventral ramus to a sympathetic ganglion. Blue dots flow in along the dorsal root; red dots flow out along the ventral root.',
    legend: [
      ['Spinal cord', 'Grey matter H inside white matter'],
      ['Dorsal root', 'Purely sensory — impulses IN'],
      ['Dorsal root ganglion', 'Pseudo-unipolar sensory cell bodies'],
      ['Ventral root', 'Purely motor — impulses OUT'],
      ['Spinal nerve (mixed)', 'Formed in the intervertebral foramen'],
      ['Dorsal ramus (mixed)', 'Back muscles & skin'],
      ['Ventral ramus (mixed)', 'Front & sides of trunk, limbs, plexuses'],
      ['Rami communicantes + sympathetic ganglion', 'White T1–L2 only; grey to all 31'],
    ],
  },
  '10.1': {
    svg: fig101,
    alt: 'Fist-in-a-balloon diagram: an organ pushes into a closed sac from below. The inner visceral layer is stuck to the organ, the outer parietal layer lines the body wall, and a thin space of serous fluid lies between them. The two layers become continuous at the root of the organ.',
    legend: [
      ['Parietal layer', 'Lines the cavity wall — pain-sensitive'],
      ['Visceral layer', 'Sticks to the organ — pain-insensitive'],
      ['Serous cavity', 'Potential space with a film of fluid'],
      ['Organ (the "fist")', ''],
      ['Root / hilum', 'Where the two layers become continuous'],
    ],
  },
  '11.1': {
    svg: fig111,
    alt: 'Five blocks shading from black to white: air, fat, soft tissue and fluid, bone, and metal or contrast. Black is radiolucent; white is radiopaque.',
    legend: [
      ['Air', 'Lungs, bowel gas — blackest'],
      ['Fat', 'Darker grey'],
      ['Soft tissue / fluid', 'Muscle, heart, organs — mid grey'],
      ['Bone', 'Calcium — white'],
      ['Metal / contrast', 'Implants, barium — brightest white'],
    ],
  },
};
