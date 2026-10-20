/* ==========================================================================
   clinic-map.js  |  the MakCare clinic, in three dimensions

   MapLibre over OpenFreeMap vector tiles, restyled into the site's palette:
   emerald water, near-black land, roads in warm bronze, buildings extruded
   in dark bronze that warms with height. MakCare's own building is lit in
   gold and rises once the camera arrives.

   Choreography follows the AusMC venue map: the camera starts high over
   the city, flies down to the clinic when the map comes into view, then
   orbits it very slowly. The orbit pauses off screen and stops for good
   once the visitor touches the map. One finger keeps scrolling the page;
   two move the map.

   Loads only on phones (the map is a phone-only destination), only as the
   contact chapter approaches. Without WebGL, modules or the tiles, the
   original Google embed takes its place.
   ========================================================================== */

window.HM_MAP3D = true;   // tells script.js not to load the embed

const CLINIC = [-79.2583842, 43.8931229];          // 10 Fincham Ave, Markham (OpenStreetMap)
const VENDOR = new URL('../assets/vendor/maplibre-6.12.0/', import.meta.url);
const STYLE_URL = 'https://tiles.openfreemap.org/styles/dark';

const section = document.getElementById('clinic-location');
const frame = section && section.querySelector('.contact-map__map');
const embed = document.getElementById('clinic-map');
const driveHere = document.getElementById('drive-here');
const phone = matchMedia('(max-width: 46rem)');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* The palette of the old map treatment: emerald, warm umber, gold */
const C = {
  bg: '#070908',
  land: '#0a0e0c',
  residential: '#0c110f',
  park: '#0c1d17',
  water: '#0b2b25',
  waterLine: '#123a31',
  minor: '#221d15',
  major: '#43382a',
  majorCasing: '#14110c',
  motorway: '#7a6238',
  rail: '#1d1a14',
  boundary: '#2a2a22',
  text: '#bdb5a5',
  textWater: '#5f9c87',
  halo: '#070908',
  gold: '#d9b878',
};

let map = null;
let started = false;

function fallback(reason) {
  if (reason) console.warn('[clinic map] using the embed:', reason);
  window.HM_MAP3D = false;
  if (section) section.classList.remove('is-3d', 'is-3d-ready');
  if (embed && !embed.getAttribute('src')) embed.setAttribute('src', embed.getAttribute('data-src'));
}

function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch (e) { return false; }
}

/* ------------------------------------------------------------------ *
 * Style
 * ------------------------------------------------------------------ */

function restyle(style) {
  // The flat building layer and the one-way arrows have no place here
  style.layers = style.layers.filter((l) => l.id !== 'building' && !l.id.startsWith('road_oneway'));

  for (const l of style.layers) {
    const p = (l.paint = l.paint || {});
    const id = l.id;
    delete p['fill-pattern'];   // flat colour, and no sprite to fetch
    if (l.type === 'background') p['background-color'] = C.land;
    else if (id === 'water') p['fill-color'] = C.water;
    else if (id === 'waterway') p['line-color'] = C.waterLine;
    else if (id.startsWith('landuse_residential')) p['fill-color'] = C.residential;
    else if (id.startsWith('landcover') || id.startsWith('landuse_park')) p['fill-color'] = C.park;
    else if (id === 'highway_motorway_casing' || id === 'highway_major_casing') p['line-color'] = C.majorCasing;
    else if (id.startsWith('highway_motorway')) p['line-color'] = C.motorway;
    else if (id.startsWith('highway_major')) p['line-color'] = C.major;
    else if (id.startsWith('highway') || id.startsWith('road')) {
      if (l.type === 'line') p['line-color'] = C.minor;
      if (l.type === 'fill') p['fill-color'] = C.minor;
    } else if (id.startsWith('railway')) p['line-color'] = C.rail;
    else if (id.startsWith('boundary')) p['line-color'] = C.boundary;
    else if (id.startsWith('aeroway')) {
      if (l.type === 'line') p['line-color'] = C.minor;
      if (l.type === 'fill') p['fill-color'] = C.residential;
    }
    if (l.type === 'symbol' && l.layout && l.layout['text-field']) {
      p['text-color'] = id === 'water_name' ? C.textWater : C.text;
      p['text-halo-color'] = C.halo;
      p['text-halo-width'] = 1.3;
      p['text-opacity'] = id.startsWith('highway_name') ? 0.62 : 0.78;
    }
  }

  // Buildings: dark bronze that warms with height, and grows out of the
  // ground as the camera comes down through zoom 14 to 15.6
  const labelIdx = style.layers.findIndex((l) => l.type === 'symbol');
  style.layers.splice(labelIdx, 0, {
    id: 'hm-buildings',
    type: 'fill-extrusion',
    source: 'openmaptiles',
    'source-layer': 'building',
    minzoom: 13.5,
    paint: {
      'fill-extrusion-color': ['interpolate', ['linear'], ['coalesce', ['get', 'render_height'], 0],
        0, '#1a1713', 8, '#272118', 20, '#3b3022', 45, '#584631', 120, '#7d6643'],
      'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'],
        14, 0, 15.6, ['*', 1.15, ['coalesce', ['get', 'render_height'], 6]]],
      'fill-extrusion-base': ['coalesce', ['get', 'render_min_height'], 0],
      'fill-extrusion-opacity': 0.94,
      'fill-extrusion-vertical-gradient': true,
    },
  });

  // A warm key light from the south west, and a dark horizon that swallows
  // the far city at a steep pitch
  style.light = { anchor: 'map', color: '#ffe6bf', intensity: 0.42, position: [1.25, 205, 40] };
  style.sky = {
    'sky-color': C.bg,
    'horizon-color': '#16241f',
    'fog-color': C.bg,
    'fog-ground-blend': 0.55,
    'horizon-fog-blend': 0.75,
    'sky-horizon-blend': 0.7,
    'atmosphere-blend': 0,
  };
}

