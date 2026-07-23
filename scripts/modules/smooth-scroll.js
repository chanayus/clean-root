// Lenis smooth scroll — opt-in ไม่ได้เปิดโดยค่าเริ่มต้น
//
// ใช้เมื่อไหร่:
//   1. uncomment บรรทัด import ของไฟล์นี้ใน scripts/main.js
//   2. เติม <script> CDN ของ Lenis ใน <head> ของทุกหน้า (ต้องโหลดก่อน main.js)
//      <script src="https://cdn.jsdelivr.net/npm/lenis@1.3.23/dist/lenis.min.js"></script>
//
// ถ้าโปรเจกต์ไม่ใช้ smooth scroll ปล่อยไฟล์นี้ไว้เฉยๆ ไม่ต้องลบ

if (typeof Lenis === "undefined") {
  console.warn("[smooth-scroll] ไม่พบ Lenis — ยังไม่ได้เติม <script> CDN ใน <head>");
} else {
  new Lenis({ autoRaf: true });
}
