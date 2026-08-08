/* ==========================================================================
   script.js  |  Hubert Mak
   No dependencies. One scroll loop. Everything degrades.
   ========================================================================== */

(function () {
  'use strict';

  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var t = window.HM_TRANSLATE || function (key) { return key; };

  /* ================================================================== *
   * Kinetic type
   * ================================================================== */

  function splitKinetic(el) {
    var mode = el.getAttribute('data-kinetic');
    var text = el.textContent.trim().replace(/\s+/g, ' ');
    var words = text.split(' ');
    var frag = document.createDocumentFragment();
    var i = 0;

    el.setAttribute('aria-label', text);
    el.textContent = '';

    words.forEach(function (word, w) {
      var group = document.createElement('span');
      group.className = 'k-word';
      group.setAttribute('aria-hidden', 'true');

      (mode === 'letters' ? word.split('') : [word]).forEach(function (piece) {
        var mask = document.createElement('span');
        mask.className = 'k-mask';
        var unit = document.createElement('span');
        unit.className = 'k-unit';
        unit.style.setProperty('--i', i++);
        unit.textContent = piece;
        mask.appendChild(unit);
        group.appendChild(mask);
      });

      frag.appendChild(group);
      if (w < words.length - 1) frag.appendChild(document.createTextNode(' '));
    });

    el.appendChild(frag);
  }

  $$('[data-kinetic]').forEach(splitKinetic);

  /* ================================================================== *
   * Reveals
   * ================================================================== */

  var heroType = [$('.hero__eyebrow'), $('.hero__name'), $('.hero__statement'), $('.hero__role'), $('.hero__award')];

  var revealables = $$('[data-reveal], [data-kinetic], .plate').filter(function (el) {
    return heroType.indexOf(el) === -1;
  });

  // Consecutive revealing siblings arrive one after the other, not together
  revealables.forEach(function (el) {
    var prev = el.previousElementSibling;
    var step = 0;
    while (prev && prev.hasAttribute && prev.hasAttribute('data-reveal') && step < 4) {
      step++; prev = prev.previousElementSibling;
    }
    if (step) el.style.setProperty('--d', (step * 90) + 'ms');
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      });
      // -6% is enough to feel like a reveal without stranding anything that
      // sits low inside a pinned section
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ================================================================== *
   * Overture: loader, then the curtain parts
   * ================================================================== */

  var loader = $('#loader');
  var loaderFill = $('#loader-fill');
  var loaderCount = $('#loader-count');
  var curtain = $('#curtain');
  var nav = $('#nav');
  var rail = $('#rail');
  var hero = $('#hero');

  function showChrome() {
    if (nav) nav.classList.add('is-visible');
    if (rail) rail.classList.add('is-visible');
    if (hero) hero.classList.add('is-ready');
  }

  function overture() {
    document.body.classList.remove('is-booting');

    if (reduced) {
      heroType.forEach(function (el) { el && el.classList.add('is-visible'); });
      if (loader) loader.remove();
      if (curtain) curtain.remove();
      showChrome();
      return;
    }

    if (loader) loader.classList.add('is-gone');
    setTimeout(function () { loader && loader.remove(); }, 900);

    if (curtain) curtain.classList.add('is-parting');
    setTimeout(function () { curtain && curtain.classList.add('is-open'); }, 260);
    setTimeout(function () { heroType[0] && heroType[0].classList.add('is-visible'); }, 720);
    setTimeout(function () { heroType[1] && heroType[1].classList.add('is-visible'); }, 980);
    setTimeout(function () { heroType[2] && heroType[2].classList.add('is-visible'); }, 1480);
    setTimeout(function () { heroType[3] && heroType[3].classList.add('is-visible'); }, 1820);
    setTimeout(function () { heroType[4] && heroType[4].classList.add('is-visible'); }, 2020);
    setTimeout(showChrome, 2200);
    setTimeout(function () { curtain && curtain.classList.add('is-done'); }, 2600);
  }

  (function boot() {
    // Only things the browser is actually fetching now. A lazy image never
    // settles, so waiting on one would hold the curtain shut.
    var jobs = [];

    var subject = $('.cut--hero .cut__img');
    if (subject) {
      jobs.push(subject.decode ? subject.decode() : Promise.resolve());
    }

    var poster = new Image();
    jobs.push(new Promise(function (res) {
      poster.onload = poster.onerror = res;
      poster.src = 'assets/video/reel-poster.webp';
    }));

    jobs.push(document.fonts ? document.fonts.ready : Promise.resolve());

    var total = jobs.length;
    var done = 0;
    var shown = 0;
    var started = performance.now();
    var fired = false;

    function paint() {
      var target = Math.round(100 * done / total);
      if (target <= shown) return;
      shown = target;
      if (loaderFill) loaderFill.style.width = shown + '%';
      if (loaderCount) loaderCount.textContent = String(shown).padStart(2, '0');
    }

    function tick() {
      done++;
      paint();
      if (done >= total) finish();
    }

    function finish() {
      if (fired) return;
      fired = true;
      done = total;
      paint();
      var wait = Math.max(0, 820 - (performance.now() - started));
      setTimeout(overture, wait);
    }

    jobs.forEach(function (job) {
      Promise.resolve(job).catch(function () {}).then(tick);
    });

    setTimeout(finish, 2600);          // never hold the page hostage
  })();

  /* ================================================================== *
   * Nav backdrop
   * ================================================================== */

  if (nav && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      nav.classList.toggle('is-stuck', !e[0].isIntersecting);
    }, { rootMargin: '-76px 0px 0px 0px' }).observe(hero);
  }

  /* ================================================================== *
   * One scroll loop drives every scroll-linked value
   * ================================================================== */

  var strip = $('.strip');
  var stripTrack = $('#strip-track');
  var stripViewport = $('#strip-viewport');
  var stripNow = $('#strip-now');
  var stripAll = $('#strip-all');
  var plates = $$('#strip-track .plate');   // the craft inset is a .plate too
  var film = $('.film');
  var filmFrame = $('.film__frame');
  var heroStage = $('.hero__stage');
  var railProgress = $('#rail-progress');
  var railLinks = $$('[data-rail]');
  var sections = $$('[data-track]');

  if (stripAll) stripAll.textContent = String(plates.length).padStart(2, '0');

  var pinnedStrip = false;
  var stripSpan = 0;
  var stripFocus = -1;

  function layout() {
    pinnedStrip = !reduced && finePointer && innerWidth >= 992;

    if (strip && stripTrack && stripViewport) {
      if (pinnedStrip) {
        // Measure from the last frame rather than scrollWidth, which drops the
        // track's trailing padding and would leave the last plate flush to the edge
        var last = plates[plates.length - 1];
        var tailPad = parseFloat(getComputedStyle(stripTrack).paddingRight) || 0;
        var reach = last ? last.offsetLeft + last.offsetWidth + tailPad : stripTrack.scrollWidth;
        stripSpan = Math.max(0, reach - stripViewport.clientWidth);
        strip.style.height = (innerHeight + stripSpan) + 'px';
      } else {
        strip.style.height = '';
        stripTrack.style.transform = '';
        stripSpan = 0;
        plates.forEach(function (pl) { pl.classList.remove('is-focus'); });
        stripFocus = -1;
      }
      strip.classList.toggle('is-pinned', pinnedStrip);
    }
  }

  // Progress through a sticky-pinned section, 0 before, 1 after
  function pinProgress(section) {
    var travel = section.offsetHeight - innerHeight;
    if (travel <= 0) return 0;
    return clamp(-section.getBoundingClientRect().top / travel, 0, 1);
  }

  var lastNow = -1;
  var currentRail = '';

  function frame() {
    // Hero recedes as you leave it
    if (heroStage && hero) {
      heroStage.style.setProperty('--p', clamp(scrollY / (hero.offsetHeight * 0.85), 0, 1).toFixed(4));
    }

    // The iris opens as the section rises into view, so it is already open by
    // the time it pins. Driving it off pin progress left it a closed sliver for
    // the whole approach.
    if (film && filmFrame) {
      var ft = film.getBoundingClientRect().top;
      filmFrame.style.setProperty('--p', clamp((innerHeight - ft) / (innerHeight * 0.82), 0, 1).toFixed(4));
    }

    // The filmstrip walks sideways, and the rail steps aside while it does
    if (pinnedStrip && strip && stripTrack) {
      var sp = pinProgress(strip);
      stripTrack.style.transform = 'translate3d(' + (-sp * stripSpan).toFixed(2) + 'px,0,0)';
      strip.classList.toggle('is-ending', sp > 0.9);
      // Whichever frame is nearest the centre of the field takes the light
      var mid = stripViewport.getBoundingClientRect().left + stripViewport.clientWidth / 2;
      var best = 0, bestD = Infinity;
      plates.forEach(function (pl, i) {
        var b = pl.getBoundingClientRect();
        var d = Math.abs(b.left + b.width / 2 - mid);
        if (d < bestD) { bestD = d; best = i; }
      });
      if (best !== stripFocus) {
        if (plates[stripFocus]) plates[stripFocus].classList.remove("is-focus");
        plates[best].classList.add('is-focus');
        stripFocus = best;
      }

      var idx = best + 1;
      if (idx !== lastNow) {
        lastNow = idx;
        if (stripNow) stripNow.textContent = String(idx).padStart(2, '0');
      }
      if (rail) {
        var r = strip.getBoundingClientRect();
        rail.classList.toggle('is-dim', r.top < innerHeight * 0.5 && r.bottom > innerHeight * 0.5);
      }
    } else if (rail) {
      rail.classList.remove('is-dim');
    }

    // Rail progress and the current chapter
    if (railProgress) {
      var max = document.documentElement.scrollHeight - innerHeight;
      railProgress.style.height = (max > 0 ? clamp(scrollY / max, 0, 1) * 100 : 0).toFixed(2) + '%';
    }
    if (railLinks.length) {
      var mid = innerHeight * 0.42;
      var active = '';
      sections.forEach(function (s) {
        var r = s.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) active = s.getAttribute('data-track');
      });
      if (active !== currentRail) {
        currentRail = active;
        railLinks.forEach(function (a) {
          a.classList.toggle('is-current', a.getAttribute('data-rail') === active);
        });
      }
    }
  }

  var queued = false;
  function onScroll() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; frame(); });
  }

  layout();
  frame();
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', function () { layout(); frame(); }, { passive: true });
  if (document.fonts) document.fonts.ready.then(function () { layout(); frame(); });

  // Carousel mode keeps the counter honest
  if (stripViewport) {
    stripViewport.addEventListener('scroll', function () {
      if (pinnedStrip || !plates.length) return;
      var w = stripViewport.scrollWidth - stripViewport.clientWidth;
      var p = w > 0 ? stripViewport.scrollLeft / w : 0;
      var idx = Math.min(plates.length, Math.floor(p * (plates.length - 1) + 0.5) + 1);
      if (stripNow) stripNow.textContent = String(idx).padStart(2, '0');
    }, { passive: true });
  }

  /* ================================================================== *
   * The film
   * ================================================================== */

  var video = $('#reel-video');
  var soundBtn = $('#reel-sound');

  if (video) {
    var wired = false;

    function play() {
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            if (!wired) {
              wired = true;
              var src = document.createElement('source');
              src.src = 'assets/video/reel.mp4';
              src.type = 'video/mp4';
              video.appendChild(src);
              video.preload = 'auto';
              video.load();
            }
            play();
          } else if (!video.paused) {
            video.pause();
          }
        });
      }, { threshold: 0.3 }).observe(video);
    }

    if (soundBtn) {
      var soundLabel = $('.sound__label', soundBtn);
      soundBtn.addEventListener('click', function () {
        video.muted = !video.muted;
        var on = !video.muted;
        soundBtn.setAttribute('aria-pressed', String(on));
        if (soundLabel) soundLabel.textContent = on ? t('sound_off') : t('sound_on');
        soundBtn.setAttribute('data-cursor', on ? 'Mute' : 'Listen');
        if (video.paused) play();
      });
    }
  }

  /* ================================================================== *
   * Lightbox
   * ================================================================== */

  var lightbox = $('#lightbox');
  var lbImg = $('#lightbox-img');
  var lbCap = $('#lightbox-caption');
  var lbCount = $('#lightbox-count');
  var lbClose = $('#lightbox-close');
  var hits = $$('.plate__hit');
  var lbIndex = 0;
  var lastFocus = null;

  function renderLightbox() {
    var hit = hits[lbIndex];
    if (!hit) return;
    lbImg.src = hit.getAttribute('data-full');
    var img = $('img', hit);
    lbImg.alt = img ? img.alt : '';
    lbCap.textContent = hit.getAttribute('data-caption') || '';
    lbCount.textContent = String(lbIndex + 1).padStart(2, '0') + ' / ' + String(hits.length).padStart(2, '0');
  }

  function openLightbox(i, from) {
    if (!lightbox) return;
    lbIndex = i;
    lastFocus = from || null;
    renderLightbox();
    lightbox.hidden = false;
    document.body.classList.add('no-scroll');
    requestAnimationFrame(function () { lightbox.classList.add('is-open'); });
    if (lbClose) lbClose.focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    var hide = function () { lightbox.hidden = true; lbImg.src = ''; };
    reduced ? hide() : setTimeout(hide, 620);
    if (lastFocus) lastFocus.focus();
  }

  function step(d) {
    lbIndex = (lbIndex + d + hits.length) % hits.length;
    renderLightbox();
  }

  hits.forEach(function (hit, i) {
    hit.addEventListener('click', function () { openLightbox(i, hit); });
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  var lbPrev = $('#lightbox-prev');
  var lbNext = $('#lightbox-next');
  if (lbPrev) lbPrev.addEventListener('click', function () { step(-1); });
  if (lbNext) lbNext.addEventListener('click', function () { step(1); });

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target === $('.lightbox__figure')) closeLightbox();
    });
  }

  addEventListener('keydown', function (e) {
    if (!lightbox || lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });

  /* ================================================================== *
   * Cursor
   * ================================================================== */

  var cursor = $('#cursor');

  if (cursor && finePointer && !reduced) {
    var dot = $('.cursor__dot', cursor);
    var ring = $('.cursor__ring', cursor);
    var labelEl = $('#cursor-label');
    var mx = innerWidth / 2, my = innerHeight / 2;
    var rx = mx, ry = my;

    addEventListener('mousemove', function (e) {
      if (!cursor.classList.contains('is-awake')) {
        rx = mx = e.clientX; ry = my = e.clientY;
        cursor.classList.add('is-awake');
      }
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
    }, { passive: true });

    (function trail() {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      var t = 'translate(' + rx.toFixed(1) + 'px,' + ry.toFixed(1) + 'px) translate(-50%,-50%)';
      ring.style.transform = t;
      labelEl.style.transform = t;
      requestAnimationFrame(trail);
    })();

    $$('a, button, input, textarea, label').forEach(function (el) {
      var label = el.getAttribute('data-cursor') ||
                  (el.closest('[data-cursor]') ? el.closest('[data-cursor]').getAttribute('data-cursor') : null);
      el.addEventListener('mouseenter', function () {
        cursor.classList.add('is-hot');
        var text = el.getAttribute('data-cursor') || label;
        if (text) {
          labelEl.textContent = text;
          cursor.classList.add('is-labelled');
        }
      });
      el.addEventListener('mouseleave', function () {
        cursor.classList.remove('is-hot', 'is-labelled');
      });
    });

    $$('[data-cursor]').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        labelEl.textContent = el.getAttribute('data-cursor');
        cursor.classList.add('is-hot', 'is-labelled');
      });
      el.addEventListener('mouseleave', function () {
        cursor.classList.remove('is-hot', 'is-labelled');
      });
    });
  } else if (cursor) {
    cursor.remove();
  }

  /* ================================================================== *
   * Contact form
   * Static hosting has no mail server, so this hands off to the mail app.
   * See the README for the one line that swaps in a form service.
   * ================================================================== */

  var CONTACT_EMAIL = 'hello@hubertmak.com';

  var form = $('#contact-form');
  var status = $('#form-status');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();

      if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = t('form_validation');
        return;
      }

      status.textContent = t('form_opening');
      location.href = 'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent('Enquiry from ' + name) +
        '&body=' + encodeURIComponent(message + '\n\n' + name + '\n' + email);
    });
  }

  var year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ================================================================== *
   * Ambient WebGL: three slow pools of colour over near black
   * ================================================================== */

  (function ambient() {
    if (reduced) return;

    var canvas = $('#ambient-gl');
    if (!canvas) return;

    var gl = canvas.getContext('webgl', {
      alpha: true, antialias: false, depth: false, powerPreference: 'low-power'
    });
    if (!gl) return;

    var vert = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';

    var frag = [
      'precision mediump float;',
      'uniform vec2 u_res;',
      'uniform float u_t;',
      'float pool(vec2 uv, vec2 c, float r){ return smoothstep(r, 0.0, length(uv - c)); }',
      'void main(){',
      '  vec2 uv = gl_FragCoord.xy / u_res.xy;',
      '  float a = u_res.x / u_res.y;',
      '  uv.x *= a;',
      '  float t = u_t * 0.042;',
      '  vec3 emerald = vec3(0.038, 0.196, 0.158);',
      '  vec3 gold    = vec3(0.238, 0.184, 0.084);',
      '  vec3 violet  = vec3(0.112, 0.082, 0.172);',
      '  vec2 c1 = vec2(a * (0.25 + 0.07 * sin(t * 0.9)),       0.71 + 0.06 * cos(t * 0.7));',
      '  vec2 c2 = vec2(a * (0.77 + 0.06 * cos(t * 0.6 + 1.7)), 0.63 + 0.07 * sin(t * 0.8 + 0.4));',
      '  vec2 c3 = vec2(a * (0.50 + 0.09 * sin(t * 0.5 + 3.1)), 0.19 + 0.08 * cos(t * 0.45 + 2.2));',
      '  float b = 0.60 + 0.13 * sin(t * 1.1);',
      '  vec3 col = emerald * pool(uv, c1, 0.62 * b) * 0.95',
      '           + gold    * pool(uv, c2, 0.52 * b) * 0.70',
      '           + violet  * pool(uv, c3, 0.70 * b) * 0.90;',
      '  col *= smoothstep(1.25, 0.25, length(uv - vec2(a * 0.5, 0.5)));',
      '  gl_FragColor = vec4(col, 1.0);',
      '}'
    ].join('\n');

    function compile(type, src) {
      var s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    }

    var vs = compile(gl.VERTEX_SHADER, vert);
    var fs = compile(gl.FRAGMENT_SHADER, frag);
    if (!vs || !fs) return;

    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    var uRes = gl.getUniformLocation(prog, 'u_res');
    var uT = gl.getUniformLocation(prog, 'u_t');

    // Half resolution is plenty for soft colour fields
    function resize() {
      var w = Math.max(1, Math.round(canvas.clientWidth * 0.5));
      var h = Math.max(1, Math.round(canvas.clientHeight * 0.5));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
    }

    var start = performance.now();
    var last = 0;
    var visible = !document.hidden;

    document.addEventListener('visibilitychange', function () { visible = !document.hidden; });
    addEventListener('resize', resize, { passive: true });

    function draw(now) {
      requestAnimationFrame(draw);
      if (!visible || now - last < 40) return;   // nothing here moves fast
      last = now;
      resize();
      gl.uniform1f(uT, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    resize();
    requestAnimationFrame(draw);
    canvas.parentNode.classList.add('gl-live');
  })();

})();
