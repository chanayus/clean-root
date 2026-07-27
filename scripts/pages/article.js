/* หน้า article — แถบความคืบหน้าการอ่าน + view transition ของการ์ด "อ่านต่อ"
   เนื้อหาส่วนที่เหลือใช้ [data-reveal] อัตโนมัติจาก modules/animation.js */
import { animate, scroll } from "../modules/animation.js";

/* ===================== แถบความคืบหน้าการอ่าน =====================
   scroll() ที่ไม่ระบุ target จะอิงความคืบหน้าของทั้งหน้า พอดีกับที่ต้องการ
   ใช้ scaleX แทน width เพราะ compositor ทำได้โดยไม่ต้อง reflow ทุกเฟรม */
function initReadingProgress() {
  const bar = document.querySelector("[data-ar-progress]");
  if (!bar) return;

  scroll(animate(bar, { scaleX: [0, 1] }, { ease: "linear" }));
}

/* ===================== View Transition ของการ์ด "อ่านต่อ" =====================
   หน้านี้ต่างจาก articles ตรงที่ .ar-hero-photo ถือชื่อ article-photo ค้างไว้อยู่แล้ว
   ถ้าเซ็ตชื่อเดียวกันให้การ์ดด้วยจะซ้ำสองที่ในหน้าเดียว → เบราว์เซอร์ทิ้ง transition ทั้งชุด
   จึงต้องปลดจากรูปเปิดเรื่องก่อน แล้วค่อยย้ายไปให้การ์ดที่กด

   ปล่อยชื่อไว้ที่รูปเปิดเรื่องไม่ได้ด้วย เพราะตอนกดการ์ดล่างหน้ามันเลื่อนพ้นจอไปแล้ว
   เบราว์เซอร์จะมอร์ฟรูปจากนอกจอมาบนสุด กลายเป็นภาพวิ่งข้ามหน้าจอ */
function initRelatedPhotoTransition() {
  const hero = document.querySelector(".ar-hero-photo");

  document.querySelectorAll(".art-card").forEach((link) => {
    link.addEventListener("click", () => {
      const photo = link.querySelector("[data-art-photo]");
      if (!photo) return;

      if (hero) hero.style.viewTransitionName = "none";
      photo.style.viewTransitionName = "article-photo";
    });
  });
}

initReadingProgress();
initRelatedPhotoTransition();
