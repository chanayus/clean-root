/* Navbar + chrome ที่ทุกหน้าใช้ร่วมกัน
   ตัว nav, search panel, cart drawer, notify modal และ toast อยู่ในไฟล์นี้ทั้งหมด
   เพื่อให้ทุกหน้าได้ชุดเดียวกันโดยไม่ต้อง copy markup

   พฤติกรรมอยู่ที่ scripts/modules/navbar.js (nav state, search, account, mobile)
   และ scripts/modules/overlays.js (cart drawer, notify modal)

   Phase 1: ตะกร้าเป็น "แสดงผลอย่างเดียว" — รายการใน drawer เป็นตัวอย่างที่ hardcode ไว้ */

const ICON = {
  search: /*html*/ `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>`,
  account: /*html*/ `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
  cart: /*html*/ `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>`,
  bag: /*html*/ `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`,
  heart: /*html*/ `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`,
  close: /*html*/ `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`,
  line: (size) =>
    /*html*/ `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 5.64 2 10.13c0 4.02 3.55 7.39 8.35 8.03.32.07.77.21.88.49.1.25.06.64.03.9l-.14.85c-.04.25-.2.98.86.53s5.7-3.36 7.78-5.75C21.13 13.36 22 11.85 22 10.13 22 5.64 17.52 2 12 2Z"></path></svg>`,
};

const NAV_LINKS = [
  { href: "index.html#products", target: "products", label: "ผลผลิตประจำฤดู" },
  { href: "index.html#about", target: "about", label: "เรื่องราวของเรา" },
  { href: "articles.html", target: "", label: "บทความ" },
];

class Navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
      <header id="navbar" class="nav fixed inset-x-0 top-0 z-50 flex items-center justify-between px-12 py-5 text-white max-lg:px-8 max-md:px-6">
        <!-- โลโก้เป็น mask ไม่ใช่ <img> — สีมาจาก background-color จึงสลับตามสถานะ nav ได้
             โดยใช้ไฟล์เดียว ไม่ต้องมีรูปสองใบที่สัดส่วนไม่เท่ากัน -->
        <a href="index.html" class="nav-mark flex items-center gap-2.5 text-inherit">
          <span class="brand-logo nav-logo" role="img" aria-label="CleanRoots"></span>
        </a>

        <nav class="flex gap-8 text-sm font-medium max-lg:hidden" aria-label="เมนูหลัก">
          ${NAV_LINKS.map((l) => /*html*/ `<a href="${l.href}" class="nav-link"${l.target ? ` data-nav-target="${l.target}"` : ""}>${l.label}</a>`).join("")}
        </nav>

        <div class="flex items-center gap-1.5">
          <button type="button" class="nav-icon" data-search-toggle aria-label="ค้นหา">${ICON.search}</button>

          <div class="relative" data-account>
            <button type="button" class="nav-icon" data-account-toggle aria-label="บัญชีของฉัน" aria-expanded="false">${ICON.account}</button>

            <div class="account-menu w-72.5 rounded-2xl border border-border-soft bg-white p-5 text-text-primary" data-account-menu>
              <div class="mb-4">
                <strong class="mb-1 block font-heading text-base font-bold">ยินดีต้อนรับ</strong>
                <span class="block text-xs leading-normal text-text-muted">เข้าสู่ระบบเพื่อติดตามคำสั่งซื้อและรับสิทธิพิเศษ</span>
              </div>
              <button type="button" class="btn btn-line btn-full mb-2">${ICON.line(18)} เข้าสู่ระบบด้วย LINE</button>
              <button type="button" class="btn btn-outline w-full py-2.5 text-caption">เข้าสู่ระบบด้วยอีเมล</button>
              <hr class="my-4 border-border-soft" />
              <a href="account.html" class="account-menu-link">${ICON.bag} คำสั่งซื้อของฉัน</a>
              <a href="account.html" class="account-menu-link">${ICON.heart} รายการโปรด</a>
              <p class="mt-3.5 text-center text-xs text-text-muted">
                ยังไม่มีบัญชี? <a href="account.html" class="font-semibold text-cr-green hover:underline">สมัครสมาชิก</a>
              </p>
            </div>
          </div>

          <a href="cart.html" class="nav-icon" data-cart-toggle aria-label="ตะกร้า">
            ${ICON.cart}
            <span class="nav-cart-count" data-cart-count>2</span>
          </a>

          <button type="button" class="mobile-nav-toggle nav-icon lg:hidden" aria-label="เปิดเมนู">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" />
            </svg>
          </button>
        </div>
      </header>

      <!-- ================= MOBILE NAV ================= -->
      <section id="mobile-nav" class="fixed inset-0 z-60 flex flex-col justify-center gap-1 bg-cr-cream px-8 lg:hidden">
        <button type="button" class="mobile-nav-toggle nav-icon absolute top-5 right-6 text-text-primary" aria-label="ปิดเมนู">${ICON.close}</button>
        ${NAV_LINKS.map((l) => /*html*/ `<a href="${l.href}" class="border-b border-border-soft py-4 font-heading text-2xl font-semibold text-text-primary">${l.label}</a>`).join("")}
        <a href="cart.html" class="border-b border-border-soft py-4 font-heading text-2xl font-semibold text-text-primary">ตะกร้าสินค้า</a>
        <a href="account.html" class="btn btn-primary mt-8">เข้าสู่ระบบ</a>
      </section>

      <!-- ================= SEARCH PANEL ================= -->
      <div class="search-panel" data-search-panel>
        <div class="relative mx-auto max-w-190 px-12 pt-10 pb-9 max-lg:px-8 max-md:px-6">
          <button type="button" class="absolute top-4 right-12 text-text-primary max-lg:right-8 max-md:right-6" data-search-close aria-label="ปิดการค้นหา">${ICON.close}</button>
          <div class="flex items-center gap-3.5 border-b-2 border-cr-green pb-3.5 text-cr-green">
            ${ICON.search}
            <input type="search" placeholder="ค้นหาผลผลิต เช่น ข้าวกล้อง, กระเทียม..." data-search-input aria-label="ค้นหาผลผลิต"
              class="flex-1 border-none bg-transparent text-xl text-text-primary outline-none placeholder:text-text-muted" />
          </div>
          <div class="mt-5 flex flex-wrap items-center gap-2.5">
            <span class="mr-1 font-heading text-xs font-semibold text-text-muted">ยอดนิยม</span>
            <button type="button" class="search-suggest">ข้าวกล้องออร์แกนิก</button>
            <button type="button" class="search-suggest">กระเทียม</button>
            <button type="button" class="search-suggest">หอมแดง</button>
            <button type="button" class="search-suggest">ของหมักดอง</button>
          </div>
        </div>
      </div>

      <!-- ================= CART DRAWER (Phase 1: แสดงผลอย่างเดียว) ================= -->
      <div class="overlay-scrim" data-cart-scrim></div>
      <aside class="cart-drawer flex flex-col bg-white text-text-primary" data-cart-drawer aria-label="ตะกร้าสินค้า">
        <div class="flex items-center justify-between border-b border-border-soft px-5 py-5 font-heading font-semibold">
          <span>ตะกร้าสินค้าของคุณ</span>
          <button type="button" data-cart-close aria-label="ปิดตะกร้า">${ICON.close}</button>
        </div>

        <div class="border-b border-border-soft px-5 py-4">
          <p class="mb-2 text-caption text-cr-green">ซื้ออีก <b class="font-heading font-bold">฿290</b> รับส่งฟรี</p>
          <div class="h-1.5 overflow-hidden rounded-full bg-panel-light">
            <span class="block h-full w-[42%] rounded-full bg-cr-green"></span>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto px-5">
          <div class="cart-item">
            <div>
              <div class="font-heading text-sm font-semibold">ข้าวกล้องออร์แกนิก</div>
              <div class="text-xs text-text-muted">เหลือ 7 กก.</div>
            </div>
            <span class="font-heading text-sm font-bold whitespace-nowrap">฿120</span>
          </div>
          <div class="cart-item">
            <div>
              <div class="font-heading text-sm font-semibold">หน่อไม้ดอง</div>
              <div class="text-xs text-cr-rust">เหลือ 2 ถุง · ใกล้หมด</div>
            </div>
            <span class="font-heading text-sm font-bold whitespace-nowrap">฿90</span>
          </div>
        </div>

        <div class="border-t border-border-soft px-5 py-5">
          <div class="mb-3.5 flex justify-between font-heading font-bold">
            <span>ยอดรวม</span><span>210 บาท</span>
          </div>
          <a href="cart.html" class="btn btn-primary btn-full">ดูตะกร้า / ชำระเงิน</a>
        </div>
      </aside>

      <!-- ================= NOTIFY VIA LINE MODAL ================= -->
      <div class="overlay-scrim" data-notify-scrim></div>
      <div class="notify-modal bg-white p-8 text-center text-text-primary" data-notify-modal role="dialog" aria-modal="true" aria-labelledby="notify-title">
        <button type="button" class="absolute top-4 right-4 text-text-muted" data-notify-close aria-label="ปิด">${ICON.close}</button>
        <div class="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-panel-light text-cr-green">${ICON.line(26)}</div>
        <h3 id="notify-title" class="mb-2.5">เราจะแจ้งคุณผ่าน LINE</h3>
        <p class="mb-5 text-caption leading-relaxed text-text-secondary">
          เมื่อ <strong class="font-heading font-bold text-cr-green" data-notify-product>สินค้า</strong> พร้อมส่งตามรอบเก็บเกี่ยว เราจะส่งข้อความบอกคุณทันที
        </p>
        <a href="#" class="btn btn-line btn-full" data-notify-cta>${ICON.line(18)} เพิ่มเพื่อนใน LINE</a>
        <p class="mt-3.5 text-xs text-text-muted">เพิ่มเพื่อนครั้งเดียว รับข่าวผลผลิตทุกฤดู · ยกเลิกได้ทุกเมื่อ</p>
      </div>

      <div class="toast" data-toast role="status" aria-live="polite"></div>
    `;
  }
}

customElements.define("navbar-component", Navbar);
