// Lenis — เปิดใช้ในโปรเจกต์นี้ (main.js import ไม่มีเงื่อนไข, ทุกหน้ามี <script> CDN lenis@1.3.23 ใน <head>)

// export ให้หน้าอื่นเรียก .scrollTo() ได้ — native scrollIntoView จะสู้กับ virtual scroll ของ Lenis แล้วกระตุก
export let lenis;

if (typeof Lenis === "undefined") {
  console.warn("[smooth-scroll] ไม่พบ Lenis — ยังไม่ได้เติม <script> CDN ใน <head>");
} else {
  lenis = new Lenis({ autoRaf: true });
}
