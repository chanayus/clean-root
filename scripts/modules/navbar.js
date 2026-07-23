/* พฤติกรรมของ navbar + chrome รอบๆ (markup อยู่ใน components/navbar.js)
   - scrolled state: พอเลย 70% ของความสูงจอ nav เปลี่ยนเป็นพื้นครีม + สลับโลโก้
   - nav spy: ไฮไลต์เมนูที่ตรงกับ section ที่กำลังดูอยู่
   - เมนูมือถือ / search panel / account dropdown

   หมายเหตุ: โปรเจกต์นี้ไม่ใช้ hide-on-scroll ของ boilerplate — nav ค้างบนตลอด */

const navbar = document.querySelector("#navbar");
const mobileNav = document.querySelector("#mobile-nav");

/* ===================== เมนูมือถือ ===================== */
// JS แค่สลับ class, transition เป็นหน้าที่ของ CSS (styles/base.css)
document.querySelectorAll(".mobile-nav-toggle").forEach((btn) =>
  btn.addEventListener("click", () => mobileNav?.classList.toggle("active")),
);

// เลือกเมนูแล้วปิดเอง
mobileNav?.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => mobileNav.classList.remove("active")),
);

/* ===================== scrolled state ===================== */
if (navbar) {
  const onScroll = () => navbar.classList.toggle("is-scrolled", window.scrollY > window.innerHeight * 0.7);

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ===================== nav spy ===================== */
// ลิงก์ที่มี data-nav-target จะสว่างขึ้นเมื่อ section ที่ชี้ไปอยู่กลางจอ
const spyLinks = Array.from(document.querySelectorAll("[data-nav-target]"));

if (spyLinks.length) {
  const spied = spyLinks
    .map((link) => ({ link, section: document.getElementById(link.dataset.navTarget) }))
    .filter((entry) => entry.section);

  if (spied.length) {
    const applySpy = () => {
      const mid = window.innerHeight * 0.4;
      const current = spied.find(({ section }) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= mid && rect.bottom >= mid;
      });

      spyLinks.forEach((link) => link.classList.toggle("is-active", link === current?.link));
    };

    applySpy();
    window.addEventListener("scroll", applySpy, { passive: true });
  }
}

/* ===================== Search panel ===================== */
const searchPanel = document.querySelector("[data-search-panel]");

if (searchPanel) {
  const input = searchPanel.querySelector("[data-search-input]");

  const openSearch = () => {
    searchPanel.classList.add("is-open");
    setTimeout(() => input?.focus(), 300);
  };
  const closeSearch = () => searchPanel.classList.remove("is-open");

  document.querySelector("[data-search-toggle]")?.addEventListener("click", openSearch);
  document.querySelector("[data-search-close]")?.addEventListener("click", closeSearch);
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeSearch());

  // กดคำค้นยอดนิยมแล้วเติมลงช่องค้นหาให้เลย
  searchPanel.querySelectorAll(".search-suggest").forEach((btn) =>
    btn.addEventListener("click", () => {
      if (!input) return;
      input.value = btn.textContent.trim();
      input.focus();
    }),
  );
}

/* ===================== Account dropdown ===================== */
const accountWrap = document.querySelector("[data-account]");

if (accountWrap) {
  const toggle = accountWrap.querySelector("[data-account-toggle]");
  const menu = accountWrap.querySelector("[data-account-menu]");

  const setOpen = (open) => {
    menu?.classList.toggle("is-open", open);
    toggle?.setAttribute("aria-expanded", String(open));
  };

  toggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(!menu?.classList.contains("is-open"));
  });

  document.addEventListener("click", (e) => {
    if (!accountWrap.contains(e.target)) setOpen(false);
  });

  document.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
}
