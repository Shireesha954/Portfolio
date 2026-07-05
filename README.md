# Maya Chen — Portfolio (Semantic HTML5 + Accessibility Skeleton)

A 4-page personal portfolio built as a semantic, accessible skeleton — no framework, no build step. Open `index.html` directly in a browser.

## Pages
- `index.html` — Home
- `about.html` — Bio, timeline, skills
- `work.html` — Project case studies
- `contact.html` — Accessible contact form

## Semantic structure
Every page uses one `<header>`, one `<nav>`, one `<main>`, and one `<footer>`, with `<section>`, `<article>`, and `<aside>` used for internal structure (never for generic styling hooks). Headings follow a single logical order per page (one `<h1>`, then `<h2>`/`<h3>` nested correctly) so the outline makes sense to a screen reader's heading navigation.

## Accessibility (WCAG 2.1 AA+)
- **Skip link** to `#main-content` on every page.
- **Landmarks**: `<nav aria-label="Primary">`, labelled `<section>`/`<aside>` via `aria-labelledby`.
- **Visible focus states** (`:focus-visible`) with a color distinct from hover/accent, so keyboard focus is never ambiguous.
- **Full keyboard support**: nav, cards, and the contact form are reachable and operable via Tab/Shift+Tab/Enter alone; no keyboard traps.
- **Contact form**: real `<label for>` on every field, `<fieldset>`/`<legend>` grouping, `aria-describedby` linking hints and errors, `aria-required`/`aria-invalid` state, and a `role="status" aria-live="polite"` region announcing success/error without moving focus unexpectedly.
- **Color contrast**: all text/background pairs verified ≥ 4.5:1 (most exceed 7:1 — AAA).
- **`prefers-reduced-motion`** respected — smooth scrolling and transitions are disabled for users who request it.
- **Images/icons**: decorative marks use `aria-hidden="true"`; the favicon and any future photography should carry descriptive `alt` text.
- Works with JavaScript disabled: nav links and mailto contact still function; `script.js` only progressively enhances (mobile menu toggle, inline validation).

## SEO
- Unique, descriptive `<title>` and `<meta name="description">` per page.
- `rel="canonical"` on every page.
- Open Graph + Twitter Card meta tags for link previews.
- `Person` JSON-LD structured data on the home page.
- `robots.txt` and `sitemap.xml` included.
- Single `<h1>` per page; semantic heading hierarchy throughout.

## Before going live
- Replace `mayachen.example.com` placeholder URLs and the `og-cover.png` reference with real domain/assets.
- Wire the contact form to a real backend or form service (it currently simulates success client-side).
- Add real photography with descriptive `alt` attributes.
- Run an automated audit (Lighthouse / axe) after adding real content and images, since audit scores depend on final assets too.
