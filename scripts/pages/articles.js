/* หน้า articles — สลับหน้าด้วย [hidden] แทนการ render array จาก JS
   การ์ดทั้ง 14 ใบ + featured hardcode ไว้ใน articles.html แล้ว ไฟล์นี้แค่คุมว่าใบไหนโชว์
   ของจริง: pagination น่าจะมาจาก Blog API (cursor-based) แทนสลับ [hidden] ฝั่ง client */

import { lenis } from "../modules/smooth-scroll.js";

// เว้นที่ให้ nav แบบ fixed ทับ — ตรงกับ 9.375rem ที่ตั้งไว้ก่อนหน้านี้
const NAV_SCROLL_OFFSET = -150;

function initPagination() {
  const featured = document.querySelector("[data-art-featured]");
  const cards = Array.from(document.querySelectorAll("[data-art-card]"));
  const pageButtons = Array.from(document.querySelectorAll("[data-art-page-num]"));
  const prev = document.querySelector("[data-art-prev]");
  const next = document.querySelector("[data-art-next]");
  const grid = document.querySelector("[data-art-grid]");

  const totalPages = pageButtons.length;
  let current = 1;

  function render() {
    if (featured) featured.hidden = current !== 1;
    cards.forEach((card) => {
      card.hidden = Number(card.dataset.artCard) !== current;
    });
    pageButtons.forEach((btn) => btn.classList.toggle("is-active", Number(btn.dataset.artPageNum) === current));
    if (prev) prev.disabled = current <= 1;
    if (next) next.disabled = current >= totalPages;
  }

  function goTo(page) {
    current = Math.min(totalPages, Math.max(1, page));
    render();
    lenis.scrollTo(0);
  }

  pageButtons.forEach((btn) => btn.addEventListener("click", () => goTo(Number(btn.dataset.artPageNum))));
  prev?.addEventListener("click", () => goTo(current - 1));
  next?.addEventListener("click", () => goTo(current + 1));

  render();
}

initPagination();
