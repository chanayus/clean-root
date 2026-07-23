/* Footer เต็มจอ — พื้นเหลือง + ROOTS wordmark ยักษ์ (Fraunces)
   คอลัมน์เมนูใส่เฉพาะลิงก์ที่มีปลายทางจริง */

const SOCIAL = {
  instagram: /*html*/ `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>`,
  facebook: /*html*/ `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`,
  youtube: /*html*/ `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>`,
  line: /*html*/ `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 5.64 2 10.13c0 4.02 3.55 7.39 8.35 8.03.32.07.77.21.88.49.1.25.06.64.03.9l-.14.85c-.04.25-.2.98.86.53s5.7-3.36 7.78-5.75C21.13 13.36 22 11.85 22 10.13 22 5.64 17.52 2 12 2Z"></path></svg>`,
};

const WORDMARK = "ROOTS";

class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
      <footer id="footer" class="flex min-h-screen flex-col overflow-hidden bg-cr-gold px-12 pt-22 pb-6 text-text-primary max-lg:min-h-fit max-lg:px-8 max-lg:pt-16 max-md:px-6">
        <div class="mb-auto grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-x-10 gap-y-8 max-lg:grid-cols-2 max-lg:gap-x-5 max-lg:gap-y-9">
          <section class="flex max-w-75 flex-col gap-8 max-lg:col-span-full max-lg:max-w-none">
            <div>
              <span class="brand-logo mb-3 h-13 text-cr-green" role="img" aria-label="CleanRoots"></span>
              <p class="text-text-on-gold max-w-65 text-sm">ดูแลดินวันนี้ เพื่ออาหารที่ดีในวันพรุ่งนี้</p>
            </div>
            <div>
              <div class="mb-3 font-heading font-bold">เข้าร่วมสวนของเรา</div>
              <a href="#" class="btn btn-line">${SOCIAL.line} เพิ่มเพื่อน LINE</a>
              <p class="text-text-on-gold mt-3 max-w-60 text-xs">รับข่าว การแจ้งเตือนเมื่อมีสินค้าออกตามฤดูกาล</p>
            </div>
          </section>

          <div class="footer-col" aria-label="ซื้อของ">
            <div class="footer-col-head">ซื้อของ</div>
            <a href="">ผลผลิตประจำฤดู</a>
            <a href="">ข้าวกล้องออร์แกนิก</a>
          </div>
          <div class="footer-col" aria-label="รู้จักสวน">
            <div class="footer-col-head">รู้จักสวน</div>
            <a href="">เรื่องราวของเรา</a>
            <a href="">บันทึกจากสวน</a>
          </div>
          <div class="footer-col" aria-label="ติดต่อ & ช่วยเหลือ">
            <div class="footer-col-head">ติดต่อ &amp; ช่วยเหลือ</div>
            <a href="">คำสั่งซื้อของฉัน</a>
            <a href="">คำถามที่พบบ่อย</a>
          </div>
      
        </div>

        <!-- แยกทีละตัวเพื่อให้ไล่ขึ้นทีละตัวได้ — ต่อกันไม่มีเว้นวรรค
             เพราะ inline-block จะกินช่องว่างใน markup มาเป็นช่องไฟจริง -->
        <div class="footer-word" data-footer-word aria-hidden="true">${[...WORDMARK].map((letter) => `<span>${letter}</span>`).join("")}</div>

        <div class="text-text-on-gold mt-4 flex flex-wrap items-center justify-between gap-3.5 border-t border-text-primary/15 pt-5 text-[11px] max-lg:flex-col max-lg:items-start">
          <div class="flex flex-wrap items-center gap-4">
            <div class="flex gap-2">
              <a href="#" class="footer-social" aria-label="Instagram">${SOCIAL.instagram}</a>
              <a href="#" class="footer-social" aria-label="Facebook">${SOCIAL.facebook}</a>
              <a href="#" class="footer-social" aria-label="YouTube">${SOCIAL.youtube}</a>
            </div>
            <span class="text-text-primary/30">|</span>
            <span>© 2569 CleanRoots สงวนลิขสิทธิ์</span>
          </div>
          <div class="flex flex-wrap gap-5">
            <a href="#" class="hover:underline">นโยบายความเป็นส่วนตัว</a>
            <a href="#" class="hover:underline">ข้อกำหนดและเงื่อนไข</a>
            <a href="#" class="hover:underline">นโยบายการคืนสินค้า</a>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("footer-component", Footer);
