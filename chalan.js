import { validateChallan } from "./validation.js";
const form = document.querySelector("#challan-form");
const byId = (id) => document.getElementById(id);
const today = new Date();
byId("date").value =
  `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
const invalidate = () => {
  byId("print").disabled = true;
  byId("status").hidden = true;
  byId("document").hidden = true;
  byId("empty").hidden = false;
};
form.addEventListener("input", invalidate);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    const data = validateChallan(Object.fromEntries(new FormData(form)));
    byId("error").textContent = "";
    const labels = {
      holder: "Account holder",
      account: "Account number",
      bank: "Bank",
      branch: "Branch",
      ifsc: "IFSC",
      date: "Payment date",
      purpose: "Purpose",
    };
    const details = byId("details");
    details.replaceChildren();
    for (const [key, label] of Object.entries(labels)) {
      const group = document.createElement("div");
      const dt = document.createElement("dt");
      dt.textContent = label;
      const dd = document.createElement("dd");
      dd.textContent = data[key];
      group.append(dt, dd);
      details.append(group);
    }
    byId("reference").textContent =
      `CH-${data.date.replaceAll("-", "")}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    byId("total").textContent = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(Number(data.amount));
    byId("empty").hidden = true;
    byId("document").hidden = false;
    byId("print").disabled = false;
    byId("status").textContent = "Challan ready. Review the details before printing.";
    byId("status").hidden = false;
  } catch (error) {
    byId("error").textContent = error.message;
    invalidate();
  }
});
form.addEventListener("reset", () => {
  invalidate();
  byId("error").textContent = "";
});
byId("print").addEventListener("click", () => window.print());
