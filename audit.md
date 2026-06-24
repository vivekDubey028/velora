# Velora Website — Full Production Audit
**Date:** 2026-06-24  
**Auditor:** Senior Fullstack Review  
**Verdict:** ❌ NOT PRODUCTION READY

---

## Executive Summary

The site has a polished visual design and solid component architecture, but it has **critical blockers** that prevent a production launch: a 68.7 MB video, dozens of unoptimised images totalling ~60 MB, a non-functional contact form with no backend, widespread placeholder content, wrong meta tags, missing routes, and broken navigation links. These issues must all be resolved before going live.

---

## 1. CRITICAL BLOCKERS

These issues will break user experience or misrepresent the business in production.

### 1.1 Contact Form Has No Backend
**File:** `src/components/contact/ContactForm.tsx` — `handleSubmit` (line 36–39)

The form sets `submitted = true` locally but **never sends data anywhere**. No `fetch`, no API call, no email service, nothing. Users will think they've submitted a request, but no data is captured.

**Fix:** Integrate a backend endpoint (Node/Express, Supabase edge function, Formspree, EmailJS, etc.) and handle loading/error states.

---

### 1.2 Placeholder / Dummy Content Still in Production Code

Multiple sections contain obviously incomplete content:

| Location | Issue |
|---|---|
| `src/components/home/insights.tsx` | Author "Jhon Doe", fake education articles — wrong for a chemicals company |
| `src/components/common/footer.tsx` | All footer links point to `href="#"` — dead links |
| `src/components/home/gallery.tsx` | Gallery is four empty grey boxes — no images |
| `src/components/contact/ContactForm.tsx` | Phone shows `+91 98573 XXXXX` (masked placeholder) |
| `src/components/contact/ContactForm.tsx` (line 284) | Maps link goes to `https://maps.google.com` with no address |
| `src/pages/ProductDetail.tsx` (line 379) | CTA banner image is an external Unsplash URL — breaks if Unsplash is down |
| `src/components/common/certifications.tsx` (lines 118–121) | "GET YOUR QUOTE NOW" and "DOWNLOAD BROCHURE" buttons have no `href` or handler |
| `src/pages/ProductDetail.tsx` (line 369) | "Consult us Now" button has no action |
| `src/pages/export` — multiple components | Need to verify content is finalised |

---

### 1.3 Navbar Links Point to Non-Existent Sections
**File:** `src/components/common/navbar.tsx` (lines 358–359)

```
{ href: '/#careers', label: 'Careers' }
{ href: '/#resources', label: 'Resources' }
```

There are no `#careers` or `#resources` anchor sections anywhere on the Home page. Clicking these links will scroll to the top of the page and do nothing.

**Fix:** Either create those sections or remove the links.

---

### 1.4 Wrong / Misleading Meta Tags
**File:** `index.html` (lines 7, 15)

```html
<meta name="description" content="Velora Technologies - The next evolution of digital design and high-tech digital experiences." />
<title>Velora | High-Tech Digital Design</title>
```

This is a **chemical supply company**, not a digital design firm. These meta tags will confuse search engines, harm SEO, and look unprofessional in search results and social shares.

**Fix:** Update to describe the actual business — e.g., "Velora Chemicals — Industrial & Specialty Chemical Supply."

---

### 1.5 No 404 / Catch-All Route
**File:** `src/App.tsx` (lines 131–139)

There is no `<Route path="*">` fallback. Any URL typo or deep link will render a blank page instead of a proper 404.

**Fix:**
```tsx
<Route path="*" element={<NotFound />} />
```

---

## 2. PERFORMANCE — ASSET BLOAT (CRITICAL)

This is the single largest technical problem. The site is shipping raw, uncompressed assets that will cause extremely long load times, especially on mobile.

### 2.1 Hero Video: 68.7 MB
**File:** `src/assets/videos/loghero.mp4`

A 68.7 MB autoplay video is loaded on the Logistics page. On a typical mobile connection (10 Mbps), this takes **~55 seconds to fully load**. The browser will stream it, but it will cause buffering, drain data plans, and may block other resources.