/* ------------------------------------------------------------------ *
 * MakCare's building, found in the tiles and lit in gold
 * ------------------------------------------------------------------ */

function inRing(pt, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function polygons(geom) {
  if (geom.type === 'Polygon') return [geom.coordinates];
  if (geom.type === 'MultiPolygon') return geom.coordinates;
  return [];
}

function centroid(ring) {
  let x = 0, y = 0;
  for (const [a, b] of ring) { x += a; y += b; }
  return [x / ring.length, y / ring.length];
}

// The tiles often merge a whole block of buildings into one MultiPolygon,
// so the match is a single footprint, never the feature it came from. The
// address point can sit just outside its footprint, so the nearest one
// within about 45 metres also counts.
function findClinicBuilding() {
  const feats = map.querySourceFeatures('openmaptiles', { sourceLayer: 'building' });
  let best = null, bestD = Infinity;
  const kx = Math.cos((CLINIC[1] * Math.PI) / 180);
  for (const f of feats) {
    for (const poly of polygons(f.geometry)) {
      const hit = { geometry: { type: 'Polygon', coordinates: poly }, height: f.properties.render_height };
      if (inRing(CLINIC, poly[0])) return hit;
      const c = centroid(poly[0]);
      const d = Math.hypot((c[0] - CLINIC[0]) * kx, c[1] - CLINIC[1]) * 111320;
      if (d < bestD) { bestD = d; best = hit; }
    }
  }
  return bestD < 45 ? best : null;
}

function liftClinicBuilding() {
  const f = findClinicBuilding();
  if (!f) return false;
  const h = Math.max(7, (f.height || 6) * 1.15);
  map.addSource('hm-clinic', { type: 'geojson', data: { type: 'Feature', geometry: f.geometry, properties: {} } });
  map.addLayer({
    id: 'hm-clinic-glow',
    type: 'fill',
    source: 'hm-clinic',
    paint: { 'fill-color': C.gold, 'fill-opacity': 0.0 },
  }, 'hm-buildings');
  map.addLayer({
    id: 'hm-clinic',
    type: 'fill-extrusion',
    source: 'hm-clinic',
    paint: {
      'fill-extrusion-color': C.gold,
      'fill-extrusion-height': 0,
      'fill-extrusion-base': 0,
      'fill-extrusion-opacity': 0.96,
      'fill-extrusion-vertical-gradient': true,
    },
  });
  // Rises a little past its height and settles, like it is being presented
  const t0 = performance.now();
  const dur = reduced ? 0 : 1500;
  (function rise(now) {
    const p = dur ? Math.min((now - t0) / dur, 1) : 1;
    const e = 1 + 2.2 * Math.pow(p - 1, 3) + 1.2 * Math.pow(p - 1, 2);   // ease out with a soft overshoot
    map.setPaintProperty('hm-clinic', 'fill-extrusion-height', h * e);
    map.setPaintProperty('hm-clinic-glow', 'fill-opacity', 0.35 * p);
    if (p < 1) requestAnimationFrame(rise);
  })(t0);
  return true;
}

/* ------------------------------------------------------------------ *
 * Camera: fly in, then orbit
 * ------------------------------------------------------------------ */

const DEST = { center: CLINIC, zoom: 16.75, pitch: 62, bearing: -28, padding: { top: 30, bottom: 110, left: 0, right: 0 } };

let onScreen = false;
let orbiting = false;
let orbitFrame = 0;
let lastOrbit = 0;
let idleTimer = 0;

function orbitStep(now) {
  orbitFrame = 0;
  if (!orbiting || !onScreen) return;
  const dt = lastOrbit ? Math.min(now - lastOrbit, 64) : 16;
  lastOrbit = now;
  map.setBearing(map.getBearing() + dt * (360 / 210000));   // one turn every three and a half minutes
  orbitFrame = requestAnimationFrame(orbitStep);
}

function startOrbit() {
  if (reduced || orbiting) return;
  orbiting = true;
  lastOrbit = 0;
  if (onScreen && !orbitFrame) orbitFrame = requestAnimationFrame(orbitStep);
}

function stopOrbit() {
  orbiting = false;
  if (orbitFrame) cancelAnimationFrame(orbitFrame);
  orbitFrame = 0;
}

// A visitor who has handled the map has the camera. If they leave it alone
// for a while, it drifts back into its slow turn.
function handOver() {
  stopOrbit();
  clearTimeout(idleTimer);
  idleTimer = setTimeout(startOrbit, 14000);
}

let flown = false;
function flyIn() {
  if (flown) return;
  flown = true;
  if (reduced) {
    map.jumpTo(DEST);
    map.once('idle', liftWhenReady);
    return;
  }
  map.flyTo({ ...DEST, duration: 5600, curve: 1.55, essential: true });
  map.once('moveend', () => { liftWhenReady(); startOrbit(); });
}

function liftWhenReady() {
  if (map.getLayer('hm-clinic')) return;
  if (liftClinicBuilding()) return;
  // Tiles for the street may still be arriving
  let tries = 0;
  const retry = () => {
    if (map.getLayer('hm-clinic') || ++tries > 12) return;
    if (!liftClinicBuilding()) map.once('idle', retry);
  };
  map.once('idle', retry);
}

/* ------------------------------------------------------------------ *
 * The pin
 * ------------------------------------------------------------------ */

function pinElement() {
  const el = document.createElement('button');
  el.type = 'button';
  el.className = 'clinic-marker';
  el.setAttribute('aria-label', 'Directions to MakCare Health and Wellness Centre');
  el.innerHTML =
    '<span class="contact-map__pin" aria-hidden="true"><span></span>' +
    '<svg viewBox="0 0 24 24"><path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z"></path><circle cx="12" cy="10" r="2.25"></circle></svg></span>' +
    '<span class="clinic-marker__label">MakCare</span>';
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    if (driveHere) driveHere.click();
  });
  return el;
}

