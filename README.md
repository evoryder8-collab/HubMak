# hubertmak.com

A cinematic multilingual site for **Hubert Mak**, Registered Massage Therapist, Manual Osteopath, and Overall Winner of the International Division at the Euro Massage Championship 2026 in Paris.

No framework, no bundler, no build step. Plain HTML, CSS, JavaScript, and SVG, so GitHub Pages serves the repository exactly as it sits.

---

## Launch details

| What | Current value |
| --- | --- |
| Public email | `healing@hubertmak.com` |
| Website form destination | `info@makcare.com` |
| Telephone | `+1 905-609-1238` |
| MakCare booking | `https://www.makcare.com/Services.php` |
| Laval result | Second place, Sports Category |
| Domain | `hubertmak.com`, live on GitHub Pages with HTTPS |

---

## The journey

| | Chapter | What happens |
| --- | --- | --- |
| | **Language portal** | The medal portrait, aura, and nine framed flags form a single opening composition. Browser language is preselected and a quiet four second invitation can enter automatically |
| | **Transition** | Fluid fabric panels close around a bright central seam, then open into the chosen language while the portrait carries through |
| | **Hero** | The Team Canada cutout stands between an oversized name, live proof points, orbital light, and a direct opening statement |
| 01 | **Film** | The section pins. The reel opens from a horizontal slit into a full vertical frame, muted until asked |
| 02 | **The Work** | The Thai stretch portrait holds position while four short, practical parts of the story scroll past it |
| 03 | **Honors** | Event campaigns and medal details build toward the full celebration portrait |
| 04 | **Moments** | Ten photographs travel sideways as you scroll down. Click any frame for the translated lightbox |
| | **Philosophy** | The quote with a slow light sweep across the letters |
| 05 | **Contact** | A photographic band fades in behind the heading and out again before the form |

A chapter rail on the left tracks where you are and dims itself while the filmstrip is crossing the screen. A continuous gold journey line and proof band connect the chapters visually.

---

## Structure

```
index.html              language portal, metadata, and alternate-language links
site.html               the main experience, selected with ?lang=en and equivalent codes
robots.txt              crawl access and the public sitemap location
sitemap.xml             canonical pages, language versions, images, and the reel video
css/
  base.css              tokens, reset, type scale, grain, cursor, overture, rail, nav, footer
  layout.css            every chapter, plus the lightbox
  animations.css        keyframes, reveals, kinetic type, reduced motion
  portal.css            portal composition, flags, countdown, and fluid entry panels
  experience.css        new hero, section continuity, campaign cards, and responsive polish
js/
  script.js             overture, reveals, one scroll loop, film, lightbox, cursor, form, WebGL
  gate.js               language detection, countdown, cancellation, memory, and entry transition
  i18n.js               all visible copy for nine language versions
assets/
  favicon.svg
  flags.svg             consistently shaped SVG flag sprite
  img/                  photography and transparent cutouts, .webp
  video/                reel.mp4 and its poster frame
.nojekyll               tells Pages to serve the files untouched
CNAME.example           rename to CNAME when the domain is ready
```

### How the motion is wired

One `requestAnimationFrame` loop writes a single `--p` custom property per pinned section, and CSS does the rest. That keeps the scroll-linked work in one place and makes each effect a one line calculation.

- **Pinned sections** are `position: sticky` inside a taller parent. Progress is `-rect.top / (height - viewport)`.
- **The filmstrip** measures its travel from the last frame's offset, not `scrollWidth`, so the trailing gutter matches the leading one exactly.
- **Text reveals** use IntersectionObserver with a staggered delay per consecutive sibling.
- **Slow image parallax** uses native `animation-timeline: view()` where the browser supports it, and simply does not run where it does not. Nothing depends on it.
- **`prefers-reduced-motion`** removes the overture, the cursor, the pinning, the parallax, and every reveal. The page renders fully visible and scrolls normally.
- **Touch and narrow screens** get a snapping horizontal carousel instead of the pinned filmstrip.

### How the language gate works

- The portal detects `navigator.languages`, including separate Cantonese and Mandarin matching, and falls back to English.
- The selected flag has a visible four second countdown. Pointer movement, tap, key press, wheel, touch, or scroll cancels it for the rest of that browser session.
- Choosing a language stores `hm_language` in local storage. Returning visitors go straight to `site.html` in that language.
- The language pill in the main navigation returns to `index.html?choose=1`, which deliberately shows the portal again.
- With `prefers-reduced-motion: reduce`, the composition stays still and automatic entry is disabled. The visitor chooses manually.
- The version codes are `en`, `fr`, `yue`, `zh`, `ja`, `de`, `es`, `pt`, and `ru`. Canonical URLs, document language, and `hreflang` alternates update for each one.

