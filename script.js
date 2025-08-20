function changeBackgroundColor() {
  const colors = ["#fef3c7", "#e0f7fa", "#f3e5f5", "#ffe0b2"];
  document.body.style.backgroundColor =
    colors[Math.floor(Math.random() * colors.length)];
}

// Contact form validation and thank-you message
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const thankYou = document.getElementById("thankYouMessage");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (form.checkValidity()) {
        form.style.display = "none";
        thankYou.classList.remove("hidden");
      } else {
        form.reportValidity();
      }
    });
  }
});
