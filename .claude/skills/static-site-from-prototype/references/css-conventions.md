# CSS conventions

**Scope: static sites with no build framework.** Nothing here applies to React, Next.js,
or Vue projects — those have their own component boundaries and their own answer to
where a style lives.

This is the call you make dozens of times per page. Read it before styling a new
section, not once at the start of a project.

## Four places a style can live

| Layer | Where | For |
|---|---|---|
| 1. Utilities | in the markup | the default for everything |
| 2. Tokens | `styles/tailwind/input.css` → `@theme` | colours, breakpoints, radii — values used site-wide |
| 3. Component class | `input.css` → `@layer components` or `@utility` | anything reused across pages |
| 4. Page CSS | `styles/pages/<name>.css` | anything used on one page only |

Layer 3 is the one that gets skipped. It's the middle ground: a named class that still
resolves through tokens. `.btn-primary`, `.glass-element`, `prose`, `container` all live
there.

## Default: Tailwind in the markup

Layout (grid, flex, gap), spacing, sizing, colours from tokens, type scale, responsive
variants (`md:`, `lg:`), plain `hover:` / `focus:` — all of it goes in the class
attribute. Don't create a CSS file for these.

## Move it to CSS when any one of these is true

1. It needs `::before` or `::after`.
2. States nest two levels deep — `&:hover &::before`.
3. It uses a property Tailwind has no token for — `mask`, `clip-path`,
   `-webkit-text-stroke`, a specific `backdrop-filter`.
4. It needs `@keyframes`, or a transition whose properties have different timings.
5. The class string on a single element runs past roughly 15 utilities.

One trigger is enough. You don't need two.

## Then decide which file

| If | Goes to |
|---|---|
| used on 2+ pages | layer 3 — `input.css` |
| used on one page | layer 4 — `styles/pages/<name>.css` |
| a default for an element site-wide (`h1`–`h6`, `button`, `ul`) | `input.css` → `@layer base` |

Something reused across pages that lands in a page file will get copy-pasted into the
next page. That's the failure this table prevents.

## Writing the CSS

- Reference tokens: `var(--primary)`, never a hard-coded hex or spacing value that
  already has a token.
- Name classes BEM-style, prefixed by the section: `.about-hero__image`,
  `.pricing-card__badge`.
- `@apply` is for folding in a few utilities. If a rule is nothing but a long `@apply`
  line, it belonged in the markup.

## Rebuild after adding classes

Tailwind scans source files at build time. A class that wasn't in the source when
`output.css` was generated does not exist. After adding classes:

```
npx @tailwindcss/cli -i ./styles/tailwind/input.css -o ./styles/tailwind/output.css --minify
```

Or run the watcher and leave it running. See `stack.md`.

## You picked wrong if

- A `pages/*.css` file is mostly `display: flex; gap: 1rem; padding: 2rem`.
  Those are utilities. Put them back in the markup.
- A class attribute stacks `hover:`, `group-hover:`, and `before:` variants until the
  line is unreadable. Name it and move it out.
- The same class name appears in two page CSS files. It belongs in `input.css`.
- A CSS rule hard-codes a colour that exists as a token. Use the token.
