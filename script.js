const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll("[data-category]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const submitButton = document.querySelector("[data-submit-button]");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

function setMenuOpen(isOpen) {
  header.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
}

navToggle.addEventListener("click", () => {
  setMenuOpen(!header.classList.contains("open"));
});

nav.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    setMenuOpen(false);
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const isVisible = selected === "all" || card.dataset.category === selected;
      card.classList.toggle("is-hidden", !isVisible);
    });
  });
});

function setFormState(message, type) {
  formStatus.textContent = message;
  formStatus.dataset.type = type;
}

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setFormState("", "");

  const formData = new FormData(contactForm);
  const payload = Object.fromEntries(formData.entries());

  submitButton.disabled = true;
  submitButton.textContent = "Enviando...";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(result.error || "No se pudo enviar el mensaje.");
    }

    contactForm.reset();
    setFormState("Gracias. Tu consulta fue enviada correctamente.", "success");
  } catch (error) {
    setFormState(
      "No pudimos enviar el formulario. Escribi a sebastianweisz@gmail.com y te responderemos pronto.",
      "error"
    );
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Enviar consulta";
  }
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
