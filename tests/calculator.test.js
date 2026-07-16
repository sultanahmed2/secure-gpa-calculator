import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateAverage,
  getRating,
  validateCourse
} from "../src/calculator.js";

test("يحسب المعدل الموزون ومجموع الساعات بشكل صحيح", () => {
  const result = calculateAverage([
    { name: "رياضيات", grade: 90, credits: 3 },
    { name: "برمجة", grade: 80, credits: 2 }
  ]);

  assert.deepEqual(result, { average: 86, totalCredits: 5 });
});

test("يعرض التقدير الصحيح", () => {
  assert.equal(getRating(95), "ممتاز");
  assert.equal(getRating(84), "جيد جداً");
  assert.equal(getRating(55), "راسب");
});

test("يرفض الدرجات خارج النطاق والقيم غير النهائية", () => {
  assert.throws(
    () => validateCourse({ grade: 101, credits: 3 }),
    /بين 0 و100/
  );
  assert.throws(
    () => validateCourse({ grade: Infinity, credits: 3 }),
    /بين 0 و100/
  );
});

test("يرفض الساعات السالبة أو الكسرية", () => {
  assert.throws(
    () => validateCourse({ grade: 90, credits: -2 }),
    /بين 1 و10/
  );
  assert.throws(
    () => validateCourse({ grade: 90, credits: 2.5 }),
    /بين 1 و10/
  );
});

test("يرفض قائمة المواد الفارغة", () => {
  assert.throws(() => calculateAverage([]), /مادة واحدة/);
});

test("يحد طول اسم المادة لمنع المدخلات الضخمة", () => {
  assert.throws(
    () => validateCourse({ name: "أ".repeat(61), grade: 90, credits: 3 }),
    /60/
  );
});
