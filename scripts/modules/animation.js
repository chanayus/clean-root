import { animate, inView, scroll, stagger } from "https://cdn.jsdelivr.net/npm/motion@12.33.0/+esm";

export { animate, inView, scroll, stagger };

export const defaultEase = [0.25, 1, 0.5, 1];

// ค่าเดียวกับ --spring / --spring-soft ใน styles/base.css
export const spring = [0.16, 1, 0.3, 1];
export const springSoft = [0.34, 1.4, 0.64, 1];

/* เผยเนื้อหาตอนเลื่อนถึง เล่นครั้งเดียวแล้วเลิกเฝ้า
   child = ลาย masked reveal: เฝ้ากล่องนอกแต่ animate ตัวใน — เพราะ IntersectionObserver
   วัดตัวในหลัง transform ตัวในที่ถูกดันพ้นจอจะไม่เข้าเงื่อนไขสักที */
export function revealOnce(target, from, to, { amount = 0.3, child, ...options } = {}) {
  const roots = typeof target === "string" ? document.querySelectorAll(target) : [target];

  roots.forEach((watched) => {
    const moving = child ? Array.from(watched.querySelectorAll(child)) : watched;
    if (child && !moving.length) return;

    animate(moving, from, { duration: 0 });

    const stop = inView(
      watched,
      () => {
        animate(moving, to, options);
        stop();
      },
      { amount },
    );
  });
}

/* [data-reveal] — ทางลัดสำหรับ fade-up ธรรมดา ไม่ต้องเขียนโค้ดต่อหน้า
   ปรับได้ด้วย data-amount / data-delay / data-duration
   งานที่มีลักษณะเฉพาะให้เรียก revealOnce() เองใน scripts/pages/<name>.js */
document.querySelectorAll("[data-reveal]").forEach((el) => {
  revealOnce(
    el,
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0 },
    {
      amount: Number(el.dataset.amount) || 0.3,
      delay: Number(el.dataset.delay) || 0,
      duration: Number(el.dataset.duration) || 1,
      ease: defaultEase,
    },
  );
});

export function animateBreakpoint(query, callback) {
  const mq = window.matchMedia(query);
  let cleanup = null;

  function enable() {
    cleanup = callback() || null;
  }

  function disable() {
    cleanup?.();
    cleanup = null;
  }

  function onChange(e) {
    if (e.matches) {
      enable();
    } else {
      disable();
    }
  }

  mq.addEventListener("change", onChange);

  // run ครั้งแรก
  mq.matches && enable();

  // global cleanup (กรณี page destroy)
  return () => {
    mq.removeEventListener("change", onChange);
    disable();
  };
}