**Required actions:**
- Re-encode to `H.265/HEVC` or `VP9/AV1` targeting **5–10 MB maximum**
- Use `<source>` with multiple formats (AV1 + WebM fallback)
- Add `preload="none"` and use a static poster image until user interaction
- Consider replacing with a compressed WebP/AVIF image on mobile via `<picture>`

```html
<!-- Example -->
<video autoPlay loop muted playsInline poster="/poster.webp" preload="none">
  <source src="loghero.av1.mp4" type="video/mp4; codecs=av01" />
  <source src="loghero.webm" type="video/webm" />
</video>
```

---

### 2.2 Images — Total Unoptimised Weight: ~60 MB

No images are in WebP or AVIF format. All are raw JPEGs or PNGs at full resolution with no compression.

| File | Current Size | Target (WebP) | Savings |
|---|---|---|---|
| `logistics/log1.jpg` | 7.96 MB | ~400 KB | ~95% |
| `assets/hero3.jpg` | 6.67 MB | ~300 KB | ~96% |
| `logistics/logbuild4.jpg` | 4.75 MB | ~250 KB | ~95% |
| `assets/hero2.jpg` | 4.21 MB | ~220 KB | ~95% |
| `logistics/logbuild3.jpg` | 3.79 MB | ~200 KB | ~95% |
| `logistics/log5.jpg` | 3.74 MB | ~180 KB | ~95% |
| `logistics/logbuild2.jpg` | 3.25 MB | ~160 KB | ~95% |
| `sustainability/sus_hero_bg.png` | 3.06 MB | ~150 KB | ~95% |
| `logistics/logbuild1.jpg` | 2.91 MB | ~150 KB | ~95% |
| `logistics/log2.jpg` | 2.43 MB | ~120 KB | ~95% |
| `sustainability/suscore.jpg` | 2.19 MB | ~100 KB | ~95% |
| `sustainability/sus2.jpg` | 2.09 MB | ~100 KB | ~95% |
| `logistics/log4.jpg` | 1.84 MB | ~90 KB | ~95% |
| `logistics/log3.jpg` | 1.80 MB | ~90 KB | ~95% |
| `logistics/logbuildbg.jpg` | 1.56 MB | ~80 KB | ~95% |
| `assets/preherovelora.png` | 1.76 MB | ~100 KB | ~94% |
| `sustainability/sus3.jpg` | 1.27 MB | ~60 KB | ~95% |
| `assets/hero1.jpg` | 1.21 MB | ~60 KB | ~95% |
| `assets/ceb42c...png` | 1.21 MB | ~60 KB | ~95% |
| `assets/contact_office.png` | 0.90 MB | ~45 KB | ~95% |
| `sustainability/sus1.png` | 0.90 MB | ~45 KB | ~95% |
| `assets/about_hero_chemistry.png` | 0.87 MB | ~45 KB | ~95% |
| `public/images/hero.png` | 0.98 MB | ~50 KB | ~95% |
| `public/images/about.png` | 0.77 MB | ~40 KB | ~95% |
| `public/images/ceo.png` | 0.66 MB | ~35 KB | ~95% |

**Total current image weight:** ~62 MB  
**Estimated optimised weight:** ~3–4 MB (**~95% reduction**)

**Required actions for every image:**
1. Convert to **WebP** (primary) with **AVIF** fallback where possible
2. Resize to the actual display dimensions (never serve a 6000×4000px image for a 1200px slot)
3. Use `<picture>` or `srcset` for responsive images
4. Add `loading="lazy"` to all images not in the initial viewport
5. Add explicit `width` and `height` attributes to prevent Cumulative Layout Shift (CLS)

```tsx
// Example pattern to adopt
<picture>
  <source srcSet="image.avif" type="image/avif" />
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" width="1200" height="800" loading="lazy" alt="..." />
</picture>
```

**Recommended tooling:**
- `vite-plugin-image-optimizer` or `vite-imagetools` — auto-converts and resizes at build time
- `sharp` CLI for batch conversion during asset pipeline

---

### 2.3 Hero Images — All Loaded Simultaneously (No Lazy Loading)
**Files:** `src/components/home/prehero.tsx` (line 67–76), `src/components/home/hero.tsx` (line 33–41)

