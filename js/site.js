/* ============================================================
   CLEBER FORD — site.js
   Configuração central de contato + interações do site
   ============================================================ */

/* WhatsApp da oficina (somente números, com 55 + DDD) */
const WHATSAPP_NUMBER = "553538210992";

(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ----------------------------------------------------------
     1. Links de WhatsApp
     ---------------------------------------------------------- */
  $$("[data-wa]").forEach((link) => {
    const message = link.getAttribute("data-wa") || "Olá! Vim pelo site da Cleber Ford.";
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    link.target = "_blank";
    link.rel = "noopener";
  });

  /* ----------------------------------------------------------
     2. Header ao rolar
     ---------------------------------------------------------- */
  const header = $(".site-header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ----------------------------------------------------------
     3. Menu mobile
     ---------------------------------------------------------- */
  const body = document.body;
  const menuToggle = $(".menu-toggle");
  const nav = $("#main-nav");
  const backdrop = $(".nav-backdrop");
  const navClose = $(".mobile-nav-close");

  function setMenu(open) {
    body.classList.toggle("menu-open", open);
    if (menuToggle) menuToggle.setAttribute("aria-expanded", String(open));
    if (menuToggle) menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    if (open) {
      const firstLink = nav ? nav.querySelector("a") : null;
      if (firstLink) setTimeout(() => firstLink.focus(), 380);
    }
  }

  menuToggle?.addEventListener("click", () => setMenu(!body.classList.contains("menu-open")));
  navClose?.addEventListener("click", () => setMenu(false));
  backdrop?.addEventListener("click", () => setMenu(false));
  $$("#main-nav a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && body.classList.contains("menu-open")) setMenu(false);
  });

  /* ----------------------------------------------------------
     4. FAQ (acordeão)
     ---------------------------------------------------------- */
  const faqItems = $$(".faq-item");
  faqItems.forEach((item) => {
    const button = $(".faq-question", item);
    const answer = $(".faq-answer", item);
    if (!button || !answer) return;

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      faqItems.forEach((other) => {
        if (other === item) return;
        other.classList.remove("is-open");
        const otherBtn = $(".faq-question", other);
        const otherAns = $(".faq-answer", other);
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        if (otherAns) otherAns.style.maxHeight = null;
      });

      item.classList.toggle("is-open", !isOpen);
      button.setAttribute("aria-expanded", String(!isOpen));
      answer.style.maxHeight = !isOpen ? answer.scrollHeight + "px" : null;
    });
  });

  // Garante que o conteúdo aberto não seja cortado ao redimensionar
  window.addEventListener("resize", () => {
    $$(".faq-item.is-open .faq-answer").forEach((answer) => {
      answer.style.maxHeight = answer.scrollHeight + "px";
    });
  });

  /* ----------------------------------------------------------
     5. Reveal on scroll
     ---------------------------------------------------------- */
  const revealElements = $$(".reveal");
  if ("IntersectionObserver" in window && revealElements.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  /* ----------------------------------------------------------
     6. Formulário de contato → WhatsApp
     ---------------------------------------------------------- */
  const form = $("#contact-form");
  if (form) {
    const phoneInput = form.querySelector('input[name="telefone"]');
    const feedback = $("#form-feedback");

    // Máscara simples de telefone
    phoneInput?.addEventListener("input", (e) => {
      let digits = e.target.value.replace(/\D/g, "").slice(0, 11);
      if (digits.length > 10) {
        digits = digits.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
      } else if (digits.length > 6) {
        digits = digits.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
      } else if (digits.length > 2) {
        digits = digits.replace(/^(\d{2})(\d{0,5}).*/, "($1) $2");
      } else if (digits.length > 0) {
        digits = digits.replace(/^(\d{0,2}).*/, "($1");
      }
      e.target.value = digits;
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const requiredFields = ["nome", "telefone", "modelo"];
      let firstInvalid = null;

      requiredFields.forEach((name) => {
        const field = form.elements[name];
        if (!field) return;
        const invalid = !field.value.trim() || (name === "telefone" && field.value.replace(/\D/g, "").length < 10);
        field.classList.toggle("is-invalid", invalid);
        if (invalid && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        if (feedback) {
          feedback.textContent = "Preencha nome, WhatsApp e modelo do carro para continuar.";
          feedback.className = "form-feedback is-error";
        }
        firstInvalid.focus();
        return;
      }

      if (feedback) {
        feedback.textContent = "";
        feedback.className = "form-feedback";
      }

      const data = new FormData(form);
      const nome = String(data.get("nome") || "").trim();
      const telefone = String(data.get("telefone") || "").trim();
      const modelo = String(data.get("modelo") || "").trim();
      const servico = String(data.get("servico") || "").trim();
      const mensagem = String(data.get("mensagem") || "").trim();

      const lines = [
        "Olá, Cleber! Vim pelo site e gostaria de agendar um serviço.",
        "",
        `*Nome:* ${nome}`,
        `*WhatsApp:* ${telefone}`,
        `*Modelo:* ${modelo}`,
      ];
      if (servico) lines.push(`*Serviço:* ${servico}`);
      if (mensagem) lines.push("", `*Detalhes:* ${mensagem}`);
      lines.push("", "Aguardo o retorno, obrigado!");

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
      window.open(url, "_blank", "noopener");
      form.reset();
    });

    // Remove o estado de erro ao digitar
    form.addEventListener("input", (e) => {
      if (e.target.classList.contains("is-invalid")) e.target.classList.remove("is-invalid");
    });
  }

  /* ----------------------------------------------------------
     7. Ano do rodapé
     ---------------------------------------------------------- */
  const year = $("#ano");
  if (year) year.textContent = new Date().getFullYear();
})();
