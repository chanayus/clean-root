/* พฤติกรรมของ footer (markup อยู่ใน components/footer.js)

   อยู่ตรงนี้ไม่ใช่ scripts/pages/<name>.js เพราะ footer เป็น component ที่ทุกหน้าโหลด
   ถ้าไปวางไว้ในไฟล์หน้า หน้าถัดไปจะต้องมานั่งจำว่าต้องเรียกเอง */
import { revealOnce, spring, stagger } from "./animation.js";

// ROOTS wordmark — ตัวอักษรไล่ขึ้นทีละตัวจากใต้เส้น
// เฝ้าที่ .footer-word (หน้าต่าง overflow:hidden) แล้วขยับ <span> ข้างในเป็นชุด
revealOnce(
  "[data-footer-word]",
  { y: "110%" },
  { y: "0%" },
  { amount: 0.25, child: "span", duration: 1, ease: spring, delay: stagger(0.1) },
);
