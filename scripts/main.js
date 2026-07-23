import "./modules/navbar.js";
import "./modules/footer.js";
import "./modules/overlays.js";
import "./modules/animation.js";

// Lenis smooth scroll — เปิดใช้ในโปรเจกต์นี้ (CDN <script> อยู่ใน <head> ของทุกหน้า)
import "./modules/smooth-scroll.js";

// ไอคอน SVG แบบ mask — <span class="svg-icon" data-src="./icons/arrow.svg"></span>
document.querySelectorAll(".svg-icon")?.forEach((el) => {
  const src = el.getAttribute("data-src");
  el.style.setProperty("--src", `url(${src})`);
});
