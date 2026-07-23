# Animation

Motion (https://motion.dev) loaded from CDN. No GSAP, no build step.

## These are tools, not requirements

`data-reveal` and the helpers below exist to cover the ordinary case — content that
fades up as it scrolls into view — so it isn't rewritten on every page. A section that
wants something specific should get its own code in `scripts/pages/<name>.js`. Don't
reshape a design to fit the shared system.

## Always import through `animation.js`

```js
// scripts/pages/about.js
import { animate, scroll, stagger } from "../modules/animation.js";
```

Never import the CDN URL directly from a page script. `animation.js` already imported
it; a second import means a second Motion instance and two sets of scroll listeners.

Re-exported: `animate`, `inView`, `scroll`, `stagger`.
Also exported: `defaultEase` (`[0.25, 1, 0.5, 1]`), `spring`, `springSoft`,
`animateBreakpoint`, `revealOnce`.

## `revealOnce(target, from, to, options)`

The general form of `data-reveal` — play something once when it scrolls into view,
then stop observing. `data-reveal` is this function with one fixed keyframe pair.

```js
revealOnce(".card", { opacity: 0, y: 26, scale: 0.97 }, { opacity: 1, y: 0, scale: 1 }, {
  amount: 0.18,
  duration: 0.6,
  ease: springSoft,
});
```

`target` takes a selector string or a single element. `from` is applied immediately at
`duration: 0`, so declare the same resting state in CSS to avoid a flash before JS runs.
Everything else passes straight through to Motion's `animate`.

**`child` — for masked reveals.** A window with `overflow: hidden` and the content
sliding up inside it:

```js
revealOnce("[data-word]", { y: "110%" }, { y: "0%" }, { child: "span", delay: stagger(0.1) });
```

Two things this handles that are easy to get wrong:

- **Watch the outer box, never the moving part.** IntersectionObserver measures the box
  *after* transform. An element pushed down by 110% has a box that sits below where it
  looks, so it may never satisfy `amount`.
- **Children go into one `animate` call**, not a loop. `stagger()` derives its delay from
  each element's index in the array it receives — animating one at a time makes every
  element index 0 and nothing staggers.

## `data-reveal`

Put it on any element that should fade and slide up when scrolled into view.
`animation.js` finds them all on load — no per-page wiring.

```html
<section data-reveal>...</section>
<h2 data-reveal data-delay="0.2" data-duration="0.6">...</h2>
```

| Attribute | Default | Meaning |
|---|---|---|
| `data-amount` | `0.3` | fraction of the element that must be visible to fire |
| `data-delay` | `0` | seconds before it starts |
| `data-duration` | `1` | seconds it runs |

It fires once per element, on the way in.

## `animateBreakpoint(query, callback)`

For animation that should only exist at certain widths. Runs the callback when the
query matches, tears down when it stops matching.

```js
import { animateBreakpoint, scroll, animate } from "../modules/animation.js";

// Parallax on desktop only — pointless and janky on phones.
animateBreakpoint("(min-width: 1025px)", () => {
  return scroll(animate(".hero__image", { y: [0, -80] }), {
    target: document.querySelector(".hero"),
  });
});
```

Return a cleanup function from the callback and it runs when the query stops matching.
`animateBreakpoint` itself returns a cleanup for the listener.

## Page-specific scroll animation

`scroll()` ties an animation's progress to scroll position rather than firing it once:

```js
import { scroll, animate } from "../modules/animation.js";

scroll(animate(".progress-bar", { scaleX: [0, 1] }), {
  target: document.querySelector("article"),
  offset: ["start start", "end end"],
});
```

## Not in this scaffold

`data-text-split`, `animateTextSplit()`, and `data-type="card"` reveal variants exist in
some projects built on this stack but are **not** here. Don't reference them. If a
project needs one, write it, then commit it back upstream so the next project has it.
