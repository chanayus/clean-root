import { animate, animateBreakpoint, revealOnce, scroll, springSoft, stagger } from "../modules/animation.js";

/* ===================== Hero entrance ===================== */
function initHeroEntrance() {
  const seq = [
    [".hero-curtain", { clipPath: ["inset(0 0 100% 0)", "inset(0 0 0 0)"] }, { duration: 0.5, at: "+0.5" }],
    [".hero-media img", { scale: [1.12, 1] }, { duration: 18, ease: "easeOut", at: "<" }],
    ["hgroup > h1 .hero-word", { y: [20, 0], opacity: [0, 1] }, { duration: 0.5, at: "<", delay: stagger(0.2) }],
    ["[data-hero-line]", { y: [20, 0], opacity: [0, 1] }, { duration: 0.5, at: "-0.35", delay: stagger(0.2) }],
  ];

  animate(seq);
}

/* ===================== Parallax ===================== */
function initParallax() {
  document.querySelectorAll("[data-parallax]").forEach((el) => {
    const factor = parseFloat(el.dataset.parallax) || 0;

    scroll(animate(el, { y: [0, window.innerHeight * factor] }, { ease: "linear" }), {
      target: el,
      offset: ["start start", "end start"],
    });
  });
}

/* ===================== Story: horizontal scroll-pin =====================
   section สูง 300vh, sticky viewport ค้างเต็มจอ, track เลื่อนซ้ายตาม scroll progress
   desktop เท่านั้น — ที่ ≤1024px การ์ดเรียงแนวตั้งปกติ ข้ามลอจิกนี้ทั้งหมด */
function initStoryHorizontal() {
  const section = document.querySelector("[data-narrative]");
  const track = document.querySelector("[data-narrative-track]");
  const cards = Array.from(document.querySelectorAll("[data-narrative-index]"));
  if (!section || !track || !cards.length) return;

  const fill = document.querySelector("[data-narrative-progress]");
  const currentEl = document.querySelector("[data-narrative-current]");
  const hint = document.querySelector("[data-narrative-hint]");
  const watermark = document.querySelector("[data-narrative-watermark]");
  const dotsWrap = document.querySelector("[data-story-dots]");
  const dots = Array.from(document.querySelectorAll("[data-story-dot]"));

  const WORDS = ["SOIL", "HARVEST", "RECIPE"];
  const n = cards.length;
  const isDesktop = () => window.matchMedia("(min-width: 1025px)").matches;

  // กดจุดนำทาง → เลื่อนไปตำแหน่ง progress ของการ์ดนั้น
  dots.forEach((dot) =>
    dot.addEventListener("click", () => {
      const i = Number(dot.dataset.storyTarget);

      if (!isDesktop()) {
        cards[i].scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      const scrollable = section.offsetHeight - window.innerHeight;
      window.scrollTo({ top: section.offsetTop + scrollable * (i / (n - 1)), behavior: "smooth" });
    }),
  );

  // ที่ ≤1024px การ์ดโชว์เนื้อหาเต็มตลอด ไม่มี active state
  const resetToStacked = () => {
    track.style.transform = "";
    cards.forEach((card) => card.classList.add("is-active"));
    dotsWrap?.classList.remove("is-visible");
    hint?.classList.remove("is-shown");
  };

  resetToStacked();

  animateBreakpoint("(min-width: 1025px)", () => {
    let activeIndex = -1;

    const stop = scroll(
      (progress) => {
        // เลื่อน track จาก 0 ถึง -(n-1)/n ของความกว้างตัวเอง
        track.style.transform = `translate3d(${-progress * ((100 * (n - 1)) / n)}%, 0, 0)`;
        if (fill) fill.style.width = `${(progress * 100).toFixed(1)}%`;

        const rect = section.getBoundingClientRect();
        const pinned = rect.top <= 1 && rect.bottom >= window.innerHeight;
        dotsWrap?.classList.toggle("is-visible", pinned);
        hint?.classList.toggle("is-shown", pinned && progress < 0.28);

        const active = Math.min(n - 1, Math.round(progress * (n - 1)));
        if (active === activeIndex) return;
        activeIndex = active;

        cards.forEach((card, i) => card.classList.toggle("is-active", i === active));
        dots.forEach((dot, i) => dot.classList.toggle("is-active", i === active));

        if (currentEl) currentEl.textContent = String(active + 1).padStart(2, "0");

        // watermark สลับคำประจำตอน — fade ออกก่อนแล้วค่อยเปลี่ยนข้อความ
        if (watermark) {
          watermark.style.opacity = "0";
          clearTimeout(watermark.swapTimer);
          watermark.swapTimer = setTimeout(() => {
            watermark.textContent = WORDS[active];
            watermark.style.opacity = "1";
          }, 220);
        }
      },
      { target: section, offset: ["start start", "end end"] },
    );

    // ออกจากช่วง desktop แล้วคืนทุกอย่างกลับเป็นแบบเรียงแนวตั้ง
    return () => {
      stop();
      resetToStacked();
    };
  });
}

/* ===================== การ์ดสินค้า ===================== */
function initHarvestCards() {
  revealOnce(".harvest-card", { opacity: 0, y: 26, scale: 0.97 }, { opacity: 1, y: 0, scale: 1 }, { amount: 0.18, duration: 0.6, ease: springSoft });
}

// ROOTS wordmark ย้ายไป scripts/modules/footer.js แล้ว เพราะ footer อยู่ทุกหน้า ไม่ใช่แค่หน้านี้

initHeroEntrance();
initParallax();
initStoryHorizontal();
initHarvestCards();
