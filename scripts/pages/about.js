/* หน้า about — hero เล่าเรื่องเป็น sequence เดียว (เหมือน index.js initHeroEntrance)
   ส่วนเนื้อหาที่เหลือ (จุดเริ่มต้น/หลักการ/ปรัชญา/ทำไมมีจำกัด/เชิญชวน) ใช้ [data-reveal] อัตโนมัติจาก modules/animation.js */
import { animate, spring, stagger } from "../modules/animation.js";

/* ===================== Hero entrance ===================== */
function initHeroEntrance() {
  const seq = [
    ["[data-ab-eyebrow]", { opacity: [0, 1] }, { duration: 0.5 }],
    ["[data-ab-word]", { y: [20, 0], opacity: [0, 1] }, { duration: 0.75, ease: spring, delay: stagger(0.15) }],
    ["[data-ab-accent-line]", { scaleX: [0, 1] }, { duration: 0.75, ease: spring, at: "-0.25" }],
    ["[data-ab-hero-sub]", { y: [20, 0], opacity: [0, 1] }, { duration: 0.75, ease: spring, at: "-1" }],
  ];

  animate(seq);
}

initHeroEntrance();
