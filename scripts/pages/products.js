/* หน้า products — รายการทั้งหมดแยกเป็นกลุ่ม "มีสินค้าตอนนี้" กับ "รอฤดูกาลถัดไป"

   การ์ดเป็น markup ที่ hardcode ไว้ใน products.html
   ปุ่มเพิ่มลงตะกร้า / แจ้งเตือนผ่าน LINE ผูกให้แล้วโดย scripts/modules/overlays.js
   ไฟล์นี้เหลือแค่ animation ของหน้า */
import { revealOnce, spring, springSoft, stagger } from "../modules/animation.js";

/* ===================== การ์ดสินค้า ===================== */
// ไม่ใช้ [data-reveal] กลางเพราะการ์ดมี scale ประกอบด้วย ไม่ใช่แค่ fade-up
function initHarvestCards() {
  revealOnce(".harvest-card", { opacity: 0, y: 26, scale: 0.97 }, { opacity: 1, y: 0, scale: 1 }, { amount: 0.18, duration: 0.6, ease: springSoft });
}

initHarvestCards();
