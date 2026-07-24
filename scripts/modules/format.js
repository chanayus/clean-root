// ตัวช่วยจัดรูปแบบราคาเป็นบาท ใช้ร่วมกันระหว่าง cart.js กับ product.js
export const formatBaht = (n) => `฿${n.toLocaleString("th-TH")}`;
