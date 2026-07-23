---
name: static-site-from-prototype
description: Use when working on a no-framework static site — plain HTML pages built with Tailwind v4 standalone CLI, Web Components for navbar/footer, and Motion for animation. Triggers include converting a static HTML/CSS/JS prototype into a production site, adding or restyling a page or section in such a site, deciding where a style belongs, wiring scroll animation, and rebuilding output.css. Not for React, Next.js, Vue, or any framework project.
---

# Static site from prototype

## Overview

No framework, no bundler. Plain HTML + vanilla JS (ES modules) + Tailwind v4
(standalone CLI, no `package.json`) + Web Components + Motion via CDN.

**This scaffold is a blueprint, not a set of rules.** Everything in `components/`,
`scripts/modules/`, and the utility layer exists to save repeated work. A section with
unusual needs should be written its own way — don't bend the design to fit what's here.

## The decision you make constantly

For every block of markup: Tailwind utilities, or a named class in CSS?

**REQUIRED: read `references/css-conventions.md` before writing style for any new
section.** This is not a once-per-project read. It's a call you make dozens of times
per page, and getting it wrong produces either 400-character class strings or a
`pages/*.css` full of `display: flex; gap: 1rem`.

## Converting a prototype

| Step | Do |
|---|---|
| 0 | Ask whether this project uses Lenis smooth scroll. Don't assume. Confirm the job is re-platforming, not redesign. |
| 1 | Inventory the prototype: pages, shared chrome, design tokens actually in use, assets, what the existing JS does. |
| 2 | Keep the prototype folder for side-by-side comparison. Delete scaffold placeholder files that don't apply. Enable or remove Lenis. |
| 3 | Move design tokens into `input.css` (`@theme`) and `base.css` (CSS vars). Build once and confirm they resolve. |
| 4 | Build navbar and footer as Web Components. **Stop here and show the user.** |
| 5 | Convert pages one at a time. **Stop after the first page and show the user.** |
| 6 | Final `--minify` build, check every inter-page link, ask whether to keep the prototype folder. |

**Step 3 comes before step 5.** Moving tokens after pages are converted means editing
every page again.

**The two stops are the point.** A wrong direction caught after one page costs one page.
Caught after eight, it costs eight.

Within step 5, each page splits three ways: markup → semantic HTML; style → decide per
block via `references/css-conventions.md`; behaviour → `scripts/pages/<name>.js`.

## References

| File | Read it when |
|---|---|
| `references/css-conventions.md` | Writing or moving any style. Every section. |
| `references/stack.md` | File layout, build commands, page boot order, fonts, Lenis |
| `references/animation.md` | Scroll reveals, Motion imports, page-specific animation |

## Common mistakes

- **Adding classes without rebuilding.** Tailwind scans source at build time. A new
  class that isn't in `output.css` silently does nothing. Rebuild after every batch.
- **Importing Motion from the CDN inside a page script.** Import from
  `../modules/animation.js` instead, or you get a second Motion instance.
- **Treating `data-reveal` as mandatory.** It's a shortcut for ordinary reveals. Bespoke
  motion belongs in the page's own script.
- **Converting every page before showing anyone.** See the two stops above.
