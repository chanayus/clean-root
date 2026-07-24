// Lenis smooth scroll — เปิดใช้เป็นค่าเริ่มต้นในโปรเจกต์นี้
// main.js import ไฟล์นี้ไม่มีเงื่อนไข และทุกหน้าต้องมี <script> CDN ของ Lenis ใน <head>
//   <script src="https://cdn.jsdelivr.net/npm/lenis@1.3.23/dist/lenis.min.js"></script>

// export ไว้ให้หน้าอื่น scrollTo() แบบ smooth ตาม physics เดียวกับ Lenis
// (native scrollIntoView/window.scrollTo จะสู้กับ virtual scroll ของ Lenis แล้วกระตุก)
export let lenis;

if (typeof Lenis === "undefined") {
  console.warn("[smooth-scroll] ไม่พบ Lenis — ยังไม่ได้เติม <script> CDN ใน <head>");
} else {
  lenis = new Lenis({ autoRaf: true });
}
