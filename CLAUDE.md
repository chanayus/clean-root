# CLAUDE.md

เว็บ static ไม่ใช้ framework — HTML ธรรมดา + vanilla JS (ES modules) + Tailwind v4
(standalone CLI, ไม่มี `package.json`) + Web Components + Motion ผ่าน CDN

## กฎที่ห้ามลืม

**เขียน style = เปิด `css-conventions.md` ก่อน**
Tailwind ใน markup คือค่าเริ่มต้น ยกไปเขียน CSS มือเฉพาะที่เข้าเกณฑ์ใน
`.claude/skills/static-site-from-prototype/references/css-conventions.md`
— อ่านทุก section ไม่ใช่อ่านครั้งเดียวตอนเริ่มโปรเจกต์

**เพิ่ม class ใหม่แล้วต้อง rebuild**
```
npx @tailwindcss/cli -i ./styles/tailwind/input.css -o ./styles/tailwind/output.css --minify
```
class ที่ไม่ได้อยู่ใน source ตอน build จะไม่มีใน `output.css` และไม่ทำงานเงียบๆ

**`output.css` เป็นไฟล์ generate** ห้ามแก้มือ

## ของที่มีให้ = เครื่องมือ ไม่ใช่ข้อบังคับ

`data-reveal`, components, utilities มีไว้ลดงานซ้ำ
ส่วนไหนของงานที่มีลักษณะเฉพาะ เขียนเองได้เลย ไม่ต้องดัดให้เข้ากับของที่มี

## รายละเอียดที่เหลือ

อยู่ใน `.claude/skills/static-site-from-prototype/`

| ต้องการอะไร | เปิดไฟล์ |
|---|---|
| แปลง prototype เป็นเว็บจริง | `SKILL.md` |
| ตัดสินใจ Tailwind vs CSS | `references/css-conventions.md` |
| ผังไฟล์, build, ฟอนต์, Lenis | `references/stack.md` |
| scroll animation, Motion | `references/animation.md` |

repo ต้นทางคือ `boilerplate-static-web` — เจอของดีตอนทำงานจริงให้ commit กลับไปที่นั่น
โปรเจกต์หน้าจะได้ตามด้วย

---

# CleanRoots — เฉพาะโปรเจกต์นี้

แปลงมาจาก `prototype/` (static prototype 8 หน้า) **design system ตัวจริงอยู่ที่
`prototype/CleanRoots Design System.dc.html`** — ค่าจริงอยู่ในบล็อก
`<script type="text/x-dc" data-dc-script>` ท้ายไฟล์ ไม่ใช่ใน markup ที่เป็น `{{ }}`

## สถานะ

ครบทั้ง 8 หน้าตาม `prototype/` แล้ว — `index` `cart` `products` `product` `faq` `about` `account` `articles`

**หน้าใหม่ต้องมีอะไรบ้าง** (เผื่อมีหน้าเพิ่มในอนาคต)

- `<body data-nav-solid>` ถ้าหน้านั้นพื้นครีมตั้งแต่บนสุด (ไม่มี hero รูปเต็มจอ)
  ไม่งั้น nav ขาวบนพื้นครีมจะมองไม่เห็น — `modules/navbar.js` อ่าน attribute นี้
- `<body data-cart-page>` เฉพาะหน้า cart — กันไม่ให้ไอคอนตะกร้าบน nav เปิด drawer ทับรายการที่ดูอยู่
- `main` เว้นบนด้วย `pt-26 max-md:pt-22` เพราะ nav เป็น `fixed`

**รูปที่ยังไม่มีไฟล์จริง** — วางไฟล์แล้วเติม `<img class="size-full object-cover">` แทน div เปล่าได้เลย

| หน้า | จุดที่รอรูป | ตอนนี้เห็นอะไร |
|---|---|---|
| `products` | น้ำผึ้ง, ไข่ไก่, กล้วยตากแห้ง, พริกแห้ง | เฉดพื้นหลัง `.harvest-card-photo--honey` ฯลฯ ใน `input.css` |

วางไฟล์ที่ `images/products/<ชื่อ>.webp` แล้วเติม `<img>` ในการ์ดได้เลย

**หน้าที่ใช้รูปยืมไปก่อน** (ไม่ใช่รูปเฉพาะจุดนั้นจริง) — วนใช้ `hero-field` / `story-soil` /
`story-harvest` / `story-recipe` (จาก `images/pages/index/`) กับรูปสินค้า (rice, garlic, shallot, bamboo)
ตามธีมที่ใกล้เคียงที่สุด มีรูปจริงเมื่อไหร่ค่อยเปลี่ยน `src` ตรงจุดนั้น

| หน้า | จุดที่ยืมรูป |
|---|---|
| `about` | รูป "จุดเริ่มต้น" (story-soil) + "ทำไมมีจำกัด" (story-harvest) |
| `product` | การ์ดเมนู 3 ใบใน "กินยังไงให้อร่อย" (rice, story-recipe ×2) |
| `articles` | featured + การ์ดทั้ง 14 ใบ |

## Tailwind ก่อน ค่อยสร้าง token

