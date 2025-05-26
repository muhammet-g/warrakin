// عدّل هذا إلى رابطك الفعلي الجديد بعد إعادة النشر
const API_URL =
  "https://script.google.com/macros/s/AKfycbwXFVurv5vwiegJ9qt9oNiphnQPLejQYWhvoY2eUTTT31i0BZ9wiVacm6rpl-ctwHSk/exec";

function handleResponse(data) {
  const msg = document.getElementById("message");
  // إزالة أي كلاسات قديمة
  msg.classList.remove("success", "error");

  if (data.exists) {
    if (data.status === "active") {
      msg.classList.add("success");
      msg.innerHTML = `✔ العضو <strong>${data.name}</strong> لا يزال <em>نشيطًا وفعالًا</em> في مجالس الورّاقين.`;
    } else {
      msg.classList.add("error");
      msg.innerHTML = `✖ العضو <strong>${data.name}</strong> لم يعد موجودًا في مجالس الورّاقين.`;
    }
  } else {
    msg.classList.add("error");
    msg.textContent = "✖ الرقم غير موجود في قاعدة البيانات.";
  }
}

document.getElementById("checkBtn").addEventListener("click", () => {
  const code = document.getElementById("serial").value.trim();
  const msg = document.getElementById("message");

  if (!code) {
    msg.textContent = "⚠️ الرجاء إدخال الرقم التسلسلي.";
    return;
  }
  msg.textContent = "جارٍ التحقق…";

  // إزالة أي JSONP سابق
  document.querySelectorAll("script[data-jsonp]").forEach((s) => s.remove());

  // تحميل JSONP من Apps Script مع callback=handleResponse
  const script = document.createElement("script");
  script.src = `${API_URL}?code=${encodeURIComponent(
    code
  )}&callback=handleResponse`;
  script.setAttribute("data-jsonp", "");
  document.body.appendChild(script);
});
