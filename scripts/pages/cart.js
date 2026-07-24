/* หน้า cart — ปรับจำนวน, ลบรายการ, โค้ดส่วนลด, สรุปยอด, ยืนยันคำสั่งซื้อ

   markup ของแถวเป็น mockup ที่ hardcode ไว้ใน cart.html — ไฟล์นี้ไม่ได้สร้าง markup เอง
   แต่อ่าน data-price / data-stock / data-unit จาก DOM แล้วคุมตัวเลขให้

   ของจริงรายการจะมาจาก Cart API ของผู้ให้บริการ checkout
   ตอนนั้นค่อยยกขึ้นไปเป็น module กลางที่ cart drawer ใน navbar ใช้ร่วมได้ */

import { formatBaht } from "../modules/format.js";

const FREE_SHIP_THRESHOLD = 500;

// โค้ดส่วนลดตัวอย่าง — ของจริงมาจากฝั่งระบบร้านค้า
const DISCOUNTS = {
  CLEANROOTS10: { type: "percent", value: 10, label: "ลด 10%" },
  ROOTS50: { type: "fixed", value: 50, label: "ลด ฿50" },
  CREATOR20: { type: "percent", value: 20, label: "โค้ดครีเอเตอร์ ลด 20%" },
};

let appliedDiscount = null;

const el = {
  list: document.querySelector("[data-cart-items]"),
  empty: document.querySelector("[data-cart-empty]"),
  summary: document.querySelector("[data-cart-summary]"),
  navCount: document.querySelector("[data-cart-count]"),
  subtotal: document.querySelector("[data-summary-subtotal]"),
  total: document.querySelector("[data-summary-total]"),
  discountRow: document.querySelector("[data-summary-discount-row]"),
  discountAmount: document.querySelector("[data-summary-discount]"),
  discountCode: document.querySelector("[data-summary-discount-code]"),
  ship: document.querySelector("[data-cart-ship]"),
  shipMsg: document.querySelector("[data-cart-ship-msg]"),
  shipFill: document.querySelector("[data-cart-ship-fill]"),
};

const rows = () => Array.from(el.list?.querySelectorAll("[data-cart-row]") ?? []);
const qtyOf = (row) => Number(row.querySelector("[data-qty]").textContent);

/* ===================== แถวสินค้า ===================== */
// เขียนตัวเลขของแถวเดียวให้ตรงกับจำนวนปัจจุบัน
function paintRow(row) {
  const price = Number(row.dataset.price);
  const stock = Number(row.dataset.stock);
  const qty = qtyOf(row);
  const left = stock - qty;
  const isLow = left <= 2;

  row.querySelector("[data-line-total]").textContent = formatBaht(qty * price);

  const stockMsg = row.querySelector("[data-stock-msg]");
  stockMsg.textContent = `เหลือ ${left} ${row.dataset.unit}${isLow ? " · ใกล้หมด" : ""}`;
  stockMsg.classList.toggle("text-cr-rust", isLow);
  stockMsg.classList.toggle("text-cr-green", !isLow);

  row.querySelector("[data-dec]").disabled = qty <= 1;
  row.querySelector("[data-inc]").disabled = qty >= stock;
}

function changeQty(row, step) {
  const next = qtyOf(row) + step;
  if (next < 1 || next > Number(row.dataset.stock)) return;

  row.querySelector("[data-qty]").textContent = next;
  paintRow(row);
  updateSummary();
}

function initRows() {
  rows().forEach((row) => {
    paintRow(row);

    row.querySelector("[data-inc]").addEventListener("click", () => changeQty(row, 1));
    row.querySelector("[data-dec]").addEventListener("click", () => changeQty(row, -1));
    row.querySelector("[data-remove]").addEventListener("click", () => {
      row.remove();
      updateSummary();
    });
  });
}

/* ===================== สรุปยอด ===================== */
function discountAmount(sub) {
  if (!appliedDiscount) return 0;

  return appliedDiscount.type === "percent" ? Math.round((sub * appliedDiscount.value) / 100) : Math.min(sub, appliedDiscount.value);
}

function updateSummary() {
  const current = rows();
  const hasItems = current.length > 0;

  if (el.list) el.list.hidden = !hasItems;
  if (el.empty) el.empty.hidden = hasItems;
  if (el.summary) el.summary.hidden = !hasItems;

  const sub = current.reduce((sum, row) => sum + qtyOf(row) * Number(row.dataset.price), 0);
  const discount = discountAmount(sub);
  const total = sub - discount;

  if (el.subtotal) el.subtotal.textContent = formatBaht(sub);
  if (el.total) el.total.textContent = formatBaht(total);

  if (el.discountRow) {
    const show = Boolean(appliedDiscount) && discount > 0;
    el.discountRow.hidden = !show;

    if (show) {
      el.discountAmount.textContent = `-${formatBaht(discount)}`;
      el.discountCode.textContent = `(${appliedDiscount.code})`;
    }
  }

  if (el.navCount) {
    const count = current.reduce((sum, row) => sum + qtyOf(row), 0);
    el.navCount.textContent = count;
    el.navCount.hidden = count === 0;
  }

  // แถบส่งฟรีคิดจากยอดหลังหักส่วนลด
  if (el.shipFill) {
    const remain = FREE_SHIP_THRESHOLD - total;
    el.shipFill.style.width = `${Math.min(100, (total / FREE_SHIP_THRESHOLD) * 100)}%`;
    el.ship?.classList.toggle("is-complete", remain <= 0);
    el.shipMsg.innerHTML = remain > 0 ? `ซื้ออีก <b class="font-heading font-bold">${formatBaht(remain)}</b> รับส่งฟรี` : `คุณได้รับ <b class="font-heading font-bold">ส่งฟรี</b> แล้ว`;
  }
}

/* ===================== โค้ดส่วนลด ===================== */
function initDiscount() {
  const input = document.querySelector("[data-discount-input]");
  const apply = document.querySelector("[data-discount-apply]");
  const msg = document.querySelector("[data-discount-msg]");
  if (!input || !apply || !msg) return;

  const submit = () => {
    const code = input.value.trim().toUpperCase();
    if (!code) return;

    msg.hidden = false;

    if (!DISCOUNTS[code]) {
      msg.className = "mb-4 px-0.5 text-xs text-cr-rust";
      msg.textContent = "โค้ดไม่ถูกต้องหรือหมดอายุแล้ว";
      return;
    }

    appliedDiscount = { code, ...DISCOUNTS[code] };
    msg.className = "mb-4 px-0.5 text-xs text-cr-green";
    msg.textContent = `ใช้โค้ด ${code} สำเร็จ — ${DISCOUNTS[code].label}`;
    input.value = "";
    updateSummary();
  };

  apply.addEventListener("click", submit);
  input.addEventListener("keydown", (e) => e.key === "Enter" && submit());
}

/* ===================== ยืนยันคำสั่งซื้อ =====================
   ของจริงปุ่มนี้จะพาไปหน้า checkout ของผู้ให้บริการ ที่นี่จำลองผลลัพธ์ไว้ให้เห็น flow */
function initCheckout() {
  const btn = document.querySelector("[data-checkout]");
  const overlay = document.querySelector("[data-order-confirm]");
  const orderId = document.querySelector("[data-order-id]");
  if (!btn || !overlay) return;

  btn.addEventListener("click", () => {
    if (!rows().length) return;

    if (orderId) orderId.textContent = Math.floor(10000 + Math.random() * 89999);
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add("is-shown"));
  });
}

initRows();
updateSummary();
initDiscount();
initCheckout();