The hero carousel renders all background images (`heroImg`, `hero1`, `hero2`, `hero3`) in the DOM at once, only toggling opacity. All 4 images download immediately on page load.

**Fix:** Only load the first image eagerly; lazy-load the rest, or use dynamic `src` swapping.

---

### 2.4 Google Fonts Loaded Twice
**Files:** `index.html` (lines 10–13) AND `src/index.css` (lines 1–2)

Google Fonts are loaded with `<link preload>` + `<link stylesheet>` in `index.html`, AND again via `@import url(...)` in `index.css`. This causes duplicate network requests for the same font files.

**Fix:** Remove the `@import` rules from `index.css` and keep only the `index.html` `<link>` tags (or vice versa).

---

### 2.5 LiberationSans Served as TTF (Not WOFF2)
**File:** `src/assets/fonts/LiberationSans-Regular.ttf`

TTF is an uncompressed font format. WOFF2 provides ~30–40% smaller file size with identical visual quality and is supported by all modern browsers.

**Fix:** Convert `LiberationSans-Regular.ttf` to `LiberationSans-Regular.woff2` using `fonttools` or an online converter, then update the `@font-face` declaration in `index.css`.

---

### 2.6 Three.js Molecule Viewer Runs Continuous RAF Loop When Off-Screen
**File:** `src/components/3d/Molecule3D.tsx` (lines 312–325)

The WebGL animation loop runs permanently (`requestAnimationFrame` keeps firing) regardless of whether the molecule viewer is visible in the viewport. On a product listing page with multiple molecules, this wastes significant GPU and CPU.

**Fix:** Wrap animation in an `IntersectionObserver` — pause the RAF loop when the canvas leaves the viewport, resume when it re-enters.

---

### 2.7 No Vite Build Optimisations Configured
**File:** `vite.config.ts`

The Vite config is the bare minimum (only `react()` + `tailwindcss()`). Missing:
- No `build.rollupOptions` for chunk splitting (Three.js is ~600 KB — should be a separate lazy chunk)
- No image optimisation plugin
- No `build.sourcemap: false` for production
- No compression plugin (gzip/brotli pre-compression)

**Recommended additions:**
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          framer: ['framer-motion'],
          router: ['react-router-dom'],
        },
      },
    },
  },
})
```

---

## 3. SEO & DISCOVERABILITY

### 3.1 Single Meta Description for All Pages
Every page (Home, About, Products, Logistics, etc.) shares the same wrong `<meta name="description">` from `index.html`. Google reads unique descriptions per page.

**Fix:** Use React Helmet or a `<title>` + `<meta>` component pattern to set unique titles and descriptions per route.

### 3.2 No Open Graph / Twitter Card Tags
No `og:title`, `og:description`, `og:image`, `twitter:card` etc. Social media shares will show blank cards.

### 3.3 No `robots.txt` or `sitemap.xml`
No files in `/public` for robots or sitemap. Search engines will index the site but with no guidance.

### 3.4 No Canonical URLs
No `<link rel="canonical">` tags. If the site is accessible on multiple domains/subdomains, duplicate content penalties apply.

---

## 4. CODE QUALITY & CORRECTNESS

### 4.1 `window.innerWidth` Read Synchronously During Render
**File:** `src/components/about/abouthero.tsx` (lines 43–46)

```tsx
left: `${window.innerWidth < 768 ? 0 : insetH / 2}px`,
```

`window.innerWidth` is accessed directly inside the JSX style calculation (not in a `useEffect` or `useState`). This runs every render but does **not** react to window resize events — so the mobile/desktop layout decision is made once at mount and then frozen, even if the user resizes their browser.

**Fix:** Store `window.innerWidth < 768` in a `useState` updated by a `resize` event listener.

### 4.2 Unused `Hero` Component
**File:** `src/components/home/hero.tsx`

This component (`Hero`) imports `Navbar` and duplicates the app's globally-mounted `Navbar`. It is **not imported anywhere in the current routing** — `Home.tsx` uses `PreHero` instead. It should be deleted to avoid confusion.

### 4.3 `next-themes` Dependency Is Unused / Wrong Package
**File:** `package.json` (line 21)

`next-themes` is a library designed specifically for **Next.js** apps. This project uses Vite + React. The package provides no functionality here and adds unnecessary bundle weight.

**Fix:** Remove from `package.json`.

### 4.4 React Router Type Mismatch
**File:** `package.json` (line 33)

```json
"@types/react-router-dom": "^5.3.3"
```

The project uses `react-router-dom` v7 (line 23: `"react-router-dom": "^7.14.0"`) but the type definitions are for v5. These are incompatible and will suppress correct TypeScript errors.

**Fix:** Remove `@types/react-router-dom` entirely — RRD v7 ships its own types.

### 4.5 CSS Variables Defined Twice
**File:** `src/index.css`

The same custom properties (`--brand`, `--accent`, `--bg-navy`, etc.) are defined in both `:root {}` (lines 37–59) and `@theme {}` (lines 13–35). The `@theme` block is a Tailwind v4 feature; the `:root` block is for native CSS access. Both are needed for their respective use cases, but they are out of sync — updating one requires updating the other manually. Document this clearly or generate both from a single source.

### 4.6 `"use client"` Directives Have No Effect
**Files:** `src/components/common/footer.tsx`, `src/components/common/certifications.tsx`, `src/components/home/gallery.tsx`, and others

`"use client"` is a **Next.js 13+ App Router** directive. In a Vite/React project it is treated as an ordinary string expression with **no effect whatsoever**. It indicates these components were originally written for or copied from a Next.js project.

**Fix:** Remove all `"use client"` strings from the codebase.

### 4.7 Lenis RAF Loop Not Fully Cleaned Up
**File:** `src/App.tsx` (lines 88–100)

```tsx
function raf(time: number) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
```

The `requestAnimationFrame` loop is not cancelled on cleanup. `lenis.destroy()` is called, but the RAF loop itself keeps scheduling — it just stops doing anything useful. Over time this is a minor memory/performance leak.

**Fix:**
```tsx
let rafId: number;
function raf(time: number) {
  lenis.raf(time);
  rafId = requestAnimationFrame(raf);
}
rafId = requestAnimationFrame(raf);

