# Velora Chemicals — Image Placement & Type Guide

This guide maps every image slot on the website to the ideal image type, recommended dimensions, mood, and format. Replace all placeholder/Unsplash images with owned or licensed assets before launch.

---

## Format Rules (Apply Everywhere)

| Rule | Detail |
|---|---|
| **Primary format** | WebP (convert all JPEG/PNG originals) |
| **Fallback format** | AVIF for hero images, JPEG for thumbnails |
| **Max hero image size** | 300–500 KB (WebP) |
| **Max thumbnail size** | 60–120 KB (WebP) |
| **Always add** | `width`, `height`, `loading="lazy"` (except above-fold images: use `loading="eager"`) |
| **Responsive** | Wrap in `<picture>` with `srcset` at 640 / 1024 / 1440px breakpoints |

---

## 1. Homepage (`/`)

### 1.1 Pre-Hero Background Images (above-fold — 3 images in carousel)
- **Files:** `src/assets/preherovelora.png`, `src/assets/hero1.jpg`, `src/assets/hero2.jpg`
- **Type:** Wide-angle industrial photography — chemical plants, refineries, or laboratory interiors with dramatic lighting
- **Mood:** Dark, cinematic, high-contrast — navy or teal tones complement brand colors
- **Dimensions:** 1920 × 1080 px (16:9) — serve at max 1440px wide
- **Format:** WebP, `loading="eager"` for the first image only, lazy for the rest
- **DO NOT** use: Generic stock city skylines, abstract gradients, or cartoon illustrations
- **Good references:** BASF, Evonik, Clariant hero imagery

### 1.2 Hero Section Background (dark hero)
- **File:** `src/assets/hero3.jpg`
- **Type:** Macro or wide-angle shot of chemical apparatus — glassware with colored liquids, industrial tanks, or pipeline infrastructure
- **Mood:** Dark background, vibrant chemical colors (amber, green, blue), premium feel
- **Dimensions:** 1920 × 1080 px
- **Format:** WebP

### 1.3 Gallery Section (4 grid images)
- **Component:** `src/components/home/gallery.tsx`
- **Currently:** Empty grey boxes — replace with real images
- **Slot 1 (Large, left):** Aerial view of a chemical manufacturing facility or port/logistics hub
- **Slot 2 (Top right):** Team in lab coats in a quality-testing lab
- **Slot 3 (Mid right):** Close-up of a product — chemical drums, containers, or raw material
- **Slot 4 (Bottom right):** Sustainability-themed — green energy integration at plant
- **Dimensions:** Slot 1: 800 × 600 px | Slots 2–4: 400 × 300 px
- **Format:** WebP, `loading="lazy"`

### 1.4 Insights Cards (3 cards)
- **Component:** `src/components/home/insights.tsx`
- **Currently:** Unsplash URLs (chemical-themed but should be owned images)
- **Type:** Editorial photography — lab equipment, export containers, or ESG reporting imagery
- **Mood:** Clean, professional, slightly warm. NOT dark or dramatic.
- **Dimensions:** 600 × 450 px (4:3 ratio)
- **Format:** WebP, `loading="lazy"`
- **Note:** Replace the Unsplash URLs before launch. Self-hosting avoids CDN dependency.

---

## 2. About Page (`/about`)

### 2.1 About Hero
- **File:** `src/assets/about_hero_chemistry_1775711291474.png`
- **Type:** A team portrait at your facility OR a wide establishing shot of the Mumbai office exterior
- **Mood:** Warm, professional, trustworthy — lighter than homepage
- **Dimensions:** 1920 × 900 px (banner crop)
- **Format:** WebP

### 2.2 Journey / Timeline Section
- **Component:** `src/components/about/aboutjourney.tsx` · **File:** `src/assets/aboutjourney.jpg`
- **Type:** Historical photos if available (founding team, early facilities), or milestone moments
- **Mood:** Documentary, warm, authentic
- **Dimensions:** 800 × 600 px
- **Format:** WebP, `loading="lazy"`

### 2.3 CEO / Leadership Photo
- **File:** `public/images/ceo.png`
- **Type:** Professional headshot — neutral background, business formal
- **Dimensions:** 400 × 500 px (portrait crop, 4:5 ratio)
- **Format:** WebP

### 2.4 Stats / Brand Section Background
- **Component:** `src/components/about/aboutstat.tsx`
- **Type:** Abstract pattern or very subtle blurred plant imagery — should not compete with the large stat numbers
- **Mood:** Muted, desaturated — brand navy `#102b5e` overlay acceptable
- **Dimensions:** 1440 × 600 px
- **Format:** WebP

---

## 3. Products Page (`/products`)

### 3.1 Products Hero
- **Component:** `src/components/products/producthero.tsx`
- **Type:** Clean product-focused shot — chemical containers arranged neatly, or a gleaming laboratory bench
- **Mood:** Clean, white or light grey background, high-key lighting
- **Dimensions:** 1920 × 800 px
- **Format:** WebP

### 3.2 Product Detail — CTA Banner
- **File:** `src/pages/ProductDetail.tsx` line 379 (currently uses an Unsplash URL — must replace)
- **Type:** Abstract chemistry texture or macro shot of molecular structures
- **Mood:** Dark navy, premium
- **Dimensions:** 1200 × 500 px
- **Format:** WebP, self-hosted in `/public/images/`