---

## Running it locally

Any static server works. From the repository root:

```bash
python3 -m http.server 4321
```

Then open `http://localhost:4321`. To inspect the portal again after making a choice, use `http://localhost:4321/index.html?choose=1`. Opening the files directly mostly works, but the video will not stream properly without a server.

---

## Deploying to GitHub Pages

The repository is wired to `evoryder8-collab/HubMak`.

```bash
git add -A && git commit -m "Update site" && git push
```

To turn Pages on the first time: **Settings** then **Pages**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`, **Save**. Every push to `main` republishes.

---

## Google indexing and SEO maintenance

The repository includes self-referencing canonicals, reciprocal `hreflang` links for all nine language URLs, crawl directives, an XML sitemap, image and video discovery data, social preview metadata, and Schema.org data for Hubert, MakCare, the clinic address, awards, images, and reel.

After any material content or media update:

1. Change the affected `<lastmod>` dates in `sitemap.xml` to the real update date.
2. Keep every sitemap URL aligned with its canonical URL.
3. Check that `https://hubertmak.com/robots.txt` and `https://hubertmak.com/sitemap.xml` still return successfully after deployment.
4. In Google Search Console, use a Domain property for `hubertmak.com`, submit `https://hubertmak.com/sitemap.xml`, and inspect the root and English URLs after major releases.

Search Console submission is the discovery request. It is not a guarantee of ranking or immediate inclusion. Rankings still depend on useful content, reputation, links, local relevance, and competition.

## Custom domain, hubertmak.com

The custom domain is already connected. The root `CNAME` file must remain in the repository, and GitHub Pages should keep **Enforce HTTPS** enabled. The apex DNS records point to GitHub Pages, while the existing Infomaniak mail records remain separate.

---

## Working with the photography

Everything lives in `assets/img/` as `.webp`. Two kinds:

- **`craft-*` and `finale-*`** are ordinary photographs, used with `object-fit: cover` inside frames.
- **`hero-celebration`, `portrait-craft`, `moment-medal`** are transparent cutouts, placed on a CSS built stage: an elliptical pool of light behind and a soft shadow beneath.

### Adding a frame to the filmstrip

Drop the file in `assets/img/`, then add one block inside `.strip__track` in `site.html`:

```html
<figure class="plate"><button class="plate__hit" type="button" data-cursor="View"
        data-full="assets/img/your-photo.webp" data-caption="A short line.">
  <img src="assets/img/your-photo.webp" width="1200" height="1500" loading="lazy" decoding="async"
       alt="Describe the photo">
</button><figcaption><i>11</i> A short line.</figcaption></figure>
```

Set `width` and `height` to the real pixel size. The counter and the lightbox pick the new frame up on their own, and the pin lengthens to fit. Portrait crops around 4:5 sit best.

### Never combine a mask and a filter on one element

WebKit applies `filter: drop-shadow()` to the element box rather than the alpha
silhouette when the same element also carries a `mask-image`. On a cutout that
paints a hard rectangle around the subject, which is very visible on a dark
page and looks like the transparency has been lost. Keep them on separate
elements. The `.cut` component does this: the aura, the floor light, the image,
and the dissolve scrim are four siblings, and only the image takes a filter.

### Preparing a cutout

A cutout with transparent margins floats small inside its frame, and an invisible feathered halo on one side will push the subject visibly off centre. Trim to the alpha bounding box using a **visibility threshold**, not `alpha > 0`:

```python
from PIL import Image
import numpy as np
im = Image.open("in.webp").convert("RGBA")
a = np.array(im.split()[3])
ys, xs = np.where(a > 24)                      # 24, not 0
im.crop((xs.min(), ys.min(), xs.max()+1, ys.max()+1)).save("out.webp", "WEBP", quality=84, method=6)
```

### Replacing the film

Put a new `reel.mp4` in `assets/video/` and a matching first frame at `reel-poster.webp`. Vertical, H.264, ideally under 20 MB. The current file was made with:

```bash
ffmpeg -i source.mp4 -vf "scale=720:1280:flags=lanczos" -c:v libx264 -preset slow -crf 26 \
  -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart reel.mp4
```

HEVC will not play in Chrome or Firefox, so always transcode to H.264 even if the source already is an mp4.

---

## The contact form

Static hosting has no mail server, so submitting opens a prefilled message to `info@makcare.com` in the visitor's mail app. The public contact email shown on the site is `healing@hubertmak.com`.

For a form that arrives as email instead, create one at a service such as Formspree and change the `<form>` tag to:

```html
<form class="form" id="contact-form" action="https://formspree.io/f/YOUR_ID" method="POST" data-reveal>
```

Then delete the `form.addEventListener('submit', ...)` block in `js/script.js` so the browser posts normally.
