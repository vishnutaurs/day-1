export function createCard(name, role) {
  const card = document.createElement("div");
  card.className = "profile-card";

  card.innerHTML = `
    <h3>${escapeHtml(name)}</h3>
    <p>${escapeHtml(role)}</p>
    <button class="remove-btn">Remove</button>
  `;

  card.querySelector(".remove-btn").addEventListener("click", () => {
    if (confirm("Are you sure you want to remove this card?")) {
      card.remove();
    }
  });

  return card;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