### 3.3 Product Catalogue Cover
- **File:** `src/assets/chemistry_product_panel.png`, `src/assets/cool_chem_product.png`
- **Type:** Product photography — clean white background, proper lighting, showing the physical product or packaging
- **Format:** WebP with transparent background (PNG source)

---

## 4. Logistics Page (`/logistics`)

### 4.1 Logistics Hero Video
- **File:** `src/assets/videos/loghero.mp4`
- **CRITICAL:** Currently 68.7 MB — must be re-encoded to < 8 MB
- **Target format:** AV1 (.mp4) + WebM fallback, max 1920 × 1080 px
- **Content:** Aerial of loading docks, tanker trucks, or intermodal containers in motion
- **Poster image:** A still frame exported from the video at 1920 × 1080 px, WebP format

### 4.2 Logistics Hero Static Images (5 images)
- **Files:** `src/assets/logistics/log1.jpg` through `log5.jpg`
- **All are 2–8 MB JPEG — must convert to WebP, target < 200 KB each**
- **Type:** Logistics in action — warehouse interiors, trucks, ships, tank containers
- **Mood:** Industrial, motion-blurred, dramatic lighting OK

### 4.3 Infrastructure / Build Images (5 images)
- **Files:** `src/assets/logistics/logbuild1.jpg` through `logbuild4.jpg`, `logbuildbg.jpg`
- **Type:** Infrastructure photography — loading bays, storage facilities, dispatch areas
- **All need WebP conversion, target < 180 KB each**

---

## 5. Sustainability Page (`/sustainability`)

### 5.1 Sustainability Hero Background
- **File:** `src/assets/sustainability/sus_hero_bg.png` (currently 3 MB — critical)
- **Type:** Harmony of nature + industry — solar panels at a plant, green fields adjacent to facility, clean water body
- **Mood:** Hopeful, light, green and blue tones
- **Dimensions:** 1920 × 1080 px
- **Target size after WebP conversion:** < 150 KB

### 5.2 Sustainability Core / Content Images
- **Files:** `src/assets/sustainability/sus1.png`, `sus2.jpg`, `sus3.jpg`, `suscore.jpg`
- **Types:**
  - `sus1`: Carbon / climate imagery — renewable energy, emissions monitoring
  - `sus2`: Social responsibility — team, community program, health and safety
  - `sus3`: Circular economy — recycling, waste reduction, bio-based materials
  - `suscore`: Overall ESG / certification visual (e.g., hands around a globe with green overlays)
- **All need WebP conversion, target < 100 KB each**
- **Format:** WebP, `loading="lazy"`

---

## 6. Contact Page (`/contact`)

The redesigned Contact page is intentionally image-free — it relies on typography and interaction. No images are required. If you want to add a visual:

- **Optional image:** A professional photo of the Mumbai office interior or exterior
- **Placement:** Left panel background or a small accent image near the address
- **Dimensions:** 600 × 800 px (portrait)
- **Format:** WebP, `loading="lazy"`
- **File target:** `src/assets/contact_office.png` (already exists at 0.9 MB — convert to WebP < 50 KB)

---

## 7. Export Page (`/export`)

### 7.1 Export Hero / Video Section
- **Component:** `src/pages/export/components/ExportVideoSection.tsx`
- **Type:** Container ship at port, aerial of logistics hub, or time-lapse of cargo loading
- **Mood:** Scale, confidence, global reach

### 7.2 Export Cards
- **Component:** `src/pages/export/components/ExportCards.tsx`
- **Type:** Country/region imagery — silhouettes of destination markets, or a global map graphic
- **Mood:** Clean, data-driven

---

## 8. Shared / Global

### 8.1 Certification Logos
- **Directory:** `src/assets/certifications/`
- **Status:** Good — use existing assets. Consider converting PNGs to WebP.
- **Note:** Keep on white or very light backgrounds; do not overlay on dark images

### 8.2 OG / Social Share Image
- **Required for:** Every page's Open Graph `og:image` meta tag
- **Recommended:** A branded card — Velora logo + tagline on a dark navy background with the accent green
- **Dimensions:** 1200 × 630 px (Twitter/Facebook standard)
- **Format:** PNG or JPEG (not WebP — some social crawlers don't support WebP)
- **File location:** `/public/images/og-default.jpg`

### 8.3 Favicon
- **File:** `public/favicon.svg`
- **Status:** SVG present. Also add `favicon.ico` (32 × 32) and `apple-touch-icon.png` (180 × 180) for full browser coverage.

---

## Priority Order for Image Replacement

| Priority | Asset | Reason |
|---|---|---|
| 🔴 Critical | `loghero.mp4` (68.7 MB) | Kills page load on mobile |
| 🔴 Critical | `log1.jpg` (7.96 MB) | Largest single image |
| 🔴 Critical | `hero3.jpg` (6.67 MB) | Above-fold hero |
| 🔴 Critical | ProductDetail CTA (Unsplash URL) | External dependency, possible license issue |
| 🟠 High | All logistics images (log1–5, logbuild1–5) | ~30 MB combined |
| 🟠 High | `sus_hero_bg.png` (3 MB) | Sustainability hero background |
| 🟠 High | All gallery slots (empty) | Section shows grey boxes |
| 🟠 High | Insights cards (Unsplash) | Should be owned content images |
| 🟡 Medium | `hero1.jpg`, `hero2.jpg`, `preherovelora.png` | Homepage performance |
| 🟡 Medium | About page assets | Quality/trust signals |
| 🟢 Low | Certification logos | Already optimized or small |
| 🟢 Low | OG image | Required but not critical path |
