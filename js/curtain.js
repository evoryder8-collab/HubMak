/* ==========================================================================
   curtain.js  |  physical drapery for the portal veil and the site curtain

   Each panel hangs from rings on a rod. The fabric between two rings has a
   fixed length, so when the rings bunch together it has nowhere to go but
   out of the plane: the pleats you see are that geometry, not a texture.

   - Rings are sprung masses on the rod. They cannot pass each other, and
     fabric cannot stretch past its length, so the leading edge pushes rings
     into a stack when opening and drags them along when closing.
   - Below the rod the cloth is a chain of springs, so the hem lags behind
     the rings, swings past them, and rises on a pendulum arc as it does.
   - Shading is velvet: near-black cloth, a faint gold sheen at grazing
     angles on the fold crests, deep valleys falling to black.

   The CSS panels stay in the page as the fallback. This only takes over
   once it has drawn its first frame, and steps aside without WebGL or with
   reduced motion.
   ========================================================================== */

(function () {
  'use strict';

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var root = document.getElementById('curtain') || document.getElementById('gate-veil');
  if (!root) return;
  var isPortal = root.id === 'gate-veil';

  var canvas = document.createElement('canvas');
  canvas.className = 'curtain-drape';
  canvas.setAttribute('aria-hidden', 'true');

  var gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: true, depth: false, powerPreference: 'high-performance' });
  if (!gl) return;

  /* ------------------------------------------------------------------ *
   * Shaders
   * ------------------------------------------------------------------ */

  var CLOTH_VS = [
    'attribute vec2 a_pos;',
    'attribute vec3 a_n;',
    'attribute vec4 a_f;',          // u across the panel, v down it, distance to the leading edge, fold height
    'uniform vec2 u_size;',
    'varying vec3 v_n;',
    'varying vec4 v_f;',
    'void main(){',
    '  v_n = a_n; v_f = a_f;',
    '  gl_Position = vec4(a_pos.x / u_size.x * 2.0 - 1.0, 1.0 - a_pos.y / u_size.y * 2.0, 0.0, 1.0);',
    '}'
  ].join('\n');

  // The fragment shader keeps its own copy of the size: WebKit refuses to
  // link a uniform shared with the vertex shader at a different precision.
  var CLOTH_FS = [
    '#ifdef GL_FRAGMENT_PRECISION_HIGH',
    'precision highp float;',
    '#else',
    'precision mediump float;',
    '#endif',
    'uniform vec2 u_view;',
    'uniform float u_side;',        // -1 left panel, 1 right panel
    'uniform float u_gap;',         // light spilling through the opening, 0..1
    'uniform float u_fabric;',      // fabric length across the panel, for the weave
    'varying vec3 v_n;',
    'varying vec4 v_f;',
    'float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }',
    'void main(){',
    '  vec3 n = normalize(v_n);',
    '  float u = v_f.x, v = v_f.y, dLead = v_f.z, zn = v_f.w;',
    // Stage key light, high and in front; a warm light from the opening
    '  vec3 key = normalize(vec3(-0.12 * u_side, 0.52, 0.85));',
    '  vec3 gapL = normalize(vec3(-0.78 * u_side, 0.12, 0.62));',
    '  float wrapKey = clamp((dot(n, key) + 0.42) / 1.42, 0.0, 1.0);',
    // Velvet brightens where the pile is seen edge on
    '  float sheen = pow(1.0 - clamp(n.z, 0.0, 1.0), 2.2);',
    // Deep valleys between pleats lose the light
    '  float ao = mix(0.34, 1.0, smoothstep(-0.95, 0.55, zn));',
    // The original panels were lit from the inner edge and the middle height
    '  float inner = exp(-dLead / (0.42 * u_view.x));',
    '  float band = 1.0 - 0.62 * pow(abs(v - 0.46) * 2.0, 2.0);',
    '  vec3 deep = vec3(0.0118, 0.0118, 0.0157);',      // #030304
    '  vec3 mid  = vec3(0.0314, 0.0314, 0.0392);',      // #08080a
    '  vec3 lift = vec3(0.0667, 0.0627, 0.0784);',      // #111014
    '  vec3 base = mix(deep, mix(mid, lift, inner), clamp(band * (0.55 + 0.45 * inner), 0.0, 1.0));',
    '  vec3 gold = vec3(0.788, 0.659, 0.416);',
    '  vec3 emerald = vec3(0.071, 0.424, 0.345);',
    '  vec3 col = base * (0.42 + 1.05 * wrapKey) * ao;',
    '  col += gold * sheen * 0.085 * ao * (0.45 + 0.55 * band);',
    '  float glint = pow(max(dot(n, gapL), 0.0), 4.0) * exp(-dLead / 150.0);',
    '  col += gold * glint * u_gap * 0.55;',
    '  col += mix(gold, vec3(1.0, 0.96, 0.86), 0.4) * exp(-dLead / 5.0) * u_gap * 0.22;',
    '  col += emerald * (1.0 - ao) * 0.018 * band;',
    // Pile and weave, then dither so the dark gradients never band
    '  float mottle = sin(u * u_fabric * 0.045 + v * 3.1) * sin(u * u_fabric * 0.017 - v * 1.7);',
    '  col *= 0.97 + 0.05 * mottle;',
    '  col *= 0.94 + 0.12 * hash(floor(gl_FragCoord.xy * 0.75));',
    '  col += (hash(gl_FragCoord.xy + 17.0) - 0.5) / 255.0;',
    // A heading band where the cloth meets the rod
    '  col *= mix(0.55, 1.0, smoothstep(0.0, 0.045, v));',
    '  gl_FragColor = vec4(col, 1.0);',
    '}'
  ].join('\n');

  var SHADOW_VS = [
    'attribute vec2 a_pos;',
    'attribute float a_a;',
    'uniform vec2 u_size;',
    'varying float v_a;',
    'void main(){ v_a = a_a; gl_Position = vec4(a_pos.x / u_size.x * 2.0 - 1.0, 1.0 - a_pos.y / u_size.y * 2.0, 0.0, 1.0); }'
  ].join('\n');

  var SHADOW_FS = [
    'precision mediump float;',
    'varying float v_a;',
    'void main(){ float a = v_a * v_a; gl_FragColor = vec4(0.0, 0.0, 0.0, a); }'
  ].join('\n');

  function program(vs, fs) {
    function sh(type, src) {
      var s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    }
    var v = sh(gl.VERTEX_SHADER, vs), f = sh(gl.FRAGMENT_SHADER, fs);
    if (!v || !f) return null;
    var p = gl.createProgram();
    gl.attachShader(p, v); gl.attachShader(p, f); gl.linkProgram(p);
    return gl.getProgramParameter(p, gl.LINK_STATUS) ? p : null;
  }

  var cloth = program(CLOTH_VS, CLOTH_FS);
  var shade = program(SHADOW_VS, SHADOW_FS);
  if (!cloth || !shade) return;

  var loc = {
    pos: gl.getAttribLocation(cloth, 'a_pos'),
    n: gl.getAttribLocation(cloth, 'a_n'),
    f: gl.getAttribLocation(cloth, 'a_f'),
    size: gl.getUniformLocation(cloth, 'u_size'),
    view: gl.getUniformLocation(cloth, 'u_view'),
    side: gl.getUniformLocation(cloth, 'u_side'),
    gap: gl.getUniformLocation(cloth, 'u_gap'),
    fabric: gl.getUniformLocation(cloth, 'u_fabric'),
    sPos: gl.getAttribLocation(shade, 'a_pos'),
    sA: gl.getAttribLocation(shade, 'a_a'),
    sSize: gl.getUniformLocation(shade, 'u_size')
  };

  /* ------------------------------------------------------------------ *
   * Model
   * ------------------------------------------------------------------ */

  // Cloth below the rod. Heavy velvet: stiff enough to follow, damped enough
  // that the hem lags and swings back once, never whips. Tuned offline.
  var ROW_K = 420;       // spring from each row to the one above
  var ROW_C = 40;        // damping relative to the row above
  var AIR = 4;           // drag against the air

  var CTRL = 6;          // control rows from rod to hem
  var ROWS = 30;         // drawn rows
  var SUB = 9;           // drawn columns per pleat
  var STRIDE = 9;        // floats per cloth vertex
  var H_STEP = 1 / 240;  // physics substep

  var W = 0, H = 0, dpr = 1;
  var panels = [];
  var mode = 'closed';
  var modeStart = 0;
  var lastNow = 0;
  var running = false;
  var finished = false;
  var clothBuf = gl.createBuffer();
  var clothIdx = gl.createBuffer();
  var shadowBuf = gl.createBuffer();
  var shadowIdx = gl.createBuffer();
  var clothData, shadowData, clothIndexCount = 0, shadowIndexCount = 0;

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function easeInOut(p) { p = clamp(p, 0, 1); return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; }
  function easeOutSoft(p) { p = clamp(p, 0, 1); return 1 - Math.pow(1 - p, 2.4); }
  function rnd(i) { var s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); }

  function Panel(side) {
    this.side = side;     // -1 left, 1 right
  }

  Panel.prototype.setup = function (keep) {
    var half = W / 2;
    var N = clamp(Math.round(half / 62), 6, 13);
    var prevOpen = keep && this.N ? this.openness() : 0;
    this.N = N;
    this.wall = -0.02 * W;
    this.leadClosed = half + Math.max(4, W * 0.004);
    this.spacing = (this.leadClosed - this.wall) / N;
    this.L = this.spacing * 1.3;          // fullness: 130% fabric for the width
    this.dmin = this.L * 0.16;            // how tight a pleat can stack
    this.leadFrame = this.wall + N * this.dmin + 6;
    this.exit = -(this.leadFrame + 0.05 * W);
    this.x = new Float32Array((N + 1) * CTRL);
    this.v = new Float32Array((N + 1) * CTRL);
    this.amp = new Float32Array(N);
    for (var k = 0; k < N; k++) this.amp[k] = 0.82 + 0.34 * rnd(k * 3.1 + (this.side > 0 ? 7 : 0));
    for (k = 0; k <= N; k++) {
      var x = prevOpen > 0.5 ? this.openSlot(k) + this.exit : this.closedX(k);
      for (var r = 0; r < CTRL; r++) this.x[k * CTRL + r] = x;
    }
  };

  Panel.prototype.closedX = function (k) { return this.wall + k * this.spacing; };
  Panel.prototype.openSlot = function (k) { return this.wall + k * this.dmin + (k === this.N ? 6 : 0); };
  Panel.prototype.openness = function () { return clamp((this.leadClosed - this.x[this.N * CTRL]) / (this.leadClosed - this.exit), 0, 1); };

  // Where the rod wants each ring right now
  Panel.prototype.target = function (k, t) {
    var N = this.N;
    if (mode === 'opening') {
      var shift = this.exit * easeInOut((t - 1.12) / 1.1);
      if (k === N) return this.leadClosed + (this.leadFrame - this.leadClosed) * easeInOut(t / 1.45) + shift;
      var start = 0.05 + (N - k) / N * 0.3;
      return (t < start ? this.closedX(k) : this.openSlot(k)) + shift;
    }
    if (mode === 'closing') {
      // From wherever the cloth is now, so a close can interrupt an open
      var from = this.from[k];
      if (k === N) return from + (this.leadClosed + 10 - from) * easeInOut(t / 0.7);
      var s2 = (N - k) / N * 0.14;
      return t < s2 ? from : this.closedX(k);
    }
    if (mode === 'open') return this.openSlot(k) + this.exit;
    return this.closedX(k);
  };

  Panel.prototype.step = function (h, t) {
    var N = this.N, x = this.x, v = this.v, k, r, i, a;
    var leadK = mode === 'closing' ? 360 : 300;
    // Rod row: each ring is sprung toward where the rod wants it
    for (k = 0; k <= N; k++) {
      i = k * CTRL;
      var K = k === N ? leadK : 150;
      var C = 2 * (k === N ? 0.6 : 0.78) * Math.sqrt(K);
      a = K * (this.target(k, t) - x[i]) - C * v[i];
      v[i] += a * h;
      x[i] += v[i] * h;
    }
    this.collide(0);
    this.constrain(0, this.dmin, this.L);
    // Below the rod: a chain of springs, each row following the one above
    var idle = mode === 'closed' ? 1 : 0;
    for (r = 1; r < CTRL; r++) {
      for (k = 0; k <= N; k++) {
        i = k * CTRL + r;
        a = ROW_K * (x[i - 1] - x[i]) + ROW_C * (v[i - 1] - v[i]) - AIR * v[i];
        // Closed and hanging: the faintest draught moving the lower cloth
        if (idle) a += 200 * Math.sin(t * 1.1 + k * 0.8 + r * 0.45) * Math.pow(r / CTRL, 1.5);
        v[i] += a * h;
        x[i] += v[i] * h;
      }
      this.collide(r);
      this.constrain(r, this.dmin * 0.72, this.L * 1.04);
    }
  };

  // The two leading edges meet in the middle and give a little, at every
  // height, so swinging hems bump into each other instead of crossing
  Panel.prototype.collide = function (r) {
    var i = this.N * CTRL + r, limit = this.leadClosed + 12 + 10 * r / (CTRL - 1);
    if (this.x[i] > limit) {
      this.x[i] = limit;
      if (this.v[i] > 0) this.v[i] *= -0.28;
    }
  };

  // Rings cannot pass each other, and fabric cannot stretch past its length.
  // Worked from the leading edge outward, because the leading edge is what
  // pushes and pulls.
  Panel.prototype.constrain = function (r, lo, hi) {
    var x = this.x, v = this.v, C = CTRL;
    for (var k = this.N - 1; k >= 0; k--) {
      var i = k * C + r, j = (k + 1) * C + r;
      var gap = x[j] - x[i];
      if (gap < lo) { x[i] = x[j] - lo; if (v[i] > v[j]) v[i] = v[j]; }
      else if (gap > hi) { x[i] = x[j] - hi; if (v[i] < v[j]) v[i] = v[j]; }
    }
  };

  /* ------------------------------------------------------------------ *
   * Mesh
   * ------------------------------------------------------------------ */

  function cols(p) { return p.N * SUB + 1; }

  function allocate() {
    var verts = 0, sverts = 0, idx = [], sidx = [];
    // Right panel first so the left one lies over it where they overlap
    var order = [panels[1], panels[0]];
    order.forEach(function (p) {
      var c = cols(p), base = verts;
      p.vbase = base;
      for (var i = 0; i < ROWS; i++) for (var j = 0; j < c - 1; j++) {
        var a = base + i * c + j, b = a + 1, d = a + c, e = d + 1;
        idx.push(a, d, b, b, d, e);
      }
      verts += c * (ROWS + 1);
      p.sbase = sverts;
      for (var r = 0; r < ROWS; r++) {
        var s = sverts + r * 2;
        sidx.push(s, s + 2, s + 1, s + 1, s + 2, s + 3);
      }
      sverts += (ROWS + 1) * 2;
    });
    clothData = new Float32Array(verts * STRIDE);
    shadowData = new Float32Array(sverts * 3);
    clothIndexCount = idx.length;
    shadowIndexCount = sidx.length;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, clothIdx);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(idx), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shadowIdx);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(sidx), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, clothBuf);
    gl.bufferData(gl.ARRAY_BUFFER, clothData.byteLength, gl.DYNAMIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, shadowBuf);
    gl.bufferData(gl.ARRAY_BUFFER, shadowData.byteLength, gl.DYNAMIC_DRAW);
  }

  // Catmull-Rom through the control rows
  function cr(a, b, c, d, f) {
    var f2 = f * f, f3 = f2 * f;
    return 0.5 * ((2 * b) + (-a + c) * f + (2 * a - 5 * b + 4 * c - d) * f2 + (-a + 3 * b - 3 * c + d) * f3);
  }

  var PX, PY, PZ, RX;   // scratch grids

  Panel.prototype.build = function () {
    var N = this.N, c = cols(this), x = this.x;
    var n = c * (ROWS + 1);
    if (!PX || PX.length < n) { PX = new Float32Array(n); PY = new Float32Array(n); PZ = new Float32Array(n); }
    if (!RX || RX.length < (N + 1)) RX = new Float32Array(32);
    var yTop = -0.012 * H, yBot = 1.035 * H, span = yBot - yTop;
    var L = this.L, k, j, i;

    // Pendulum lift of the hem for each ring
    var lift = new Float32Array(N + 1);
    for (k = 0; k <= N; k++) {
      var sway = x[k * CTRL + CTRL - 1] - x[k * CTRL];
      lift[k] = Math.min(sway * sway / (2.2 * span), 0.05 * H);
    }

    for (i = 0; i <= ROWS; i++) {
      var vv = i / ROWS;
      var s = vv * (CTRL - 1), r0 = Math.min(Math.floor(s), CTRL - 2), f = s - r0;
      for (k = 0; k <= N; k++) {
        var o = k * CTRL;
        RX[k] = cr(x[o + Math.max(r0 - 1, 0)], x[o + r0], x[o + r0 + 1], x[o + Math.min(r0 + 2, CTRL - 1)], f);
      }
      var y0 = yTop + span * vv;
      for (k = 0; k < N; k++) {
        var d = Math.max(RX[k + 1] - RX[k], 0.001);
        var depth = 0.5 * Math.sqrt(Math.max(L * L - d * d, 0)) * this.amp[k] * (1 + 0.07 * Math.sin(y0 * 0.0105 + k * 1.7));
        var sgn = (k & 1) ? 1 : -1;
        var last = k === N - 1 ? SUB : SUB - 1;
        for (j = 0; j <= last; j++) {
          var t = j / SUB;
          var col = k * SUB + j, idx = i * c + col;
          PX[idx] = RX[k] + d * t;
          PZ[idx] = depth * Math.sin(Math.PI * t) * sgn;
          var lf = lift[k] + (lift[k + 1] - lift[k]) * t;
          PY[idx] = y0 - lf * vv * vv;
        }
      }
      this.lead = this.lead || new Float32Array(ROWS + 1);
      this.lead[i] = RX[N];
    }

    // Normals from the grid itself, so lean, lift and folds all shade honestly
    var out = clothData, side = this.side, zs = 1 / (0.5 * L);
    for (i = 0; i <= ROWS; i++) {
      var iu = Math.max(i - 1, 0), id = Math.min(i + 1, ROWS);
      for (j = 0; j < c; j++) {
        var jl = Math.max(j - 1, 0), jr = Math.min(j + 1, c - 1);
        var a = i * c + j;
        var t1x = PX[i * c + jr] - PX[i * c + jl], t1y = PY[i * c + jr] - PY[i * c + jl], t1z = PZ[i * c + jr] - PZ[i * c + jl];
        var t2x = PX[id * c + j] - PX[iu * c + j], t2y = PY[id * c + j] - PY[iu * c + j], t2z = PZ[id * c + j] - PZ[iu * c + j];
        var nx = t1y * t2z - t1z * t2y, ny = t1z * t2x - t1x * t2z, nz = t1x * t2y - t1y * t2x;
        if (nz < 0) { nx = -nx; ny = -ny; nz = -nz; }
        var o2 = (this.vbase + a) * STRIDE;
        var sx = side < 0 ? PX[a] : W - PX[a];
        out[o2] = sx;
        out[o2 + 1] = PY[a];
        out[o2 + 2] = side < 0 ? nx : -nx;
        out[o2 + 3] = -ny;                 // shader lights in y-up space
        out[o2 + 4] = nz;
        out[o2 + 5] = j / (c - 1);
        out[o2 + 6] = i / ROWS;
        out[o2 + 7] = Math.max(this.lead[i] - PX[a], 0);
        out[o2 + 8] = PZ[a] * zs;
      }
    }

    // A soft shadow cast past the leading edge onto whatever is behind
    for (i = 0; i <= ROWS; i++) {
      var lx = this.lead[i];
      var yy = yTop + span * (i / ROWS);
      var so = (this.sbase + i * 2) * 3;
      var reach = 70 + 40 * (i / ROWS);
      shadowData[so] = side < 0 ? lx : W - lx;
      shadowData[so + 1] = yy;
      shadowData[so + 2] = 0.62;
      shadowData[so + 3] = side < 0 ? lx + reach : W - lx - reach;
      shadowData[so + 4] = yy;
      shadowData[so + 5] = 0;
    }
  };

  /* ------------------------------------------------------------------ *
   * Drawing
   * ------------------------------------------------------------------ */

  function resize(keep) {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = root.clientWidth || innerWidth;
    H = root.clientHeight || innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    if (!panels.length) panels = [new Panel(-1), new Panel(1)];
    panels.forEach(function (p) { p.setup(keep); });
    allocate();
  }

  function gapLight(t) {
    if (mode === 'opening') return easeOutSoft(t / 0.5) * (1 - easeInOut((t - 0.9) / 1.0));
    if (mode === 'closing') return 0.55 * easeInOut((t - 0.45) / 0.3) * (1 - easeInOut((t - 0.75) / 0.4));
    return 0;
  }

  function draw(t) {
    panels.forEach(function (p) { p.build(); });

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    // Shadows first
    gl.useProgram(shade);
    gl.uniform2f(loc.sSize, W, H);
    gl.bindBuffer(gl.ARRAY_BUFFER, shadowBuf);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, shadowData);
    gl.enableVertexAttribArray(loc.sPos);
    gl.enableVertexAttribArray(loc.sA);
    gl.vertexAttribPointer(loc.sPos, 2, gl.FLOAT, false, 12, 0);
    gl.vertexAttribPointer(loc.sA, 1, gl.FLOAT, false, 12, 8);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shadowIdx);
    gl.drawElements(gl.TRIANGLES, shadowIndexCount, gl.UNSIGNED_SHORT, 0);
    gl.disableVertexAttribArray(loc.sPos);
    gl.disableVertexAttribArray(loc.sA);

    // Then the cloth
    gl.useProgram(cloth);
    gl.uniform2f(loc.size, W, H);
    gl.uniform2f(loc.view, W, H);
    gl.uniform1f(loc.gap, gapLight(t));
    gl.bindBuffer(gl.ARRAY_BUFFER, clothBuf);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, clothData);
    var F = 4;
    gl.enableVertexAttribArray(loc.pos);
    gl.enableVertexAttribArray(loc.n);
    gl.enableVertexAttribArray(loc.f);
    gl.vertexAttribPointer(loc.pos, 2, gl.FLOAT, false, STRIDE * F, 0);
    gl.vertexAttribPointer(loc.n, 3, gl.FLOAT, false, STRIDE * F, 2 * F);
    gl.vertexAttribPointer(loc.f, 4, gl.FLOAT, false, STRIDE * F, 5 * F);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, clothIdx);

    // Each panel is drawn with its own side, right first so the left lies on top
    var right = panels[1], left = panels[0];
    var rightCount = right.N * SUB * ROWS * 6;
    gl.uniform1f(loc.side, 1);
    gl.uniform1f(loc.fabric, right.N * right.L);
    gl.drawElements(gl.TRIANGLES, rightCount, gl.UNSIGNED_SHORT, 0);
    gl.uniform1f(loc.side, -1);
    gl.uniform1f(loc.fabric, left.N * left.L);
    gl.drawElements(gl.TRIANGLES, clothIndexCount - rightCount, gl.UNSIGNED_SHORT, rightCount * 2);
  }

  /* ------------------------------------------------------------------ *
   * Loop and choreography
   * ------------------------------------------------------------------ */

  function settledOpen() {
    return panels.every(function (p) {
      for (var r = 0; r < CTRL; r++) {
        var i = p.N * CTRL + r;
        if (p.x[i] > -2 || Math.abs(p.v[i]) > 30) return false;
      }
      return true;
    });
  }

  function frame(now) {
    if (!running) return;
    var dt = lastNow ? Math.min((now - lastNow) / 1000, 1 / 24) : 1 / 60;
    lastNow = now;
    var t = (now - modeStart) / 1000;
    var steps = Math.max(1, Math.round(dt / H_STEP));
    var h = dt / steps;
    for (var s = 0; s < steps; s++) {
      var ts = t - dt + h * (s + 1);
      panels.forEach(function (p) { p.step(h, ts); });
    }
    draw(t);

    if (mode === 'opening' && t > 2.1 && (settledOpen() || t > 3.6)) {
      mode = 'open';
      finish();
      return;
    }
    requestAnimationFrame(frame);
  }

  function start(next) {
    panels.forEach(function (p) {
      p.from = new Float32Array(p.N + 1);
      for (var k = 0; k <= p.N; k++) p.from[k] = p.x[k * CTRL];
    });
    mode = next;
    modeStart = performance.now();
    lastNow = 0;
    finished = false;
    root.classList.remove('is-drape-finished');
    if (!running) { running = true; requestAnimationFrame(frame); }
  }

  function finish() {
    running = false;
    finished = true;
    root.classList.add('is-drape-finished');
    // The site curtain never comes back, so hand the GPU back too
    if (!isPortal) {
      var lose = gl.getExtension('WEBGL_lose_context');
      if (lose) lose.loseContext();
      canvas.remove();
    }
  }

  function watch() {
    var openClass = isPortal ? 'is-opening' : 'is-open';
    function sync() {
      var c = root.classList;
      if (c.contains('is-closing') && mode !== 'closing') start('closing');
      else if (c.contains(openClass) && !c.contains('is-closing') && (mode === 'closed')) start('opening');
    }
    new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['class'] });
    sync();
  }

  /* ------------------------------------------------------------------ *
   * Mount
   * ------------------------------------------------------------------ */

  root.insertBefore(canvas, root.firstChild);
  resize(false);
  root.classList.add('has-drape');

  // First frame drawn, then and only then does it replace the CSS panels
  running = true;
  modeStart = performance.now();
  requestAnimationFrame(function first(now) {
    frame(now);
    root.classList.add('is-drape-ready');
  });
  watch();

  var resizeTimer;
  addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (finished && !isPortal) return;
      resize(true);
      if (!running) draw((performance.now() - modeStart) / 1000);
    }, 120);
  }, { passive: true });

  canvas.addEventListener('webglcontextlost', function (e) {
    e.preventDefault();
    running = false;
    root.classList.remove('has-drape', 'is-drape-ready');
    canvas.remove();
  });
})();
