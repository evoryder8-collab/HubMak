# hubertmak.com

A single page cinematic site for **Hubert Mak**, Registered Massage Therapist, Manual Osteopath, and Overall Winner of the International Division at the Euro Massage Championship 2026 in Paris.

No framework, no bundler, no build step. Plain HTML, CSS, and one JavaScript file, so GitHub Pages can serve the repository exactly as it sits.

---

## Before launch

Four values still point at placeholders. Search for them and swap in the real ones.

| What | Where | Current placeholder |
| --- | --- | --- |
| Email address | `index.html` contact links, and `CONTACT_EMAIL` in `js/script.js` | `hello@hubertmak.com` |
| Instagram | `index.html`, contact links | `https://www.instagram.com/` |
| MakCare booking | `index.html`, contact links | `https://www.makcare.ca/` |
| Domain | `CNAME.example`, see custom domain below | `hubertmak.com` |

---

## Structure

```
index.html              the whole page, one document
css/
  base.css              design tokens, reset, type, grain, cursor, curtain, nav, footer
  layout.css            every section, plus the lightbox
  animations.css        keyframes, scroll reveals, kinetic type, reduced motion
js/
  script.js             curtain, reveals, reel, lightbox, cursor, form, WebGL ambient
assets/
  favicon.svg
  img/                  transparent cutouts, .webp
  video/                reel.mp4 and its poster frame
.nojekyll               tells Pages to serve the files untouched
CNAME.example           rename to CNAME when the domain is ready
```

### Sections in order

1. Opening curtain, two panels sliding apart over the breathing gradient
2. Hero, the Team Canada celebration cutout with the name in kinetic serif
3. Reel, the vertical film rising into a glowing frame, muted until asked
4. About, the autobiography in staggered paragraphs beside the Thai stretch portrait
5. Titles and Honors, four glass placards
6. Gallery, an asymmetric bento grid with a lightbox
7. Philosophy, the quote as a title card
8. Contact, form plus three direct links
9. Footer

---

## Running it locally

Any static server works. From the repository root:

```bash
python3 -m http.server 4321
```

Then open `http://localhost:4321`. Opening `index.html` straight from the file system mostly works, but the video will not stream properly without a server.

---

## Deploying to GitHub Pages

The repository is already wired to `evoryder8-collab/HubMak`.

```bash
git add -A && git commit -m "Update site" && git push
```

To turn Pages on the first time:

1. Repository **Settings** then **Pages**
2. Under **Build and deployment**, set **Source** to `Deploy from a branch`
3. Branch `main`, folder `/ (root)`, then **Save**

The site appears at `https://evoryder8-collab.github.io/HubMak/` within a minute or two. Every push to `main` republishes automatically.

---

## Custom domain, hubertmak.com

Do this only once the DNS records are in place. Adding the domain first will make the `github.io` preview redirect to a domain that does not resolve yet.

**1. DNS at the registrar**

Four `A` records on the apex, all with host `@`:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

And one `CNAME` for the `www` subdomain:

```
www   ->   evoryder8-collab.github.io
```

**2. Tell the repository**

```bash
git mv CNAME.example CNAME
git commit -m "Point at hubertmak.com" && git push
```

Or type `hubertmak.com` into Settings, Pages, Custom domain, which writes the same file.

**3. Wait, then tick Enforce HTTPS**

DNS takes anywhere from a few minutes to a day. Once GitHub reports the domain as verified, tick **Enforce HTTPS** in Settings, Pages.

---

## Swapping in new photography

Drop a `.webp` into `assets/img/`, then add one block to the `.bento` grid in `index.html`:

```html
<figure class="bento__item bento__item--tall" data-reveal data-parallax="0.06">
  <button class="bento__open" type="button"
          data-full="assets/img/your-photo.webp"
          data-caption="A short line.">
    <img src="assets/img/your-photo.webp" width="1440" height="1800"
         loading="lazy" decoding="async" alt="Describe the photo">
  </button>
  <figcaption>A short line.</figcaption>
</figure>
```

Use `bento__item--tall` for a portrait crop, `bento__item--wide` for a landscape one, and no modifier for something in between. Set `width` and `height` to the file's real pixel size so the page does not shift while loading.

Photos with a transparent background sit best here. If a cutout has empty space around it, trim it to its alpha bounding box first, otherwise it will float small inside its frame.

### Replacing the film

Put a new `reel.mp4` in `assets/video/` and a matching first frame at `reel-poster.webp`. Vertical, H.264, and ideally under 20 MB. The current file was made with:

```bash
ffmpeg -i source.mp4 -vf "scale=720:1280:flags=lanczos" -c:v libx264 -preset slow -crf 26 \
  -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart reel.mp4
```

---

## The contact form

Static hosting has no mail server, so submitting opens a prefilled message in the visitor's mail app. That works everywhere and needs no account.

For a form that arrives as an email instead, create a form at a service such as Formspree and change the `<form>` tag in `index.html` to:

```html
<form class="form" id="contact-form" action="https://formspree.io/f/YOUR_ID" method="POST" data-reveal>
```

Then delete the `form.addEventListener('submit', ...)` block in `js/script.js` so the browser posts normally.

---

## Notes on how it behaves

- **Motion** runs on CSS `animation-timeline: view()` where the browser supports it, and falls back to IntersectionObserver everywhere else. Both paths are tested.
- **Reduced motion** is respected. The curtain, the cursor, the grain drift, the parallax, and every reveal switch off, and the page renders fully visible.
- **The film** carries `preload="none"` and only loads once it scrolls into view, so it costs nothing on first paint.
- **The ambient background** is a small WebGL shader over a CSS gradient. If WebGL is unavailable the gradient simply carries on alone.
- **The custom cursor** appears on fine pointers only and stays hidden until the mouse first moves.
