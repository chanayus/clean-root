/* Overlay ที่ทุกหน้าใช้ร่วมกัน — cart drawer + notify modal
   markup อยู่ใน components/navbar.js

   Phase 1: ตะกร้าเป็น "แสดงผลอย่างเดียว" — ไฟล์นี้จึงมีแค่ลอจิกเปิด/ปิด
   ไม่มี store, ไม่นับจำนวน, ไม่คำนวณยอด (ยกไปทำตอนหน้า cart) */

/* ===================== Cart drawer ===================== */
const cartDrawer = document.querySelector("[data-cart-drawer]");
const cartScrim = document.querySelector("[data-cart-scrim]");

const setCartOpen = (open) => {
  cartDrawer?.classList.toggle("is-open", open);
  cartScrim?.classList.toggle("is-open", open);
};

// ปุ่มตะกร้าบน nav เป็นลิงก์ไปหน้า cart จริง — คลิกปกติให้ไปตามลิงก์
// ส่วนปุ่ม "เพิ่มลงตะกร้า" ในหน้าเปิด drawer แทน
document.querySelectorAll("[data-add-to-cart]").forEach((btn) =>
  btn.addEventListener("click", () => setCartOpen(true)),
);

document.querySelector("[data-cart-close]")?.addEventListener("click", () => setCartOpen(false));
cartScrim?.addEventListener("click", () => setCartOpen(false));

/* ===================== Notify via LINE modal =====================
   MVP: อธิบายก่อน แล้วส่งไป LINE OA
   อนาคต: เปลี่ยน href ของ [data-notify-cta] เป็น LIFF endpoint + productId
           เพื่อบันทึกว่า user คนนี้รอสินค้าตัวไหน แล้ว multicast เฉพาะกลุ่ม */
const notifyModal = document.querySelector("[data-notify-modal]");
const notifyScrim = document.querySelector("[data-notify-scrim]");

const setNotifyOpen = (open) => {
  notifyModal?.classList.toggle("is-open", open);
  notifyScrim?.classList.toggle("is-open", open);
};

document.querySelectorAll("[data-notify-seasonal]").forEach((btn) =>
  btn.addEventListener("click", () => {
    const card = btn.closest("[data-card]");
    const nameEl = notifyModal?.querySelector("[data-notify-product]");
    const cta = notifyModal?.querySelector("[data-notify-cta]");

    if (nameEl) nameEl.textContent = card?.dataset.productName || "สินค้า";
    if (cta) cta.dataset.productId = card?.dataset.productId || "";

    setNotifyOpen(true);
  }),
);

document.querySelector("[data-notify-close]")?.addEventListener("click", () => setNotifyOpen(false));
notifyScrim?.addEventListener("click", () => setNotifyOpen(false));

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  setCartOpen(false);
  setNotifyOpen(false);
});