ถ้า Tailwind มีสเกลที่ค่าตรงหรือใกล้พอ **ใช้ของ Tailwind** สร้าง token เฉพาะตอนที่ไม่มีอะไรเทียบได้

| ใช้ของ Tailwind | ตั้งเป็น token |
|---|---|
| radius (8/12/16px = `rounded-lg`/`xl`/`2xl`), font-weight (500/600/700), spacing, duration, z-index, opacity, `tracking-*` ≤0.1em | สี, ฟอนต์, สเกลตัวอักษร, easing spring, เงาการ์ด |

`tracking` เกิน 0.1em ใช้ arbitrary (`tracking-[0.28em]`) ไม่คุ้มตั้ง token

## Design tokens

ค่าจริงอยู่ใน `styles/base.css` · ชื่อ Tailwind map ที่ `styles/tailwind/input.css`

| Token | ค่า | บทบาท |
|---|---|---|
| `--cr-green` | `#3E6250` | CTA หลัก |
| `--cr-green-dark` | `#33513F` | hover ของปุ่มเขียว |
| `--cr-gold` | `#F2C230` | โปรโมชั่น / CTA รอง |
| `--cr-cream` | `#FBF6EA` | พื้นหลังหลัก |
| `--cr-rust` | `#B5533F` | ลบ / แจ้งเตือน |
| `--text-primary` / `-secondary` / `-muted` | `#2B2A25` / `#5B5A4F` / `#7A7A6E` | ข้อความ |
| `--panel-green-light` / `-moss` / `--panel-cream` / `--panel-lilac` | `#EDF0E4` / `#E4E9DA` / `#F4EFDC` / `#E6DCF0` | พื้นพาเนล |
| `--border` | `#EAE3D2` | เส้นขอบ |
| `--text-on-gold` / `-strong` | `#6B5A1E` / `#4E4318` | ข้อความบนพื้นเหลือง (footer) |
| `--line-green` / `-dark` | `#06C755` / `#05B34C` | สีแบรนด์ LINE (ของภายนอก) |

**พาเนลใช้กับเนื้อหาเท่านั้น ไม่ใช่ CTA และไม่เกิน 1-2 สี/หน้า**

## ตัวอักษร

- **Prompt** 500/600/700 — หัวข้อ ปุ่ม CTA · **ปุ่มเป็น Prompt 700 เสมอ**
- **Sarabun** 400–700 — เนื้อหา ราคา ฟอร์ม (ค่าเริ่มต้นของ `body`)
- **Fraunces** 900 — display เท่านั้น (ROOTS wordmark, ตัวเลขหน้า about)

สเกล `--fs-*` อยู่ใน `base.css` ผูกกับ `h1`–`h6` ให้แล้ว และเปิดเป็น utility ด้วย
(`text-h1`…`text-h6`, `text-body`, `text-caption`, `text-hero`) เผื่อกรณีที่ระดับ heading
ตามความหมายไม่ตรงกับขนาดที่ต้องการ

Hero ใช้ `--fs-hero` = `clamp(2.5rem, 6vw, 4.5rem)` ตาม prototype (72px)
ซึ่งใหญ่กว่าที่ design system ระบุ (52px) — เป็นการตัดสินใจที่ยืนยันแล้ว

## กฎเนื้อหา

- **ห้ามใช้อีโมจิใน UI หลัก** (ปุ่ม / nav / หัวข้อ / การ์ดสินค้า) — design system กำหนด
  ข้อความน้ำเสียงยาวๆ เช่น empty cart / toast ยังใช้ได้
- ไอคอนเป็น inline SVG เส้น stroke 1.6–2px ไม่มี fill
- น้ำเสียง: พูดตรงแบบชาวสวน บอกข้อเท็จจริงของกระบวนการ
  เลี่ยง "ดีที่สุด / ปลอดภัย 100% / ช่วยรักษาโรค"

## ของที่ต่างจาก boilerplate

- **Lenis เปิดใช้** — `main.js` import `smooth-scroll.js` และทุกหน้าต้องมี CDN `<script>` ใน `<head>`
- **โลโก้เป็น CSS mask ไม่ใช่ `<img>`** — `.brand-logo` ใช้ `images/logo-cleanroots.svg` ไฟล์เดียว
  สีมาจาก `color` ของ element (nav = ครีม → เขียวตอน scrolled, footer = เขียว) คมทุกขนาด
  ใส่แค่ความสูง ความกว้างมาจาก `aspect-ratio` เดิมใช้รูป 2 ใบ crossfade แต่สัดส่วนไม่เท่ากันเลยขนาดกระโดด
  SVG ได้จาก vectorize ต้นฉบับ PNG ด้วย potrace (อัปสเกล 4× ก่อน trace) แล้วบีบด้วย svgo `--precision=0`
- **`modules/navbar.js` ไม่มี hide-on-scroll** — เปลี่ยนเป็น scrolled-state (เลย 70vh → พื้นครีม + สลับสีโลโก้)
  เพิ่ม nav spy, search panel, account dropdown
