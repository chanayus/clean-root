import "./modules/navbar.js";
import "./modules/overlays.js";
import "./modules/animation.js";

// Lenis smooth scroll — เปิดใช้ในโปรเจกต์นี้ (CDN <script> อยู่ใน <head> ของทุกหน้า)
import "./modules/smooth-scroll.js";
import { revealOnce, spring, stagger } from "./modules/animation.js";

// ไอคอน SVG แบบ mask — <span class="svg-icon" data-src="./icons/arrow.svg"></span>
document.querySelectorAll(".svg-icon")?.forEach((el) => {
  const src = el.getAttribute("data-src");
  el.style.setProperty("--src", `url(${src})`);
});

function initFooterWord() {
  const footerWord = document.querySelector("[data-footer-word]");

  if (!footerWord) return;
  revealOnce(footerWord, { y: "110%" }, { y: "0%" }, { amount: 0.25, child: "span", duration: 1, ease: spring, delay: stagger(0.1) });
}

initFooterWord();

