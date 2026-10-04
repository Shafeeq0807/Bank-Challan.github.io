import test from "node:test";
import assert from "node:assert/strict";
import { validateChallan } from "../validation.js";
const valid = {
  holder: "Shafeeq",
  account: "01234567890",
  bank: "State Bank",
  branch: "Coimbatore",
  ifsc: "sbin0001234",
  amount: "1250.50",
  date: "2026-10-04",
  purpose: "Course fees",
};
test("normalizes input without dropping account leading zero", () => {
  const data = validateChallan(valid);
  assert.equal(data.ifsc, "SBIN0001234");
  assert.equal(data.account, "01234567890");
});
test("rejects invalid financial and date details", () => {
  for (const patch of [
    { amount: "NaN" },
    { amount: "-1" },
    { amount: "0" },
    { amount: "1.001" },
    { account: "123" },
    { ifsc: "ABCD1234" },
    { date: "2026-02-30" },
    { holder: " " },
  ])
    assert.throws(() => validateChallan({ ...valid, ...patch }));
});
