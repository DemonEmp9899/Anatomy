/* BareBones — site behaviour. No dependencies. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var root = document.documentElement;
  var base = document.body.dataset.base || '';

  // localStorage can throw (private mode, blocked storage) — always guard.
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
  };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ---------- Theme (X-ray mode) ---------- */
  var themeBtn = $('#themeToggle');
  var mql = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
  function isDark() { var t = root.dataset.theme; return t ? t === 'dark' : !!(mql && mql.matches); }
  function paintTheme() {
    if (!themeBtn) return;
    themeBtn.dataset.dark = isDark();
    themeBtn.setAttribute('aria-label', isDark() ? 'Switch to light mode' : 'Switch to X-ray (dark) mode');
    themeBtn.title = isDark() ? 'Light mode' : 'X-ray mode';
  }
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next; store.set('bb:theme', next); paintTheme();
  });
  if (mql && mql.addEventListener) mql.addEventListener('change', paintTheme);
  paintTheme();

  /* ---------- Exam mode ---------- */
  var examBtn = $('#examToggle');
  function paintExam() { if (examBtn) examBtn.setAttribute('aria-pressed', root.classList.contains('exam-mode')); }
  function setExam(on) { root.classList.toggle('exam-mode', on); store.set('bb:exam', on); paintExam(); }
  if (examBtn) examBtn.addEventListener('click', function () { setExam(!root.classList.contains('exam-mode')); });
  $$('[data-exam-off]').forEach(function (b) { b.addEventListener('click', function () { setExam(false); }); });
  paintExam();

  /* ---------- Dialogs ---------- */
  function openDlg(id) { var d = document.getElementById(id); if (d && !d.open) d.showModal(); return d; }
  $$('[data-open]').forEach(function (b) {
    b.addEventListener('click', function () { if (b.dataset.open === 'search') openSearch(''); else openDlg(b.dataset.open); });
  });
  $$('dialog').forEach(function (d) {
    d.addEventListener('click', function (e) { if (e.target === d || e.target.closest('[data-close]')) d.close(); });
    d.addEventListener('click', function (e) { var a = e.target.closest('a[href]'); if (a) d.close(); });
  });

  // Mark current page in the drawer
  var here = location.pathname.split('/').slice(-2).join('/');
  $$('.drawer-list a').forEach(function (a) {
    var p = a.getAttribute('href').replace(/^(\.\.\/)+/, '');
    if (here.endsWith(p)) a.setAttribute('aria-current', 'page');
  });

  /* ---------- Progress ---------- */
  var chapters = window.BB_CHAPTERS || [];
  function paintProgress() {
    var done = store.get('bb:done', {});
    var core = chapters.filter(function (c) { return c.core; });
    var n = core.filter(function (c) { return done[c.n]; }).length;
    $$('[data-prog]').forEach(function (e) { e.textContent = n + '/' + core.length; });
    $$('[data-prog-fill]').forEach(function (e) { e.style.width = (core.length ? (100 * n / core.length) : 0) + '%'; });
    $$('[data-done-n]').forEach(function (el) { el.classList.toggle('is-done', !!(el.dataset.doneN && done[el.dataset.doneN])); });
    var btn = $('#doneBtn');
    if (btn) {
      var on = !!done[btn.dataset.n];
      btn.setAttribute('aria-pressed', on);
      $('.done-l', btn).textContent = on ? 'Chapter done — nice work!' : 'Mark chapter as done';
    }
  }
  var doneBtn = $('#doneBtn');
  if (doneBtn) doneBtn.addEventListener('click', function () {
    var done = store.get('bb:done', {});
    if (done[doneBtn.dataset.n]) delete done[doneBtn.dataset.n]; else done[doneBtn.dataset.n] = Date.now();
    store.set('bb:done', done); paintProgress();
  });
  paintProgress();

  // Checklists (quick recap + top-30 list)
  var checks = store.get('bb:checks', {});
  $$('input[type=checkbox][data-key]').forEach(function (cb) {
    cb.checked = !!checks[cb.dataset.key];
    cb.addEventListener('change', function () {
      var c = store.get('bb:checks', {});
      if (cb.checked) c[cb.dataset.key] = 1; else delete c[cb.dataset.key];
      store.set('bb:checks', c);
    });
  });

  /* ---------- Search ---------- */
  var sDlg = $('#search'), sIn = $('#searchInput'), sRes = $('#searchResults');
  var INDEX = window.BB_INDEX || [];
  var KIND_W = { chapter: 0, section: 0.1, figure: 0.2, mnemonic: 0.25, viva: 0.3, fact: 0.4 };
  var active = 0;
  function highlight(text, words) {
    var out = esc(text);
    words.forEach(function (w) {
      if (w.length < 2) return;
      var re = new RegExp('(' + esc(w).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      out = out.replace(re, '<mark>$1</mark>');
    });
    return out;
  }
  function renderSearch(q) {
    var words = q.toLowerCase().split(/\s+/).filter(Boolean);
    active = 0;
    if (!words.length) { sRes.innerHTML = '<li class="empty">Try “Hilton”, “metaphysis”, “T10”, “sesamoid”…</li>'; return; }
    var hits = [];
    INDEX.forEach(function (e) {
      var t = e.t.toLowerCase(), hay = t + ' ' + e.p.toLowerCase();
      if (!words.every(function (w) { return hay.indexOf(w) > -1; })) return;
      var s = t.indexOf(words[0]) === 0 ? 0 : t.indexOf(q.toLowerCase()) > -1 ? 1 : words.every(function (w) { return t.indexOf(w) > -1; }) ? 2 : 3;
      hits.push([s + (KIND_W[e.k] || 0), e]);
    });
    hits.sort(function (a, b) { return a[0] - b[0]; });
    sRes.innerHTML = hits.slice(0, 40).map(function (h, i) {
      var e = h[1];
      return '<li' + (i === 0 ? ' class="active"' : '') + '><a href="' + base + e.u + '"><span class="sr-k">' + e.k + '</span><span class="sr-t">' + highlight(e.t, words) + '</span><span class="sr-p">' + esc(e.p) + '</span></a></li>';
    }).join('') || '<li class="empty">No matches. Try a shorter word.</li>';
  }
  function openSearch(q) {
    if (!sDlg) return;
    openDlg('search'); sIn.value = q || ''; renderSearch(sIn.value); sIn.focus(); sIn.select();
  }
  if (sIn) {
    sIn.addEventListener('input', function () { renderSearch(sIn.value); });
    sIn.addEventListener('keydown', function (e) {
      var items = $$('li a', sRes);
      if (!items.length) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        active = (active + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
        $$('li', sRes).forEach(function (li, i) { li.classList.toggle('active', i === active); });
        items[active].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') {
        e.preventDefault(); sDlg.close(); location.href = items[active].href;
      }
    });
  }
  document.addEventListener('keydown', function (e) {
    var typing = /input|textarea|select/i.test((e.target && e.target.tagName) || '');
    if ((e.key === '/' && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) { e.preventDefault(); openSearch(''); }
  });
  $$('.chip[data-q]').forEach(function (c) { c.addEventListener('click', function () { openSearch(c.dataset.q); }); });

  /* ---------- Figures ---------- */
  $$('[data-fig]').forEach(function (fig) {
    var pinned = null;
    function set(n) {
      fig.classList.toggle('has-hl', !!n);
      $$('[data-part]', fig).forEach(function (el) { el.classList.toggle('hl', !!n && el.dataset.part === n); });
    }
    function partOf(t) { return t && t.closest ? t.closest('[data-part]') : null; }
    fig.addEventListener('pointerover', function (e) { var p = partOf(e.target); if (p && !pinned) set(p.dataset.part); });
    fig.addEventListener('pointerout', function (e) { var to = partOf(e.relatedTarget); if (!to || !fig.contains(to)) set(pinned); });
    fig.addEventListener('click', function (e) {
      var p = partOf(e.target); if (!p) return;
      pinned = pinned === p.dataset.part ? null : p.dataset.part; set(pinned);
    });
    $$('.fig-legend li', fig).forEach(function (li) {
      li.addEventListener('focus', function () { set(li.dataset.part); });
      li.addEventListener('blur', function () { set(pinned); });
      li.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); li.click(); } });
    });
    $$('[data-act]', fig).forEach(function (b) {
      b.addEventListener('click', function () {
        var act = b.dataset.act;
        if (act === 'labels') {
          var off = fig.classList.toggle('labels-off');
          b.setAttribute('aria-pressed', off); $('span', b).textContent = off ? 'Show labels' : 'Hide labels';
        } else if (act === 'sketch') {
          var svgStage = $('.fig-svg', fig), asc = $('.fig-ascii', fig);
          var showSketch = asc.hidden;
          asc.hidden = !showSketch; svgStage.hidden = showSketch;
          b.setAttribute('aria-pressed', showSketch); $('span', b).textContent = showSketch ? 'Diagram' : 'Sketch';
        } else if (act === 'zoom') {
          var stage = $('.fig-stage:not([hidden])', fig).cloneNode(true);
          var body = $('#zoomBody'); body.innerHTML = ''; body.appendChild(stage);
          $('#zoomTitle').textContent = $('.fig-tab', fig).textContent + ' — ' + $('.fig-title', fig).textContent;
          openDlg('zoom');
        }
      });
    });
  });
  // Respect reduced motion for SVG flow animations
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) {
    $$('svg').forEach(function (s) { if (s.pauseAnimations) s.pauseAnimations(); });
  }

  /* ---------- Flip cards ---------- */
  $$('.flip').forEach(function (b) {
    b.addEventListener('click', function () { var on = b.classList.toggle('flipped'); b.setAttribute('aria-pressed', on); });
  });
  $$('[data-flipall]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cards = $$('.flip', btn.closest('section'));
      var anyFront = cards.some(function (c) { return !c.classList.contains('flipped'); });
      cards.forEach(function (c) { c.classList.toggle('flipped', anyFront); c.setAttribute('aria-pressed', anyFront); });
      btn.lastChild.textContent = anyFront ? 'Flip back' : 'Flip all';
    });
  });

  /* ---------- MCQ quiz ---------- */
  var mcqs = $$('.mcq');
  function paintScore() {
    var answered = mcqs.filter(function (q) { return q.dataset.done; });
    var right = answered.filter(function (q) { return q.dataset.done === 'ok'; }).length;
    $$('[data-score]').forEach(function (e) { e.textContent = right; });
    $$('[data-answered]').forEach(function (e) { e.textContent = answered.length; });
  }
  mcqs.forEach(function (q) {
    q.addEventListener('click', function (e) {
      var b = e.target.closest('.opt'); if (!b || q.dataset.done) return;
      var ans = q.dataset.answer, ok = b.dataset.k === ans;
      q.dataset.done = ok ? 'ok' : 'no';
      b.classList.add(ok ? 'right' : 'wrong');
      var correct = $('.opt[data-k="' + ans + '"]', q); if (correct) correct.classList.add('right');
      $$('.opt', q).forEach(function (o) { o.disabled = true; });
      var fb = $('.mcq-fb', q);
      fb.className = 'mcq-fb ' + (ok ? 'ok' : 'no');
      fb.textContent = ok ? '✓ Correct!' : '✗ Not quite — the answer is (' + ans + ').';
      paintScore();
    });
  });
  $$('[data-mcq-reset]').forEach(function (b) {
    b.addEventListener('click', function () {
      mcqs.forEach(function (q) {
        delete q.dataset.done;
        $$('.opt', q).forEach(function (o) { o.disabled = false; o.classList.remove('right', 'wrong'); });
        var fb = $('.mcq-fb', q); fb.textContent = ''; fb.className = 'mcq-fb';
      });
      paintScore();
    });
  });
})();
