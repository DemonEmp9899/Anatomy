// BareBones static site builder.
// Reads general-anatomy-site.md (Part B = content) and writes a plain HTML/CSS/JS site to dist/.
// Usage: npm run build
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked } from 'marked';
import { FIGURES } from './src/figures.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC_MD = path.join(ROOT, 'general-anatomy-site.md');
const OUT = path.join(ROOT, 'dist');

/* ------------------------------------------------------------------ */
/* Page metadata                                                       */
/* ------------------------------------------------------------------ */
const META = {
  '00': { file: 'start.html', short: 'How to Study', acc: 'var(--scrub)' },
  '01': { file: 'ch/01-introduction.html', short: 'Introduction & Terminology', acc: 'var(--scrub)', core: true },
  '02': { file: 'ch/02-skin-fascia.html', short: 'Skin & Fascia', acc: 'var(--fat)', core: true },
  '03': { file: 'ch/03-bones.html', short: 'Bones', acc: 'var(--bone-2)', core: true },
  '04': { file: 'ch/04-cartilage.html', short: 'Cartilage', acc: 'var(--cartilage)', core: true },
  '05': { file: 'ch/05-joints.html', short: 'Joints', acc: 'var(--fluid)', core: true },
  '06': { file: 'ch/06-muscles.html', short: 'Muscles', acc: 'var(--muscle)', core: true },
  '07': { file: 'ch/07-cvs.html', short: 'Cardiovascular System', acc: 'var(--artery)', core: true },
  '08': { file: 'ch/08-lymphatic.html', short: 'Lymphatic System', acc: 'var(--lymph)', core: true },
  '09': { file: 'ch/09-nervous.html', short: 'Nervous System', acc: 'var(--nerve)', core: true },
  '10': { file: 'ch/10-membranes.html', short: 'Mucous & Serous Membranes', acc: 'var(--pearl)', core: true },
  '11': { file: 'ch/11-radiology.html', short: 'Radiological Anatomy', acc: 'var(--ink-soft)', core: true },
  '12': { file: 'exam.html', short: 'Exam Zone', acc: 'var(--scrub)' },
  '13': { file: 'mnemonics.html', short: 'Mnemonic Wall', acc: 'var(--nerve)' },
  '14': { file: 'figures.html', short: 'Figure Index', acc: 'var(--cartilage)' },
};
const ORDER = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const stripTags = (s) => String(s).replace(/<[^>]+>/g, '');
const slug = (s) =>
  String(s).toLowerCase().normalize('NFKD').replace(/[^\w\s.-]/g, '').replace(/[\s._]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
const plain = (s) => stripTags(marked.parseInline(s)).replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();

const ICON = {
  search: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg>',
  bolt: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M13 3 4 14h7l-1 7 9-11h-7z"/></svg>',
  moon: '<svg class="ic i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>',
  sun: '<svg class="ic i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  menu: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  zoom: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
  eye: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  pencil: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/></svg>',
  arrowR: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  arrowL: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  check: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
  close: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  flip: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5"/></svg>',
};

const ECG = `<div class="ecg" aria-hidden="true"><svg viewBox="0 0 760 44" preserveAspectRatio="none"><path d="M0,24 H300 l10,-2 l8,2 l10,0 l8,-20 l12,38 l10,-30 l8,12 l6,0 l10,-4 l10,4 H760"/></svg></div>`;

/* ------------------------------------------------------------------ */
/* Markdown                                                            */
/* ------------------------------------------------------------------ */
let current = null; // { file, pageTitle } for the page being rendered
const searchIndex = [];
const figureTitles = {};
const figureHome = {}; // fig id -> page file

const marked = new Marked({
  gfm: true,
  renderer: {
    code({ text }) {
      const f = text.match(/^FIG (\d+\.\d+) — (.+)\n/);
      if (f) return figureHTML(f[1], f[2].trim(), text.slice(f[0].length));
      return `<pre class="code"><code>${esc(text)}</code></pre>`;
    },
  },
});

function figureHTML(id, asciiTitle, ascii) {
  const fig = FIGURES[id];
  const title = figureTitles[id] || asciiTitle;
  const anchor = 'fig-' + id.replace('.', '-');
  ascii = ascii.replace(/^\s*\n/, '').replace(/\s+$/, '');
  if (current) {
    figureHome[id] = current.file;
    searchIndex.push({ t: `FIG ${id} — ${title}`, p: current.pageTitle, u: `${current.file}#${anchor}`, k: 'figure' });
  }
  const head = `<div class="fig-head"><span class="fig-tab">FIG ${id}</span><span class="fig-title">${esc(title)}</span></div>`;
  const asciiStage = (hidden) =>
    `<div class="fig-stage fig-ascii"${hidden ? ' hidden' : ''}><pre aria-label="Text sketch: ${esc(title)}">${esc(ascii)}</pre></div>`;
  if (!fig) {
    return `<figure class="fig" id="${anchor}" data-fig>${head}
<div class="fig-tools"><span class="fig-note">Notebook sketch</span><button type="button" class="tbtn" data-act="zoom">${ICON.zoom}<span>Zoom</span></button></div>
${asciiStage(false)}</figure>`;
  }
  const vbW = Number(fig.svg.match(/viewBox="0 0 (\d+)/)[1]);
  const svg = fig.svg.replace('<svg ', `<svg aria-label="${esc(fig.alt)}" style="min-width:${Math.round(vbW * 0.82)}px" `);
  const legend = fig.legend
    .map(([n, d], i) => `<li data-part="${i + 1}" tabindex="0"><span class="bdg-h">${i + 1}</span><span><strong>${esc(n)}</strong>${d ? `<span class="lg-d"> — ${esc(d)}</span>` : ''}</span></li>`)
    .join('');
  return `<figure class="fig" id="${anchor}" data-fig>${head}
<div class="fig-tools"><span class="fig-note">Tap a part to highlight</span>
<button type="button" class="tbtn" data-act="labels" aria-pressed="false">${ICON.eye}<span>Hide labels</span></button>
<button type="button" class="tbtn" data-act="sketch" aria-pressed="false">${ICON.pencil}<span>Sketch</span></button>
<button type="button" class="tbtn" data-act="zoom">${ICON.zoom}<span>Zoom</span></button></div>
<div class="fig-stage fig-svg">${svg}</div>
${asciiStage(true)}
<ol class="fig-legend">${legend}</ol>
<figcaption class="sr-only">${esc(fig.alt)}</figcaption></figure>`;
}

const CALLOUT = {
  NOTE: ['hy', '⚡', 'High-yield'],
  TIP: ['mn', '🧠', 'Mnemonic'],
  IMPORTANT: ['cl', '🩺', 'Clinical'],
  WARNING: ['trap', '⚠️', 'Common trap'],
};

function calloutHTML(type, inner) {
  const [cls, emoji, label] = CALLOUT[type];
  inner = inner.replace(/^\s*(⚡|🧠|🩺|⚠️|⚠)️?\s*/u, '');
  let sub = '';
  const lm = inner.match(/^\*\*(High-yield|Trap|Clinical)(?:\s*[—-]\s*([^*]+?))?:\*\*\s*/);
  if (lm) {
    sub = lm[2] || '';
    inner = inner.slice(lm[0].length);
  }
  const extra = cls === 'mn' ? '<span class="tape" aria-hidden="true"></span>' : '';
  const sym = { hy: ICON.bolt, cl: '<span class="cross" aria-hidden="true">✚</span>', mn: '', trap: '' }[cls];
  return `<aside class="callout c-${cls}">${extra}<div class="c-label">${emoji} ${label}${sym && cls === 'cl' ? sym : ''}</div>${sub ? `<p class="c-sub">${marked.parseInline(sub)}</p>` : ''}${marked.parse(inner.trim())}</aside>`;
}

function renderMd(src) {
  const blocks = [];
  const lines = src.split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (!/^>/.test(lines[i])) {
      out.push(lines[i]);
      continue;
    }
    const q = [];
    while (i < lines.length && /^>/.test(lines[i])) q.push(lines[i++].replace(/^> ?/, ''));
    i--;
    const cm = q[0].match(/^\[!(NOTE|TIP|IMPORTANT|WARNING)\]\s*$/);
    if (cm) {
      blocks.push(calloutHTML(cm[1], q.slice(1).join('\n')));
      out.push('', `@@B${blocks.length - 1}@@`, '');
    } else if (/^🎨/u.test(q[0])) {
      // Designer brief — implemented as SVG in src/figures.mjs (or left as the sketch). Not shown to readers.
    } else {
      out.push(...q.map((l) => '> ' + l));
    }
  }
  let html = marked.parse(out.join('\n'));
  html = html.replace(/<p>@@B(\d+)@@<\/p>/g, (_, n) => blocks[n]);
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
  return html;
}

/* ------------------------------------------------------------------ */
/* Parse the source                                                    */
/* ------------------------------------------------------------------ */
const md = fs.readFileSync(SRC_MD, 'utf8').replace(/\r\n/g, '\n');
const partB = md.slice(md.indexOf('# PART B'));
const heads = [...partB.matchAll(/^## (\d\d) · (.+)$/gm)];
const chapters = {};
heads.forEach((h, i) => {
  const end = i + 1 < heads.length ? heads[i + 1].index : partB.length;
  let body = partB.slice(h.index + h[0].length, end);
  body = body.replace(/^---\s*$/gm, '').replace(/^\*Made for first-year.*$/m, '');
  const tags = [...h[2].matchAll(/`([A-Z]+)`/g)].map((x) => x[1]);
  const title = h[2].replace(/`[^`]+`/g, '').trim();
  let bigIdea = '';
  body = body.replace(/^\*\*Big idea:\*\*\s*(.+)$/m, (_, b) => ((bigIdea = b), ''));
  chapters[h[1]] = { num: h[1], title, tags, bigIdea, body, words: body.split(/\s+/).length };
});

// Figure titles from the Figure List table (chapter 14)
for (const m of chapters['14'].body.matchAll(/^\| FIG (\d+\.\d+) \| (.+?) \| (\d\d) \|$/gm)) figureTitles[m[1]] = m[2];

function splitSections(body) {
  const parts = body.split(/^### (.+)$/m);
  const sections = [];
  for (let i = 1; i < parts.length; i += 2) sections.push({ title: parts[i].trim(), body: parts[i + 1] || '' });
  return { intro: parts[0], sections };
}

const readTime = (words) => Math.max(1, Math.round(words / 200));
const TAG_CLASS = { LAQ: 'laq', SAQ: 'saq', MCQ: 'mcq', VIVA: 'viva' };
const tagPills = (tags) => tags.map((t) => `<span class="xtag xtag-${TAG_CLASS[t] || 'x'}">${t}</span>`).join('');

/* ------------------------------------------------------------------ */
/* Components                                                          */
/* ------------------------------------------------------------------ */
function card({ id, tag, title, draw, html, cls = '' }) {
  return `<section class="card chunk ${cls}" id="${id}">
<div class="spec-tag"><span class="hole" aria-hidden="true"></span>${esc(tag)}</div>
${title ? `<h3 class="card-title">${marked.parseInline(title)}${draw ? `<span class="pill-draw">${ICON.pencil}Must draw</span>` : ''}</h3>` : ''}
<div class="card-body">${html}</div></section>`;
}

function flipCards(items, prefix = 'Q') {
  return `<div class="viva-grid">${items
    .map(
      ([q, a], i) => `<button type="button" class="flip" aria-pressed="false"><span class="flip-in">
<span class="face front"><span class="mono-tag">${prefix}${i + 1}</span><span class="fq">${marked.parseInline(q)}</span><span class="hint">${ICON.flip}Tap to flip</span></span>
<span class="face back"><span class="mono-tag">Answer</span><span class="fa">${marked.parseInline(a)}</span></span></span></button>`
    )
    .join('')}</div>`;
}

function vivaSection(items, title = 'Viva — say it out loud') {
  return `<section class="viva-sec" id="viva"><div class="sec-head"><h2>🎤 ${title}</h2>
<button type="button" class="btn btn-sm" data-flipall>${ICON.flip}Flip all</button></div>
<p class="sec-sub">Answer aloud first, then tap the card. Speaking it is how you'll be tested.</p>
${flipCards(items)}</section>`;
}

function parseViva(body) {
  const items = [];
  for (const m of body.matchAll(/^\d+\.\s+\*\*(.+?)\*\*\s*→\s*(.+)$/gm)) items.push([m[1], m[2].trim()]);
  return items;
}

function hero({ num, title, bigIdea, tags = [], mins, acc, kicker }) {
  return `<header class="hero">
<div class="hero-num" aria-hidden="true">${num}</div>
<div class="hero-text"><p class="kicker">${esc(kicker || 'Chapter ' + num)}</p>
<h1>${esc(title)}</h1>
<div class="meta-row">${mins ? `<span class="pill-time">⏱ ${mins} min read</span>` : ''}${tagPills(tags)}</div></div>
${bigIdea ? `<div class="bigidea"><span class="mono-tag">Big idea</span><p>${marked.parseInline(bigIdea)}</p></div>` : ''}
</header>`;
}

/* ------------------------------------------------------------------ */
/* Page shell                                                          */
/* ------------------------------------------------------------------ */
function navLinks(base) {
  return ORDER.map((n) => {
    const m = META[n];
    return `<li><a href="${base}${m.file}" data-done-n="${m.core ? n : ''}"><span class="dn">${n}</span><span class="dt">${esc(m.short)}</span>${m.core ? `<span class="dchk">${ICON.check}</span>` : ''}</a></li>`;
  }).join('');
}

function shell({ title, desc, file, body, acc = 'var(--scrub)', bodyClass = '' }) {
  const depth = file.split('/').length - 1;
  const base = '../'.repeat(depth);
  const fullTitle = file === 'index.html' ? 'BareBones — General Anatomy' : `${title} · BareBones`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦴</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${base}assets/styles.css">
<script>(function(){try{var t=JSON.parse(localStorage.getItem('bb:theme'));if(t)document.documentElement.dataset.theme=t;if(JSON.parse(localStorage.getItem('bb:exam')))document.documentElement.classList.add('exam-mode')}catch(e){}})();</script>
</head>
<body class="${bodyClass}" data-base="${base}" style="--acc:${acc}">
<a class="skip" href="#main">Skip to content</a>
<header class="topbar"><div class="topbar-in">
<a class="brand" href="${base}index.html"><span class="brand-mark" aria-hidden="true">🦴</span><span>BareBones</span></a>
<nav class="topnav" aria-label="Main"><a href="${base}start.html">How to study</a><a href="${base}exam.html">Exam Zone</a><a href="${base}mnemonics.html">Mnemonics</a></nav>
<div class="tools">
<button type="button" class="tool" data-open="search" aria-label="Search (press /)">${ICON.search}<span class="kbd">/</span></button>
<button type="button" class="tool" id="examToggle" aria-pressed="false" title="Exam Mode: only high-yield + tables">${ICON.bolt}<span class="tl">Exam mode</span></button>
<button type="button" class="tool" id="themeToggle" aria-label="Toggle X-ray (dark) mode">${ICON.moon}${ICON.sun}</button>
<button type="button" class="tool tool-ch" data-open="drawer" aria-label="All chapters">${ICON.menu}<span class="tl">Chapters</span><span class="prog" data-prog>0/11</span></button>
</div></div></header>
<div class="exam-banner" role="status">${ICON.bolt}<span><b>Exam Mode</b> — showing only ⚡ high-yield strips and tables.</span><button type="button" class="btn btn-sm" data-exam-off>Show everything</button></div>
<main id="main" class="page">
${body}
</main>
<footer class="foot"><div class="foot-in">
<p><b>🦴 BareBones</b> — made for first-year MBBS students. Learn the rule, the example, and the exception — and draw everything.</p>
<p class="foot-s">Cross-check facts with your college textbook (e.g. BD Chaurasia's <i>Handbook of General Anatomy</i>, Vishram Singh) and your department's syllabus. Progress is saved only in this browser.</p>
<p class="foot-s"><a href="${base}figures.html">Figure index</a> · <a href="${base}mnemonics.html">Mnemonic wall</a> · <a href="${base}exam.html">Exam Zone</a></p>
</div></footer>

<dialog id="search" class="dlg dlg-search" aria-label="Search">
<div class="dlg-in"><div class="search-row">${ICON.search}<input id="searchInput" type="search" placeholder="Search topics, figures, viva…" autocomplete="off" aria-label="Search"><button type="button" class="tool" data-close aria-label="Close">${ICON.close}</button></div>
<ul id="searchResults" class="results"></ul></div></dialog>

<dialog id="drawer" class="dlg dlg-drawer" aria-label="Chapters">
<div class="dlg-in"><div class="drawer-head"><b>Chapters</b><span class="prog" data-prog>0/11</span><button type="button" class="tool" data-close aria-label="Close">${ICON.close}</button></div>
<ol class="drawer-list">${navLinks(base)}</ol></div></dialog>

<dialog id="zoom" class="dlg dlg-zoom" aria-label="Zoomed figure">
<div class="dlg-in"><div class="drawer-head"><b id="zoomTitle"></b><button type="button" class="tool" data-close aria-label="Close">${ICON.close}</button></div>
<div id="zoomBody"></div></div></dialog>

<script src="${base}assets/search-index.js"></script>
<script src="${base}assets/app.js"></script>
</body>
</html>
`;
}

function chapterNav(num) {
  const i = ORDER.indexOf(num);
  const prev = ORDER[i - 1], next = ORDER[i + 1];
  const base = '../'.repeat(META[num].file.split('/').length - 1);
  const link = (n, dir) =>
    n
      ? `<a class="btn nav-${dir}${dir === 'next' ? ' btn-primary' : ''}" href="${base}${META[n].file}">${dir === 'prev' ? ICON.arrowL : ''}<span><small>${dir === 'prev' ? 'Previous' : 'Next up'}</small>${n} · ${esc(META[n].short)}</span>${dir === 'next' ? ICON.arrowR : ''}</a>`
      : '<span></span>';
  return `<nav class="chapter-nav" aria-label="Chapter navigation">${link(prev, 'prev')}${link(next, 'next')}</nav>`;
}

/* ------------------------------------------------------------------ */
/* Pages                                                               */
/* ------------------------------------------------------------------ */
const pages = {};

function buildChapter(num) {
  const ch = chapters[num];
  const meta = META[num];
  current = { file: meta.file, pageTitle: `${num} · ${meta.short}` };
  searchIndex.push({ t: ch.title, p: `Chapter ${num}`, u: meta.file, k: 'chapter' });
  const { intro, sections } = splitSections(ch.body);
  const cards = [];
  const recap = [];
  let viva = [];
  if (intro.trim()) cards.push(card({ id: 'overview', tag: `${num} · ${num === '00' ? 'Game plan' : 'Overview'}`, html: renderMd(intro) }));
  for (const s of sections) {
    if (/^🎤/u.test(s.title)) {
      viva = parseViva(s.body);
      viva.forEach(([q]) => searchIndex.push({ t: plain(q), p: current.pageTitle, u: `${meta.file}#viva`, k: 'viva' }));
      continue;
    }
    const mm = s.title.match(/^(\d+\.\d+)\s+(.+)$/);
    const no = mm ? mm[1] : '';
    let t = mm ? mm[2] : s.title;
    const drawRe = /\s*—\s*(MUST DRAW|draw this every time!)/i;
    const draw = drawRe.test(t);
    t = t.replace(drawRe, '');
    const id = slug(`s${no}-${plain(t)}`);
    searchIndex.push({ t: plain(t), p: current.pageTitle, u: `${meta.file}#${id}`, k: 'section' });
    cards.push(card({ id, tag: `${num} · ${no}`, title: t, draw, html: renderMd(s.body) }));
    recap.push({ no, t: plain(t), id });
  }

  const toc = recap.length
    ? `<nav class="toc" aria-label="On this page"><span class="mono-tag">On this page</span>${recap.map((r) => `<a href="#${r.id}">${r.no} ${esc(r.t)}</a>`).join('')}${viva.length ? '<a href="#viva">🎤 Viva</a>' : ''}</nav>`
    : '';
  const recapHTML = recap.length
    ? `<section class="recap-sec chunk" id="recap"><div class="spec-tag"><span class="hole" aria-hidden="true"></span>${num} · Quick recap</div>
<h3 class="card-title">Can you explain each of these without looking?</h3>
<ul class="recap">${recap.map((r) => `<li><label><input type="checkbox" data-key="${num}:${r.id}"><span class="cbox" aria-hidden="true">${ICON.check}</span><span><b>${r.no}</b> ${esc(r.t)}</span></label></li>`).join('')}</ul></section>`
    : '';
  const done = meta.core
    ? `<div class="done-row"><button type="button" class="btn done-btn" id="doneBtn" data-n="${num}" aria-pressed="false"><span class="cbox" aria-hidden="true">${ICON.check}</span><span class="done-l">Mark chapter as done</span></button></div>`
    : '';

  const body = `${hero({ num, title: ch.title, bigIdea: ch.bigIdea, tags: ch.tags, mins: readTime(ch.words), kicker: num === '00' ? 'Start here' : `Chapter ${num} of 11` })}
${ECG}${toc}
${cards.join('\n')}
${viva.length ? ECG + vivaSection(viva) : ''}
${recapHTML}
${done}
${chapterNav(num)}`;
  pages[meta.file] = shell({ title: `${num} · ${ch.title}`, desc: ch.bigIdea ? plain(ch.bigIdea) : ch.title, file: meta.file, body, acc: meta.acc });
}

function buildExam() {
  const num = '12';
  const ch = chapters[num];
  const meta = META[num];
  current = { file: meta.file, pageTitle: 'Exam Zone' };
  searchIndex.push({ t: 'Exam Zone — high-yield, LAQ, SAQ, MCQ, viva', p: 'Exam', u: meta.file, k: 'chapter' });
  const { sections } = splitSections(ch.body);
  const get = (n) => sections.find((s) => s.title.startsWith(n));
  const out = [];

  // 12.1 high-yield
  const hy = get('12.1');
  const facts = [...hy.body.matchAll(/^\d+\.\s+(.+)$/gm)].map((m) => m[1]);
  facts.forEach((f) => searchIndex.push({ t: plain(f), p: 'Top 30 high-yield', u: `${meta.file}#top30`, k: 'fact' }));
  out.push(
    card({
      id: 'top30',
      tag: '12 · 1',
      title: '⚡ Top 30 high-yield facts',
      html: `<p class="sec-sub">The night-before-exam list. Tick the ones you could say in your sleep.</p><ol class="hy-list">${facts
        .map((f, i) => `<li><label><input type="checkbox" data-key="12:hy${i + 1}"><span class="cbox" aria-hidden="true">${ICON.check}</span><span class="hy-n">${String(i + 1).padStart(2, '0')}</span><span>${marked.parseInline(f)}</span></label></li>`)
        .join('')}</ol>`,
      cls: 'keep',
    })
  );

  // 12.2 LAQ
  const laq = [...get('12.2').body.matchAll(/^\d+\.\s+(.+)$/gm)].map((m) => m[1]);
  out.push(
    card({
      id: 'laq',
      tag: '12 · 2',
      title: 'Long answer questions <span class="xtag xtag-laq">LAQ</span>',
      html: `<p class="sec-sub">Practise each with a labelled diagram — it earns marks in every answer.</p><ol class="q-list">${laq.map((q) => `<li>${marked.parseInline(q)}</li>`).join('')}</ol>`,
      cls: 'keep',
    })
  );

  // 12.3 SAQ chips
  const saq = get('12.3').body.trim().split(/\s*·\s*/).map((s) => s.replace(/\.$/, '').trim()).filter(Boolean);
  out.push(
    card({
      id: 'saq',
      tag: '12 · 3',
      title: 'Short answer questions <span class="xtag xtag-saq">SAQ</span>',
      html: `<p class="sec-sub">Write a short note on each. Tap a topic to find it in the notes.</p><div class="chips">${saq.map((s) => `<button type="button" class="chip" data-q="${esc(s.replace(/\bvs\b/i, '').replace(/&/g, ' '))}">${esc(s)}</button>`).join('')}</div>`,
      cls: 'keep',
    })
  );

  // 12.4 MCQ
  const mb = get('12.4').body;
  const answers = Object.fromEntries([...mb.matchAll(/(\d+)-([a-d])/g)].map((m) => [m[1], m[2]]));
  const mcqs = [...mb.matchAll(/^(\d+)\.\s+(.+)$/gm)].map((m) => {
    const parts = m[2].split(/\s*\(([a-d])\)\s*/);
    const stem = parts[0];
    const opts = [];
    for (let i = 1; i < parts.length; i += 2) opts.push([parts[i], parts[i + 1]]);
    return { n: m[1], stem, opts, ans: answers[m[1]] };
  });
  out.push(
    card({
      id: 'mcq',
      tag: '12 · 4',
      title: 'MCQ quiz <span class="xtag xtag-mcq">MCQ</span>',
      html: `<div class="score-bar"><span>Score: <b data-score>0</b> / <span data-total>${mcqs.length}</span> · answered <b data-answered>0</b></span><button type="button" class="btn btn-sm" data-mcq-reset>Reset quiz</button></div>
${mcqs
  .map(
    (q) => `<div class="mcq" data-answer="${q.ans}"><p class="mcq-q"><span class="mono-tag">Q${q.n}</span> ${marked.parseInline(q.stem)}</p>
<div class="mcq-opts">${q.opts.map(([k, t]) => `<button type="button" class="opt" data-k="${k}"><b>${k}</b><span>${marked.parseInline(t)}</span></button>`).join('')}</div>
<p class="mcq-fb" aria-live="polite"></p></div>`
  )
  .join('')}`,
      cls: 'keep',
    })
  );

  // 12.5 rapid fire
  const rows = [...get('12.5').body.matchAll(/^\| (.+?) \| (.+?) \|$/gm)].map((m) => [m[1], m[2]]).filter(([q]) => q !== 'Question' && !/^-+$/.test(q));
  rows.forEach(([q]) => searchIndex.push({ t: plain(q), p: 'Rapid-fire viva', u: `${meta.file}#viva`, k: 'viva' }));

  const body = `${hero({ num, title: 'Exam Zone', kicker: 'Revise · Test · Repeat', bigIdea: 'Everything examiners love, in one place: the night-before list, long & short answer banks, a self-marking MCQ quiz and rapid-fire viva cards.' })}
${ECG}
<nav class="toc" aria-label="On this page"><span class="mono-tag">Jump to</span><a href="#top30">⚡ Top 30</a><a href="#laq">LAQ</a><a href="#saq">SAQ</a><a href="#mcq">MCQ quiz</a><a href="#viva">🎤 Rapid-fire viva</a></nav>
${out.join('\n')}
${ECG}${vivaSection(rows, 'Rapid-fire viva')}
${chapterNav(num)}`;
  pages[meta.file] = shell({ title: 'Exam Zone', desc: 'High-yield facts, LAQ/SAQ bank, MCQ quiz and viva flip cards for General Anatomy.', file: meta.file, body, acc: meta.acc, bodyClass: 'nofilter' });
}

function buildMnemonics() {
  const num = '13';
  const meta = META[num];
  current = { file: meta.file, pageTitle: 'Mnemonic Wall' };
  const where = [
    [/supination/i, '01'], [/nutrient/i, '03'], [/pneumatic/i, '03'], [/ossification/i, '03'], [/cartilage/i, '04'],
    [/spinal nerves/i, '09'], [/parasympathetic/i, '09'], [/dermatome/i, '09'], [/mri/i, '11'], [/muscle/i, '06'],
  ];
  const rows = [...chapters[num].body.matchAll(/^\| (.+?) \| (.+?) \|$/gm)].map((m) => [m[1], m[2]]).filter(([t]) => t !== 'Topic' && !/^-+$/.test(t));
  const rot = [-1.5, 1.2, -0.6, 1.6, -1.1, 0.7];
  const stickies = rows
    .map(([topic, mn], i) => {
      const ch = (where.find(([re]) => re.test(topic)) || [])[1];
      searchIndex.push({ t: `${topic}: ${plain(mn)}`, p: 'Mnemonic Wall', u: `${meta.file}#mn-${slug(topic)}`, k: 'mnemonic' });
      return `<div class="sticky" id="mn-${slug(topic)}" style="--rot:${rot[i % rot.length]}deg"><span class="tape" aria-hidden="true"></span>
<span class="mono-tag">${esc(topic)}</span><p>${marked.parseInline(mn)}</p>${ch ? `<a class="sticky-link" href="${META[ch].file}">Ch ${ch} · ${esc(META[ch].short)} →</a>` : ''}</div>`;
    })
    .join('');
  const body = `${hero({ num, title: 'Mnemonic Wall', kicker: 'All the memory hooks', bigIdea: 'Every mnemonic from the course on one wall. Read them, say them, then cover them and test yourself.' })}
${ECG}<div class="sticky-wall">${stickies}</div>
${chapterNav(num)}`;
  pages[meta.file] = shell({ title: 'Mnemonic Wall', desc: 'All General Anatomy mnemonics on one sticky-note wall.', file: meta.file, body, acc: meta.acc, bodyClass: 'nofilter' });
}

function buildFigures() {
  const meta = META['14'];
  current = null;
  const rows = [...chapters['14'].body.matchAll(/^\| FIG (\d+\.\d+) \| (.+?) \| (\d\d) \|$/gm)];
  const tiles = rows
    .map(([, id, t, ch]) => {
      const live = !!FIGURES[id];
      return `<a class="fig-tile chunk" href="${META[ch].file}#fig-${id.replace('.', '-')}"><span class="fig-tab">FIG ${id}</span><b>${esc(t)}</b><span class="ft-meta">Ch ${ch} · ${esc(META[ch].short)}</span><span class="ft-kind ${live ? 'live' : ''}">${live ? 'Interactive diagram' : 'Notebook sketch'}</span></a>`;
    })
    .join('');
  const body = `${hero({ num: 'FIG', title: 'Figure Index', kicker: `${rows.length} drawings`, bigIdea: 'Every drawing in the course. Interactive diagrams let you tap parts, hide labels to self-test, and zoom.' })}
${ECG}<div class="fig-grid">${tiles}</div>`;
  pages[meta.file] = shell({ title: 'Figure Index', desc: 'All General Anatomy figures.', file: meta.file, body, acc: meta.acc, bodyClass: 'nofilter' });
}

function buildHome() {
  current = null;
  const coreTiles = ORDER.filter((n) => META[n].core || n === '12')
    .map((n) => {
      const m = META[n];
      const ch = chapters[n];
      const tags = n === '12' ? ['LAQ', 'SAQ', 'MCQ', 'VIVA'] : ch.tags;
      const blurb = n === '12' ? 'Top 30 facts, question banks, MCQ quiz & viva cards.' : plain(ch.bigIdea).split(/(?<=[.!?])\s/)[0];
      return `<a class="tile chunk" href="${m.file}" style="--acc:${m.acc}" data-done-n="${m.core ? n : ''}">
<span class="tile-band" aria-hidden="true"></span><span class="tile-num" aria-hidden="true">${n}</span>
<span class="tile-done" aria-label="Done">${ICON.check}</span>
<b class="tile-title">${esc(m.short)}</b><span class="tile-blurb">${esc(blurb)}</span>
<span class="tile-tags">${tagPills(tags)}${n !== '12' ? `<span class="pill-time">⏱ ${readTime(ch.words)} min</span>` : ''}</span></a>`;
    })
    .join('');
  const codes = [
    ['artery', 'Artery'], ['vein', 'Vein'], ['nerve', 'Nerve'], ['lymph', 'Lymph'], ['bone', 'Bone'], ['cartilage', 'Cartilage'], ['muscle', 'Muscle'], ['fat', 'Fat'],
  ].map(([k, l]) => `<span class="code-chip"><i style="background:var(--${k})"></i>${l}</span>`).join('');
  const body = `<section class="home-hero">
<div class="home-copy">
<p class="kicker">General Anatomy · 1st-year MBBS</p>
<h1>Anatomy's grammar,<br><span class="hl-mark">made easy.</span></h1>
<p class="lede">Bones, joints, muscles, vessels, nerves — the rules every region follows. Learn <b>one rule → one example → one exception</b>, draw everything, and say it aloud.</p>
<div class="cta-row"><a class="btn btn-primary btn-lg" href="start.html">Start learning ${ICON.arrowR}</a><a class="btn btn-lg" href="exam.html">${ICON.bolt}Night-before list</a></div>
<div class="progress-line"><span class="prog-big"><b data-prog>0/11</b> chapters done</span><span class="prog-track"><span class="prog-fill" data-prog-fill></span></span></div>
</div>
<div class="home-art" aria-hidden="true">${FIGURES['3.1'].svg.replace('<svg ', '<svg class="hero-bone" ')}</div>
</section>
<div class="code-strip chunk"><span class="mono-tag">The colour code is law</span><div class="code-chips">${codes}</div></div>
${ECG}
<section id="chapters"><div class="sec-head"><h2>Chapters</h2><span class="sec-sub">Tick them off as you go — saved in your browser.</span></div>
<div class="tile-grid">${coreTiles}</div></section>
<section class="extra-row">
<a class="mini chunk" href="start.html"><span class="mono-tag">00</span><b>How to study</b><span>5-minute game plan</span></a>
<a class="mini chunk mini-yellow" href="mnemonics.html"><span class="mono-tag">Wall</span><b>Mnemonic wall</b><span>Every memory hook</span></a>
<a class="mini chunk" href="figures.html"><span class="mono-tag">FIG</span><b>Figure index</b><span>All ${Object.keys(figureTitles).length} drawings</span></a>
</section>`;
  pages['index.html'] = shell({ title: 'Home', desc: 'BareBones — General Anatomy made easy for 1st-year MBBS: chunky notes, interactive diagrams, mnemonics, MCQs and viva cards.', file: 'index.html', body, bodyClass: 'nofilter home' });
}

/* ------------------------------------------------------------------ */
/* Build                                                               */
/* ------------------------------------------------------------------ */
for (const n of ORDER.filter((n) => n <= '11')) buildChapter(n);
buildExam();
buildMnemonics();
buildFigures();
buildHome();

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'ch'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
for (const [file, html] of Object.entries(pages)) fs.writeFileSync(path.join(OUT, file), html);
fs.copyFileSync(path.join(ROOT, 'src/styles.css'), path.join(OUT, 'assets/styles.css'));
fs.copyFileSync(path.join(ROOT, 'src/app.js'), path.join(OUT, 'assets/app.js'));
const chList = ORDER.map((n) => ({ n, file: META[n].file, title: META[n].short, core: !!META[n].core }));
fs.writeFileSync(
  path.join(OUT, 'assets/search-index.js'),
  `window.BB_CHAPTERS=${JSON.stringify(chList)};\nwindow.BB_INDEX=${JSON.stringify(searchIndex)};\n`
);
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
console.log(`Built ${Object.keys(pages).length} pages, ${searchIndex.length} search entries → dist/`);
