# Stack and file layout

## Layout

```
components/          Web Components — one file per component, plain <script> tags
  navbar.js          <navbar-component>
  footer.js          <footer-component>
scripts/
  main.js            shared entry point, loaded by every page as a module
  modules/           shared behaviour
    animation.js     Motion re-exports + the data-reveal system
    navbar.js        mobile menu toggle, hide-on-scroll
    smooth-scroll.js Lenis — opt-in, see below
  pages/<name>.js    behaviour for one page
styles/
  base.css           imports output.css, declares tokens, global element styles
  tailwind/
    input.css        Tailwind source: @theme, @utility, @layer components
    output.css       generated — never edit by hand
  pages/<name>.css   styles for one page
.vscode/tasks.json   "Watch Tailwind CSS" / "Minify Tailwind CSS"
```

## Tailwind v4, standalone CLI

**There is no `package.json` and no install step.** Tailwind runs through `npx`.

Watch while developing:

```
npx @tailwindcss/cli -i ./styles/tailwind/input.css -o ./styles/tailwind/output.css --watch --minify
```

One-off build:

```
npx @tailwindcss/cli -i ./styles/tailwind/input.css -o ./styles/tailwind/output.css --minify
```

Both are wired up as VS Code tasks. `output.css` is generated — edits to it are lost on
the next build.

## What each page loads, in order

```html
<link rel="stylesheet" href="./styles/base.css" />
<link rel="stylesheet" href="./styles/pages/<name>.css" />

<!-- Components: plain scripts, not modules -->
<script src="./components/navbar.js"></script>
<script src="./components/footer.js"></script>

<!-- Behaviour: ES modules -->
<script type="module" src="./scripts/pages/<name>.js"></script>
<script type="module" src="./scripts/main.js"></script>
```

`base.css` pulls in `output.css`, so pages never link `output.css` directly.

Components are plain scripts because `customElements.define` must run before the parser
reaches `<navbar-component>`. Modules defer, which would leave the element unupgraded on
first paint.

## Web Components

```js
class Navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
      <nav id="navbar" class="w-full sticky top-0 z-40">...</nav>
    `;
  }
}

customElements.define("navbar-component", Navbar);
```

The `/*html*/` comment is what turns on HTML syntax highlighting inside the template
literal. Markup inside a component uses Tailwind utilities like anywhere else.

## Design tokens

`base.css` declares plain CSS custom properties. `input.css` maps them into Tailwind's
theme with `@theme inline`, which is what makes `bg-primary` and `text-primary` resolve:

```css
/* base.css */
:root {
  --primary: #5965d1;
}

/* input.css */
@theme inline {
  --color-primary: var(--primary);
}
```

Change the value in `base.css`. `input.css` only wires up the name.

Also declared: breakpoints (`sm` 641 / `md` 769 / `lg` 1025 / `xl` 1281 / `2xl` 1537)
and a fluid type scale `--fs-h1` … `--fs-h6` driven by `clamp()`, with
`html { font-size: clamp(14px, 0.84vw, 16px) }` underneath it.

## Ready-made utilities

- `container` — centred, max-width, responsive padding
- `prose` — typography defaults for long-form content blocks

## Fonts

Uncomment and fill in the `@font-face` block in `base.css`, with files under `fonts/`.
Thai-language sites typically pair a Thai face as the body default with a Latin face for
numerals and Latin runs.

## Lenis smooth scroll — opt-in

Off by default. Some projects don't want it. To enable:

1. Uncomment the `smooth-scroll.js` import in `scripts/main.js`.
2. Add the Lenis CDN `<script>` to each page's `<head>`.

Ask before enabling it. Don't assume a project wants smooth scroll.