return () => {
  cancelAnimationFrame(rafId);
  lenis.destroy();
};
```

### 4.8 Unthrottled Scroll Listeners
**Files:** `src/components/home/prehero.tsx`, `src/components/about/abouthero.tsx`, `src/components/sustainability/sushero.tsx`, `src/App.tsx`

Multiple components attach `scroll` event listeners directly. At 60fps scrolling, these fire ~60 times/sec and trigger `setState` on each call. This can cause jank on lower-powered devices.

`sushero.tsx` uses `{ passive: true }` (correct), but the others do not.

**Fix:** Add `{ passive: true }` to all scroll listeners; consider wrapping state updates in `requestAnimationFrame` or throttling with a flag variable.

---

## 5. ACCESSIBILITY

### 5.1 Images Without Meaningful Alt Text
- `prehero.tsx` (line 72): `alt="Chemical Solutions 1"` etc. — generic
- `hero.tsx` (line 36): Same pattern — `alt="Chemical Solutions 1"`
- `navbar.tsx` (line 119): `arrowImg` with `alt=""` — invisible to screen readers (intentional if decorative, correct approach)
- Several `<img>` tags in hero components have alt text that could be more descriptive

### 5.2 Search Input Has No Accessible Label
**File:** `src/components/common/navbar.tsx` (line 520–526)

The search `<input>` has a `placeholder` but no associated `<label>` or `aria-label`. Screen readers will announce it as an unlabelled input.

**Fix:** Add `aria-label="Search Velora"` to the input.

### 5.3 Non-Functional Buttons Lack `disabled` State or Warning
Buttons like "Explore Products" (hero CTA) are not linked to anything — they look active but do nothing on click. Users have no feedback.

---

## 6. SECURITY

### 6.1 External Image Domain with No Fallback
**File:** `src/pages/ProductDetail.tsx` (line 379)

```tsx
src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80"
```

Hard-coded external URL creates a runtime dependency on Unsplash's CDN. If that URL changes, the image is silently broken. Also — using a stock photo in a production chemical company site may violate Unsplash's commercial licensing terms for some plans.

**Fix:** Download and self-host the image.

### 6.2 No Content Security Policy (CSP)
No CSP headers or `<meta http-equiv="Content-Security-Policy">` defined. External font and image domains are loaded with no restrictions.

### 6.3 `rel="noopener noreferrer"` Missing on Some External Links
The Maps link in `ContactForm.tsx` has it (correct). Audit all remaining `target="_blank"` links in the export and other pages to ensure they all include `rel="noopener noreferrer"`.

---

## 7. INFRASTRUCTURE / DEPLOYMENT READINESS

| Item | Status |
|---|---|
| `.gitignore` | ✅ Present |
| `robots.txt` | ❌ Missing |
| `sitemap.xml` | ❌ Missing |
| `404` route | ❌ Missing |
| Error boundaries | ❌ None in app |
| Environment variables | ❌ No `.env.example`, no API keys configured |
| CI/CD pipeline | ❌ No config present |
| Analytics | ❌ No tracking (GA, Plausible, etc.) |
| Cookie/privacy banner | ❌ Missing (required for EU/GDPR compliance) |
| HTTPS redirect | ⚠️ Depends on hosting config — not in code |
| Cache headers | ⚠️ Depends on hosting — Vite generates hashed filenames (good) |

---

## 8. SUMMARY TABLE

| Category | Severity | Count |
|---|---|---|
| Non-functional contact form | CRITICAL | 1 |
| Placeholder / dummy content | CRITICAL | 8+ instances |
| Broken navigation links | CRITICAL | 2+ |
| Wrong meta tags | CRITICAL | 2 |
| Missing 404 route | CRITICAL | 1 |
| Video (68.7 MB) | CRITICAL | 1 |
| Unoptimised images (~60 MB total) | HIGH | 25+ files |
| No lazy loading | HIGH | All hero images |
| Google Fonts loaded twice | HIGH | 1 |
| Font in TTF instead of WOFF2 | MEDIUM | 1 |
| Three.js constant RAF loop | MEDIUM | 1 |
| No Vite build optimisation | MEDIUM | 1 |
| No per-page SEO meta | MEDIUM | All pages |
| No OG/Twitter tags | MEDIUM | 1 |
| Wrong RRD type definitions | MEDIUM | 1 |
| `next-themes` wrong package | LOW | 1 |
| `"use client"` dead directives | LOW | 4+ files |
| CSS variables defined twice | LOW | 1 |
| Accessibility issues | MEDIUM | 3+ |
| Missing `robots.txt` / `sitemap.xml` | MEDIUM | 2 |
| No error boundaries | MEDIUM | 1 |
| No analytics | LOW | 1 |
| No GDPR/cookie consent | MEDIUM | 1 |

---

## 9. RECOMMENDED ORDER OF FIXES

1. **Replace all placeholder content** — insights, footer links, gallery images, phone number, map link, button actions
2. **Fix meta tags** — correct `<title>` and `<meta description>` for the business
3. **Wire up the contact form** — integrate a backend or email service
4. **Add 404 route** — one line in App.tsx
5. **Fix broken navbar links** (`#careers`, `#resources`)
6. **Compress the hero video** — target under 8 MB; add a poster image
7. **Convert all images to WebP/AVIF** — use `vite-imagetools` or batch-process with `sharp`
8. **Add `loading="lazy"` and `width`/`height`** to all `<img>` tags
9. **Fix duplicate Google Fonts loading** — remove `@import` from CSS
10. **Convert LiberationSans to WOFF2**
11. **Wrap Three.js RAF in IntersectionObserver**
12. **Add Vite chunk splitting** for Three.js and Framer Motion
13. **Add per-page titles and descriptions** — use React Helmet Async
14. **Add OG/Twitter meta tags**
15. **Add `robots.txt` and `sitemap.xml`** to `/public`
16. **Fix `window.innerWidth` in `abouthero.tsx`** — move to useState + resize listener
17. **Fix Lenis RAF cleanup** in App.tsx
18. **Add `{ passive: true }` to scroll listeners** in PreHero/AboutHero/SusHero
19. **Remove `next-themes`**, `"use client"` directives, and fix RRD type version
20. **Self-host the Unsplash image** in ProductDetail
21. **Add error boundaries** around route components
22. **Add analytics and cookie consent banner**

---

*End of audit.*