/* ------------------------------------------------------------------ *
 * Boot
 * ------------------------------------------------------------------ */

async function boot() {
  if (started) return;
  started = true;
  if (!webglAvailable()) return fallback('no WebGL');

  try {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = new URL('maplibre-gl.css', VENDOR).href;
    document.head.appendChild(css);

    const [lib, style] = await Promise.all([
      import(new URL('maplibre-gl.mjs', VENDOR).href),
      fetch(STYLE_URL).then((r) => { if (!r.ok) throw new Error('style ' + r.status); return r.json(); }),
    ]);
    lib.setWorkerUrl(new URL('maplibre-gl-worker.mjs', VENDOR).href);
    restyle(style);

    const holder = document.createElement('div');
    holder.className = 'contact-map__gl';
    frame.insertBefore(holder, frame.firstChild);
    section.classList.add('is-3d');

    map = new lib.Map({
      container: holder,
      style,
      center: [-79.33, 43.86],      // high over Markham and the north of the city
      zoom: 11.2,
      pitch: 0,
      bearing: 0,
      attributionControl: false,
      cooperativeGestures: true,
      maxPitch: 70,
      fadeDuration: 250,
      pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
    });
    map.addControl(new lib.AttributionControl({ compact: true }), 'top-right');
    new lib.Marker({ element: pinElement(), anchor: 'bottom' }).setLngLat(CLINIC).addTo(map);

    ['mousedown', 'touchstart', 'wheel', 'dragstart'].forEach((ev) => map.on(ev, handOver));

    map.on('error', (e) => {
      // A tile hiccup is survivable; a style that will not load is not
      if (!map.isStyleLoaded() && !section.classList.contains('is-3d-ready')) {
        map.remove();
        holder.remove();
        fallback(e && e.error ? e.error.message : 'map error');
      }
    });

    map.on('load', () => {
      section.classList.add('is-3d-ready');
      const attrib = holder.querySelector('.maplibregl-ctrl-attrib');
      if (attrib) attrib.classList.remove('maplibregl-compact-show');

      // Fly in once most of the map is in view; orbit only while visible
      new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen && entry.intersectionRatio > 0.45) flyIn();
        if (onScreen && orbiting && !orbitFrame) orbitFrame = requestAnimationFrame(orbitStep);
      }, { threshold: [0, 0.45, 0.8] }).observe(frame);
    });
  } catch (err) {
    fallback(err && err.message ? err.message : String(err));
  }
}

function prepare() {
  if (!section || !frame || !phone.matches || started) return;
  new IntersectionObserver((entries, obs) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    obs.disconnect();
    boot();
  }, { rootMargin: '600px 0px' }).observe(section);
}

prepare();
if (phone.addEventListener) phone.addEventListener('change', prepare);
