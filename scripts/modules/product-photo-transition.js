/* ใช้ร่วมกันระหว่าง index.js กับ products.js — ปกติไฟล์หน้าจะซ้ำ animation trigger กันเองตาม
   convention ของโปรเจกต์ แต่ฟังก์ชันนี้เป็น plumbing ล้วน ไม่มีพารามิเตอร์เฉพาะหน้า เลยรวมไว้ที่เดียว

   การ์ดกดได้ทั้งใบด้วย CSS ล้วน (stretched link — .harvest-card-name-link::after ใน input.css)
   ไม่ต้องดักคลิกด้วย JS แล้ว เหลือแค่เซ็ต view-transition-name ก่อนเบราว์เซอร์นำทางจริง

   ทุกการ์ดที่ลิงก์ไป product.html — ตอนนี้ product.html โชว์ได้แค่ข้าวกล้องจริง
   การ์ดอื่น รูปเลยจะมอร์ฟไปเป็นรูปข้าวกล้อง ยอมรับ mismatch ไปก่อน
   จนกว่าจะมีหน้ารายละเอียดแยกราย SKU จริง — ตอนนั้นค่อยจับคู่รูปให้ตรงกันเป็นชิ้นๆ
   ต้องเซ็ตตอนคลิกเท่านั้น (ห้ามเซ็ตค้างไว้ทุกการ์ดพร้อมกัน เพราะต้อง unique ต่อหน้า) */
export function initProductPhotoTransition() {
  document.querySelectorAll(".harvest-card-name-link").forEach((link) => {
    link.addEventListener("click", () => {
      const photo = link.closest("[data-card]")?.querySelector(".harvest-card-photo");
      if (photo) photo.style.viewTransitionName = "product-photo";
    });
  });
}
