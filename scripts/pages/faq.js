/* หน้า faq — accordion เปิดทีละข้อในแต่ละกลุ่ม

   CSS animate ไป height:auto ไม่ได้ จึงต้องอ่าน scrollHeight จริงแล้วเซ็ต max-height เอง
   ตอนปิดล้างค่าออกให้กลับไปใช้ max-height:0 ที่ประกาศไว้ใน styles/pages/faq.css */

function setOpen(item, open) {
  const answer = item.querySelector(".faq-a");
  const button = item.querySelector("[data-faq-toggle]");

  item.classList.toggle("is-open", open);
  button?.setAttribute("aria-expanded", String(open));
  if (answer) answer.style.maxHeight = open ? `${answer.scrollHeight}px` : "";
}

function initAccordion() {
  document.querySelectorAll("[data-faq-toggle]").forEach((button) => {
    const item = button.closest(".faq-item");
    if (!item) return;

    button.addEventListener("click", () => {
      const willOpen = !item.classList.contains("is-open");

      // เปิดทีละข้อ — ปิดข้ออื่นในกลุ่มเดียวกันก่อน
      item
        .closest(".faq-list")
        ?.querySelectorAll(".faq-item.is-open")
        .forEach((other) => other !== item && setOpen(other, false));

      setOpen(item, willOpen);
    });
  });

  // ย่อหน้าจอแล้วความสูงของคำตอบเปลี่ยน — คำนวณข้อที่เปิดอยู่ใหม่
  window.addEventListener("resize", () => {
    document.querySelectorAll(".faq-item.is-open").forEach((item) => setOpen(item, true));
  });
}

initAccordion();
