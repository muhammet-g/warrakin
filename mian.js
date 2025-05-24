const API_URL =
  "https://script.google.com/macros/s/AKfycbwWsXkg5EJ_5WGC5iX-ZIEUokPrSqhc3F2AMbwpjk1Y8UgE0H7nKUpBjh0kVCZyRLA/exec";

document.getElementById("checkBtn").addEventListener("click", () => {
  const code = document.getElementById("serial").value.trim();
  const msg = document.getElementById("message");
  if (!code) {
    msg.textContent = "⚠️ الرجاء إدخال الرقم التسلسلي.";
    return;
  }
  msg.textContent = "جارٍ التحقق…";

  fetch(`${API_URL}?code=${encodeURIComponent(code)}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.exists) {
        if (data.status === "active") {
          msg.innerHTML = `✔ العضو مفعل: <strong>${data.name}</strong>`;
        } else {
          msg.innerHTML = `✖ العضو موقوف: <strong>${data.name}</strong>`;
        }
      } else {
        msg.textContent = "✖ الرقم غير موجود في قاعدة البيانات.";
      }
    })
    .catch((err) => {
      console.error(err);
      msg.textContent = "⚠️ حدث خطأ، يرجى المحاولة لاحقًا.";
    });
});
