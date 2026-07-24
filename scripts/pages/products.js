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

/* ===================== View Transition ไปหน้า product =====================
   การ์ดกดได้ทั้งใบด้วย CSS ล้วน (stretched link — .harvest-card-name-link::after ใน input.css)
   ไม่ต้องดักคลิกด้วย JS แล้ว เหลือแค่เซ็ต view-transition-name ก่อนเบราว์เซอร์นำทางจริง

   ทุกการ์ดที่ลิงก์ไป product.html — ตอนนี้ product.html โชว์ได้แค่ข้าวกล้องจริง
   การ์ดอื่น รูปเลยจะมอร์ฟไปเป็นรูปข้าวกล้อง ยอมรับ mismatch ไปก่อน
   จนกว่าจะมีหน้ารายละเอียดแยกราย SKU จริง — ตอนนั้นค่อยจับคู่รูปให้ตรงกันเป็นชิ้นๆ
   ต้องเซ็ตตอนคลิกเท่านั้น (ห้ามเซ็ตค้างไว้ทุกการ์ดพร้อมกัน เพราะต้อง unique ต่อหน้า) */
function initProductPhotoTransition() {
  document.querySelectorAll(".harvest-card-name-link").forEach((link) => {
    link.addEventListener("click", () => {
      const photo = link.closest("[data-card]")?.querySelector(".harvest-card-photo");
      if (photo) photo.style.viewTransitionName = "product-photo";
    });
  });
}

initHarvestCards();
initProductPhotoTransition();
