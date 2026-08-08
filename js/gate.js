/* ==========================================================================
   Language gate
   ========================================================================== */

(function () {
  'use strict';

  var gate = document.getElementById('language-gate');
  var veil = document.getElementById('gate-veil');
  var statusText = document.getElementById('gate-status-text');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.language-card'));
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DURATION = 4000;
  var raf = 0;
  var countdownStarted = false;
  var cancelled = false;
  var entering = false;

  var names = {
    en: 'English',
    fr: 'Français',
    yue: '廣東話',
    zh: '普通话',
    ja: '日本語',
    de: 'Deutsch',
    es: 'Español',
    pt: 'Português',
    ru: 'Русский'
  };

  function browserChoice() {
    var languages = navigator.languages || [navigator.language || ''];
    for (var i = 0; i < languages.length; i++) {
      var value = String(languages[i]).toLowerCase();
      var root = value.split('-')[0];
      if (root === 'yue' || value.indexOf('zh-hk') === 0 || value.indexOf('zh-mo') === 0) return 'yue';
      if (root === 'zh' || root === 'cmn') return 'zh';
      if (root === 'fr') return 'fr';
      if (root === 'ja') return 'ja';
      if (root === 'de') return 'de';
      if (root === 'es') return 'es';
      if (root === 'pt') return 'pt';
      if (root === 'ru') return 'ru';
      if (root === 'en') return 'en';
    }
    return 'en';
  }

  var selectedCode = browserChoice();
  var selected = cards.filter(function (card) {
    return card.getAttribute('data-language') === selectedCode;
  })[0] || cards[0];

  function setSelected(card) {
    selected = card;
    selectedCode = card.getAttribute('data-language') || 'en';
    cards.forEach(function (item) {
      var active = item === card;
      item.classList.toggle('is-selected', active);
      if (active) item.setAttribute('aria-current', 'true');
      else item.removeAttribute('aria-current');
    });
  }

  function remember(code) {
    try { localStorage.setItem('hm_language', code); } catch (e) {}
  }

  function markVisitCancelled() {
    try { sessionStorage.setItem('hm_gate_cancelled', '1'); } catch (e) {}
  }

  function wasVisitCancelled() {
    try { return sessionStorage.getItem('hm_gate_cancelled') === '1'; } catch (e) { return false; }
  }

  function setProgress(progress, seconds) {
    var value = Math.max(0, Math.min(1, progress));
    selected.style.setProperty('--countdown', String(value));
    gate.style.setProperty('--countdown', String(value));
    var count = selected.querySelector('.language-card__count');
    if (count) count.textContent = String(Math.max(1, seconds));
  }

  function cancelCountdown() {
    if (cancelled || entering) return;
    cancelled = true;
    cancelAnimationFrame(raf);
    markVisitCancelled();
    gate.classList.add('is-paused');
    statusText.textContent = 'Automatic entry paused. Choose whenever you are ready.';
  }

  function finishEntry(card) {
    if (entering) return;
    entering = true;
    cancelAnimationFrame(raf);
    var code = card.getAttribute('data-language') || 'en';
    remember(code);
    try { sessionStorage.setItem('hm_from_gate', '1'); } catch (e) {}

    if (reduced) {
      location.href = card.href;
      return;
    }

    document.body.classList.add('is-entering');
    statusText.textContent = 'Entering in ' + (names[code] || names.en) + '.';

    if (veil) {
      veil.classList.remove('is-open');
      void veil.offsetWidth;
      veil.classList.remove('is-opening');
      veil.classList.add('is-closing');
    }

    setTimeout(function () { location.href = card.href; }, 1080);
  }

  function runCountdown() {
    if (cancelled || reduced || entering) return;
    countdownStarted = true;
    var start = performance.now();
    statusText.textContent = (names[selectedCode] || names.en) + ' is selected. Entering in 4 seconds.';

    function frame(now) {
      if (cancelled || entering) return;
      var elapsed = now - start;
      var progress = elapsed / DURATION;
      var seconds = Math.ceil((DURATION - elapsed) / 1000);
      setProgress(progress, seconds);
      if (progress >= 1) finishEntry(selected);
      else raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
  }

  setSelected(selected);
  setProgress(0, 4);
  statusText.textContent = (names[selectedCode] || names.en) + ' is selected. Entering in 4 seconds.';

  cards.forEach(function (card) {
    card.addEventListener('focus', function () {
      setSelected(card);
      cancelCountdown();
    });
    card.addEventListener('click', function (event) {
      event.preventDefault();
      setSelected(card);
      finishEntry(card);
    });
  });

  ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'].forEach(function (type) {
    addEventListener(type, cancelCountdown, { capture: true, passive: true, once: false });
  });

  function revealPortal() {
    document.body.classList.remove('is-gate-booting');
    if (veil && !reduced) {
      veil.classList.add('is-opening');
      setTimeout(function () { veil.classList.add('is-open'); }, 2050);
    } else if (veil) {
      veil.remove();
    }

    if (reduced) {
      cancelled = true;
      gate.classList.add('is-paused');
      statusText.textContent = 'Choose a language to continue.';
      return;
    }

    if (wasVisitCancelled()) {
      cancelled = true;
      gate.classList.add('is-paused');
      statusText.textContent = 'Automatic entry paused. Choose whenever you are ready.';
      return;
    }

    setTimeout(function () {
      if (!cancelled && !countdownStarted) runCountdown();
    }, 1750);
  }

  var portrait = document.querySelector('.gate__portrait');
  var ready = [];
  if (portrait) ready.push(portrait.decode ? portrait.decode() : Promise.resolve());
  if (document.fonts) ready.push(document.fonts.ready);

  Promise.all(ready.map(function (job) { return Promise.resolve(job).catch(function () {}); }))
    .then(function () { setTimeout(revealPortal, reduced ? 0 : 120); });
  setTimeout(function () {
    if (document.body.classList.contains('is-gate-booting')) revealPortal();
  }, 1600);
})();
