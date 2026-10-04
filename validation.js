export function validateChallan(data) {
  const clean = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, String(value).trim()]),
  );
  for (const field of ["holder", "bank", "branch", "purpose"]) {
    if (
      !clean[field] ||
      clean[field].length > (field === "purpose" ? 120 : field === "holder" ? 100 : 80)
    )
      throw new Error("Enter valid account holder, bank, branch, and purpose details.");
  }
  if (!/^\d{9,18}$/.test(clean.account))
    throw new Error("Account number must contain 9–18 digits.");
  clean.ifsc = clean.ifsc.toUpperCase();
  if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(clean.ifsc))
    throw new Error("Enter an 11-character IFSC code.");
  if (
    !/^\d+(?:\.\d{1,2})?$/.test(clean.amount) ||
    Number(clean.amount) <= 0 ||
    Number(clean.amount) > 99999999.99
  )
    throw new Error("Enter an amount between ₹0.01 and ₹99,999,999.99 with at most two decimals.");
  const date = new Date(`${clean.date}T00:00:00Z`);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(clean.date) ||
    !Number.isFinite(date.getTime()) ||
    date.toISOString().slice(0, 10) !== clean.date
  )
    throw new Error("Enter a valid payment date.");
  return clean;
}