- **`modules/overlays.js`** (ไฟล์ใหม่) — cart drawer + notify modal
- **ฟอนต์โหลดจาก Google Fonts CDN** ไม่ self-host ต่างจากที่ `stack.md` แนะนำ
- **ตะกร้าเป็น display-only ใน Phase 1** — drawer เปิด/ปิดได้ แต่รายการเป็นตัวอย่าง hardcode
  ไม่มี store ไม่นับจำนวน ไม่คำนวณยอด (ยกไปทำตอนหน้า cart)

## animation เรียกจากไฟล์ของแต่ละหน้า

`scripts/modules/` เก็บเฉพาะ**พฤติกรรม** (nav state, overlays, smooth scroll)
ส่วน**การเคลื่อนไหว**เรียกจาก `scripts/pages/<name>.js` เสมอ แม้จะซ้ำกันหลายหน้า
เช่น reveal ของ `.harvest-card` กับ ROOTS wordmark ที่ index/products/cart เรียกเหมือนกัน
— ยอมซ้ำ 2 บรรทัดเพื่อให้เปิดไฟล์หน้าไหนก็เห็นครบว่าหน้านั้นขยับอะไรบ้าง

ตัวช่วยกลางอยู่ที่ `modules/animation.js` (`revealOnce`, `spring`, `springSoft`, `animateBreakpoint`)

## CSS หรือ Motion

| ทำอะไร | เขียนที่ไหน |
|---|---|
| interaction พื้นฐาน — `:hover`, `:focus`, เปิด/ปิดด้วย class | CSS |
| animation เฉพาะทาง — reveal ตอนเข้าจอ, text/word animation, scroll-pin, parallax | Motion |

**ข้อควรระวังตอนใช้ทั้งคู่กับ element เดียวกัน** Motion เขียน `transform` เป็น inline style
ซึ่งชนะ CSS เสมอ ถ้า element นั้นมี reveal ด้วย Motion แล้วยังต้อง hover ด้วย CSS
ให้ hover ใช้ property `translate` / `scale` แยก (เบราว์เซอร์ประกอบกับ `transform` ให้เอง)
ตัวอย่างอยู่ที่ `.harvest-card:hover` ใน `pages/index.css`

**masked reveal** (หน้าต่าง `overflow:hidden` + ตัวในเลื่อนขึ้น) ให้ใช้ `revealOnce(..., { child })`
จาก `modules/animation.js` — มันเฝ้ากล่องนอกให้และส่งตัวในเข้า `animate` เป็นชุดเดียวเพื่อให้ `stagger` ทำงาน
รายละเอียดอยู่ใน `references/animation.md`

## ผังรูป

```
images/
  favicon.png            ทุกหน้า
  logo-cleanroots.svg    ทุกหน้า (navbar + footer)
  products/              รูปสินค้า — ใช้ซ้ำข้าม index / products / product
  pages/<page>/          รูปที่ใช้หน้าเดียว เช่น pages/index/hero-field.webp
```

รูปที่ใช้หน้าเดียวไปไว้ใน `pages/<ชื่อหน้า>/` · ของที่ใช้ซ้ำข้ามหน้าอยู่ระดับบน
รูปสินค้าแยกเป็น `products/` เพราะใช้ทั้งหน้าแรก หน้ารวมสินค้า และหน้ารายละเอียด

รูปทั้งหมดเป็น webp (แปลงด้วย `npx sharp-cli`) — ต้นฉบับ PNG ยังอยู่ใน `prototype/images/`

## ปุ่ม

ทุกปุ่มอยู่ในระบบ `.btn` เดียวกัน — radius 8px, Prompt 700, fill-sweep ตอน hover
`.btn-primary` (เขียว) · `.btn-ghost` (เหลือง) · `.btn-cream` · `.btn-outline` ·
`.btn-outline-light` (โปร่งบนพื้นรูป) · `.btn-line` (สีแบรนด์ LINE)
ตัวปรับ: `.btn-sm` · `.btn-full` · `.btn-arrow` (+ `<span class="btn-arrow-icon">`)

## สิ่งที่ตัดออกจาก prototype โดยตั้งใจ

- **การ์ดสินค้าไม่พลิกแล้ว** — เอา `.harvest-card-back` + ปุ่ม (i) ออกทั้งหมด อย่าใส่กลับ
- **ไม่มีปุ่ม magnetic (ขยับตามเมาส์) เลยทั้งเว็บ** — ถอดออกจากทุกปุ่มรวมถึงปุ่มชำระเงินใน cart drawer
- **tilt ของการ์ด story ถูกถอดออก** — `data-tilt` / `data-depth` ใน markup กับ
  `transform-style: preserve-3d` ใน `pages/index.css` ยังอยู่เฉยๆ เผื่ออยากใส่กลับ

## chrome อยู่ที่ไหน

`components/navbar.js` ถือ nav + search panel + cart drawer + notify modal + toast ไว้ทั้งหมด
CSS ของพวกนี้อยู่ใน `input.css` (`@layer components`) **ไม่ใช่** `pages/index.css`
เพราะทุกหน้าโหลด component ตัวเดียวกัน — ถ้าเก็บไว้ในไฟล์หน้า หน้าถัดไปจะต้อง copy ไปทั้งก้อน
