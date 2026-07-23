/* หน้า account — สลับแท็บ "คำสั่งซื้อ / ข้อมูลส่วนตัว" + toast ตอนบันทึกโปรไฟล์

   toast markup มาจาก components/navbar.js (ทุกหน้าโหลดอยู่แล้ว)
   แต่ยังไม่มีหน้าไหนเรียกใช้จริง — หน้านี้เป็นหน้าแรก */

/* ===================== แท็บ ===================== */
function initTabs() {
  const tabs = Array.from(document.querySelectorAll("[data-acc-tab]"));
  const panels = Array.from(document.querySelectorAll("[data-acc-panel]"));

  tabs.forEach((tab) =>
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.toggle("is-active", t === tab);
        t.setAttribute("aria-selected", String(t === tab));
      });
      panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.accPanel === tab.dataset.accTab));
    }),
  );
}

/* ===================== บันทึกโปรไฟล์ ===================== */
function initSave() {
  const toast = document.querySelector("[data-toast]");

  document.querySelector("[data-acc-save]")?.addEventListener("click", () => {
    if (!toast) return;

    toast.textContent = "บันทึกข้อมูลเรียบร้อยแล้ว 🌱";
    toast.classList.add("is-shown");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove("is-shown"), 2400);
  });
}

initTabs();
initSave();
