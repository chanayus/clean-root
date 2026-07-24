/* หน้า product — สลับรูปในแกลเลอรี, ปรับจำนวน, ยอดรวมบนปุ่มซื้อ

   ปุ่ม [data-add-to-cart] เปิด cart drawer ให้แล้วโดย scripts/modules/overlays.js
   ราคากับสต็อกฮาร์ดโค้ดไว้ตรงนี้ — ยังไม่ได้อ่านจาก data-* attribute */

import { formatBaht } from "../modules/format.js";

const PRICE = 120;
const STOCK = 8;

/* ===================== แกลเลอรี =====================
   ตอนนี้มีรูปจริงใบเดียว แถบ thumb เลยยังว่าง — โค้ดนี้รอไว้แล้ว
   พอเพิ่ม <button class="pd-thumb" data-thumb="..."> ในแถบ มันจะทำงานทันที */
function initGallery() {
  const main = document.querySelector("[data-gallery-main]");
  const thumbs = Array.from(document.querySelectorAll("[data-thumb]"));
  if (!main || !thumbs.length) return;

  thumbs.forEach((thumb) =>
    thumb.addEventListener("click", () => {
      thumbs.forEach((t) => t.classList.toggle("is-active", t === thumb));

      // fade ออกก่อนแล้วค่อยเปลี่ยน src กันภาพกระพริบสลับ
      main.style.opacity = "0";
      setTimeout(() => {
        main.src = thumb.dataset.thumb;
        main.style.opacity = "1";
      }, 150);
    }),
  );
}

/* ===================== จำนวน + ยอดรวม ===================== */
function initQty() {
  const dec = document.querySelector("[data-qty-dec]");
  const inc = document.querySelector("[data-qty-inc]");
  const value = document.querySelector("[data-qty-value]");
  const total = document.querySelector("[data-buy-total]");
  if (!dec || !inc || !value) return;

  let qty = Number(value.textContent) || 1;

  const paint = () => {
    value.textContent = qty;
    if (total) total.textContent = formatBaht(qty * PRICE);
    dec.disabled = qty <= 1;
    inc.disabled = qty >= STOCK;
  };

  dec.addEventListener("click", () => {
    qty = Math.max(1, qty - 1);
    paint();
  });

  inc.addEventListener("click", () => {
    qty = Math.min(STOCK, qty + 1);
    paint();
  });

  paint();
}

initGallery();
initQty();
