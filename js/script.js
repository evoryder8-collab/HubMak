/* ==========================================================================
   script.js  |  Hubert Mak
   No dependencies. Everything degrades gracefully.
   ========================================================================== */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var supportsViewTimeline = window.CSS && CSS.supports && CSS.supports('animation-timeline', 'view()');

  /* ------------------------------------------------------------------ *
   * Kinetic type
   * ------------------------------------------------------------------ */

  // Words always stay whole. In letter mode each word keeps its letters together
  // so a headline never breaks in the middle of a word.
  function splitKinetic(el) {
    var mode = el.getAttribute('data-kinetic');
    var text = el.textContent.trim().replace(/\s+/g, ' ');
    var words = text.split(' ');
    var frag = document.createDocumentFragment();
    var index = 0;

    el.setAttribute('aria-label', text);
    el.textContent = '';

    words.forEach(function (word, w) {
      var group = document.createElement('span');
      group.className = 'k-word';
      group.setAttribute('aria-hidden', 'true');

      var pieces = mode === 'letters' ? word.split('') : [word];

      pieces.forEach(function (piece) {
        var wrap = document.createElement('span');
        wrap.className = 'k-wrap';

        var inner = document.createElement('span');
        inner.className = 'k-unit';
        inner.style.setProperty('--i', index++);
        inner.textContent = piece;

        wrap.appendChild(inner);
        group.appendChild(wrap);
      });

      frag.appendChild(group);
      if (w < words.length - 1) frag.appendChild(document.createTextNode(' '));
    });

    el.appendChild(frag);
  }

  var kineticEls = Array.prototype.slice.call(document.querySelectorAll('[data-kinetic]'));
  kineticEls.forEach(splitKinetic);

  /* ------------------------------------------------------------------ *
   * Scroll reveals
   * ------------------------------------------------------------------ */

  var heroKinetic = ['.hero__name', '.hero__subtitle'].map(function (s) {
    return document.querySelector(s);
  });

  var revealTargets = Array.prototype.slice
    .call(document.querySelectorAll('[data-reveal], [data-kinetic], .reel__stage'))
    .filter(function (el) { return heroKinetic.indexOf(el) === -1; });

  // Stagger consecutive siblings so paragraphs arrive one after another
  revealTargets.forEach(function (el) {
    var prev = el.previousElementSibling;
    if (prev && prev.hasAttribute && prev.hasAttribute('data-reveal') && !el.hasAttribute('data-kinetic')) {
      el.style.setProperty('--reveal-delay', '90ms');
    }
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ------------------------------------------------------------------ *
   * Opening curtain
   * ------------------------------------------------------------------ */

  var curtain = document.getElementById('curtain');
  var nav = document.getElementById('nav');
  var hero = document.getElementById('hero');

  function finishIntro() {
    if (curtain) curtain.classList.add('is-done');
    document.body.classList.remove('is-loading');
    if (nav) nav.classList.add('is-visible');
    if (hero) hero.classList.add('is-ready');
  }

  function runIntro() {
    if (reduced) {
      heroKinetic.forEach(function (el) { if (el) el.classList.add('is-visible'); });
      finishIntro();
      return;
    }

    document.body.classList.remove('is-loading');

    setTimeout(function () { if (curtain) curtain.classList.add('is-open'); }, 260);
    setTimeout(function () { if (heroKinetic[0]) heroKinetic[0].classList.add('is-visible'); }, 1050);
    setTimeout(function () { if (heroKinetic[1]) heroKinetic[1].classList.add('is-visible'); }, 1650);
    setTimeout(function () {
      if (nav) nav.classList.add('is-visible');
      if (hero) hero.classList.add('is-ready');
    }, 2100);
    setTimeout(function () { if (curtain) curtain.classList.add('is-done'); }, 2400);
  }

  var heroImg = document.querySelector('.hero__image');
  if (heroImg && !heroImg.complete) {
    heroImg.addEventListener('load', runIntro, { once: true });
    heroImg.addEventListener('error', runIntro, { once: true });
    setTimeout(runIntro, 2500); // never let a slow image hold the curtain shut
  } else {
    runIntro();
  }

  /* ------------------------------------------------------------------ *
   * Nav background once the hero is behind us
   * ------------------------------------------------------------------ */

  if (nav && 'IntersectionObserver' in window && hero) {
    new IntersectionObserver(function (entries) {
      nav.classList.toggle('is-stuck', !entries[0].isIntersecting);
    }, { rootMargin: '-72px 0px 0px 0px' }).observe(hero);
  }

  /* ------------------------------------------------------------------ *
   * Reel: load on approach, play in view, sound on request
   * ------------------------------------------------------------------ */

  var video = document.getElementById('reel-video');
  var soundBtn = document.getElementById('reel-sound');

  if (video) {
    var loaded = false;

    var play = function () {
      var p = video.play();
      if (p && p.catch) p.catch(function () { /* autoplay declined, poster stays */ });
    };

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (!loaded) {
              loaded = true;
              video.preload = 'auto';
              video.load();
            }
            play();
          } else if (!video.paused) {
            video.pause();
          }
        });
      }, { threshold: 0.35 }).observe(video);
    }

    if (soundBtn) {
      var label = soundBtn.querySelector('.reel__sound-label');
      soundBtn.addEventListener('click', function () {
        video.muted = !video.muted;
        var on = !video.muted;
        soundBtn.setAttribute('aria-pressed', String(on));
        if (label) label.textContent = on ? 'Turn sound off' : 'Turn sound on';
        if (video.paused) play();
      });
    }
  }

  /* ------------------------------------------------------------------ *
   * Lightbox
   * ------------------------------------------------------------------ */

  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightbox-img');
  var lbCap = document.getElementById('lightbox-caption');
  var lbClose = document.getElementById('lightbox-close');
  var lastFocus = null;

  function openLightbox(btn) {
    if (!lightbox) return;
    lastFocus = btn;
    lbImg.src = btn.getAttribute('data-full');
    lbImg.alt = btn.querySelector('img') ? btn.querySelector('img').alt : '';
    lbCap.textContent = btn.getAttribute('data-caption') || '';
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
    reduced ? hide() : setTimeout(hide, 700);
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('.bento__open').forEach(function (btn) {
    btn.addEventListener('click', function () { openLightbox(btn); });
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('lightbox__figure')) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ------------------------------------------------------------------ *
   * Custom cursor, desktop only
   * ------------------------------------------------------------------ */

  var cursor = document.getElementById('cursor');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (cursor && finePointer && !reduced) {
    var dot = cursor.querySelector('.cursor__dot');
    var halo = cursor.querySelector('.cursor__halo');
    var mx = window.innerWidth / 2, my = window.innerHeight / 2;
    var hx = mx, hy = my;

    document.addEventListener('mousemove', function (e) {
      if (!cursor.classList.contains('is-awake')) {
        hx = mx = e.clientX;
        hy = my = e.clientY;
        cursor.classList.add('is-awake');
      }
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
    }, { passive: true });

    (function trail() {
      hx += (mx - hx) * 0.12;
      hy += (my - hy) * 0.12;
      halo.style.transform = 'translate(' + hx + 'px,' + hy + 'px) translate(-50%,-50%)';
      requestAnimationFrame(trail);
    })();

    document.querySelectorAll('a, button, input, textarea').forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursor.classList.add('is-hot'); });
      el.addEventListener('mouseleave', function () { cursor.classList.remove('is-hot'); });
    });
  } else if (cursor) {
    cursor.remove();
  }

  /* ------------------------------------------------------------------ *
   * Parallax fallback, only where scroll-timeline is unavailable
   * ------------------------------------------------------------------ */

  if (!supportsViewTimeline && !reduced) {
    var layers = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
    if (layers.length) {
      var ticking = false;
      var shift = function () {
        var vh = window.innerHeight;
        layers.forEach(function (layer) {
          var rect = layer.getBoundingClientRect();
          if (rect.bottom < -200 || rect.top > vh + 200) return;
          var img = layer.querySelector('img');
          if (!img) return;
          var progress = (rect.top + rect.height / 2 - vh / 2) / vh;
          var amount = progress * parseFloat(layer.getAttribute('data-parallax')) * -100;
          img.style.transform = 'translate3d(0,' + amount.toFixed(2) + 'px,0)';
        });
        ticking = false;
      };
      window.addEventListener('scroll', function () {
        if (!ticking) { ticking = true; requestAnimationFrame(shift); }
      }, { passive: true });
      shift();
    }
  }

  /* ------------------------------------------------------------------ *
   * Contact form
   * Static hosting has no mail server, so this opens a prefilled message.
   * See README for the one line that swaps in a form service instead.
   * ------------------------------------------------------------------ */

  var CONTACT_EMAIL = 'hello@hubertmak.com';

  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();

      if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = 'Please add your name, a valid email, and a message.';
        return;
      }

      var subject = encodeURIComponent('Enquiry from ' + name);
      var body = encodeURIComponent(message + '\n\n' + name + '\n' + email);
      window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + subject + '&body=' + body;
      status.textContent = 'Your message is ready to send in your mail app.';
    });
  }

  /* ------------------------------------------------------------------ *
   * Year
   * ------------------------------------------------------------------ */

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ------------------------------------------------------------------ *
   * Ambient WebGL, three slow drifting pools of colour.
   * Falls back silently to the CSS gradient underneath.
   * ------------------------------------------------------------------ */

  (function ambient() {
    if (reduced) return;

    var canvas = document.getElementById('ambient-gl');
    if (!canvas) return;

    var gl = canvas.getContext('webgl', { alpha: true, antialias: false, depth: false, powerPreference: 'low-power' });
    if (!gl) return;

    var vert = [
      'attribute vec2 p;',
      'void main(){ gl_Position = vec4(p, 0.0, 1.0); }'
    ].join('\n');

    var frag = [
      'precision mediump float;',
      'uniform vec2 u_res;',
      'uniform float u_t;',
      '',
      'float pool(vec2 uv, vec2 c, float r){',
      '  float d = length((uv - c) / vec2(1.0, 1.0));',
      '  return smoothstep(r, 0.0, d);',
      '}',
      '',
      'void main(){',
      '  vec2 uv = gl_FragCoord.xy / u_res.xy;',
      '  uv.x *= u_res.x / u_res.y;',
      '  float a = u_res.x / u_res.y;',
      '  float t = u_t * 0.045;',
      '',
      '  vec3 emerald = vec3(0.040, 0.205, 0.165);',
      '  vec3 gold    = vec3(0.245, 0.190, 0.088);',
      '  vec3 violet  = vec3(0.118, 0.085, 0.180);',
      '',
      '  vec2 c1 = vec2(a * (0.26 + 0.07 * sin(t * 0.9)),       0.70 + 0.06 * cos(t * 0.7));',
      '  vec2 c2 = vec2(a * (0.76 + 0.06 * cos(t * 0.6 + 1.7)), 0.62 + 0.07 * sin(t * 0.8 + 0.4));',
      '  vec2 c3 = vec2(a * (0.50 + 0.09 * sin(t * 0.5 + 3.1)), 0.20 + 0.08 * cos(t * 0.45 + 2.2));',
      '',
      '  float b = 0.60 + 0.14 * sin(t * 1.1);',
      '',
      '  vec3 col = vec3(0.0);',
      '  col += emerald * pool(uv, c1, 0.62 * b) * 0.95;',
      '  col += gold    * pool(uv, c2, 0.52 * b) * 0.72;',
      '  col += violet  * pool(uv, c3, 0.70 * b) * 0.90;',
      '',
      '  float vig = smoothstep(1.25, 0.25, length(uv - vec2(a * 0.5, 0.5)));',
      '  col *= vig;',
      '',
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

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    var uRes = gl.getUniformLocation(prog, 'u_res');
    var uT = gl.getUniformLocation(prog, 'u_t');

    // Half resolution is plenty for soft colour fields, and much kinder to the GPU
    function resize() {
      var w = Math.max(1, Math.round(canvas.clientWidth * 0.5));
      var h = Math.max(1, Math.round(canvas.clientHeight * 0.5));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
    }

    var start = performance.now();
    var last = 0;
    var visible = !document.hidden;

    document.addEventListener('visibilitychange', function () { visible = !document.hidden; });
    window.addEventListener('resize', resize, { passive: true });

    function draw(now) {
      requestAnimationFrame(draw);
      if (!visible || now - last < 40) return; // roughly 25fps, nothing here moves fast
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
