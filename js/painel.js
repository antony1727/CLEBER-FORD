/* ============================================================
   CLEBER FORD — Central de Divulgação
   painel.js — gerador de legendas + artes para redes sociais
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     CONFIGURAÇÕES PADRÃO
     ---------------------------------------------------------- */
  const DEFAULT_SETTINGS = {
    name: "Cleber Ford",
    phone: "(35) 9219-5691",
    city: "Lavras – MG",
    instagram: "",
    wa: "553592195691",
  };

  const STORAGE = {
    settings: "cf_settings_v3",
    history: "cf_history_v1",
    counter: "cf_generated_v1",
  };

  const SERVICES = {
    "Revisão Ford": {
      headline: "Revisão Ford",
      copy: "Revisão completa com checklist de fábrica, troca de óleo e filtros, freios, fluidos e leitura eletrônica. Seu Ford em dia, sem surpresa no futuro.",
      tip: "Óleo e filtros no prazo certo protegem o motor e evitam desgaste prematuro. Confira o intervalo no manual do seu Ford e não passe do prazo.",
      problem: "a revisão atrasada",
      tag: "#RevisaoFord",
    },
    "Diagnóstico eletrônico": {
      headline: "Diagnóstico eletrônico",
      copy: "Leitura de módulos com scanner dedicado para encontrar a causa real da falha. Sem trocar peça no escuro e sem gastar duas vezes.",
      tip: "Luz acesa no painel não é sinal para ignorar. Um diagnóstico correto evita trocar peças boas e aponta o reparo certo logo na primeira vez.",
      problem: "uma luz no painel",
      tag: "#DiagnosticoAutomotivo",
    },
    "Motor e retífica": {
      headline: "Motor e retífica",
      copy: "Reparo de motor com procedimentos, torques e tolerâncias conforme a especificação Ford. Serviço técnico, testado e com condições de garantia informadas no orçamento.",
      tip: "Fumaça, consumo de óleo ou perda de potência merecem avaliação. Quanto antes o motor for diagnosticado, menor o custo do reparo.",
      problem: "falhas no motor",
      tag: "#MotorFord",
    },
    "Câmbio automático e PowerShift": {
      headline: "Câmbio automático e PowerShift",
      copy: "Manutenção e reparo de câmbio automático e PowerShift, com troca de fluido, análise de solenoides e diagnóstico especializado.",
      tip: "Trancos, demora para engatar ou patinação no câmbio não são normais. A avaliação precoce evita danos maiores e reduz o custo do reparo.",
      problem: "trancos no câmbio",
      tag: "#CambioAutomatico",
    },
    "Freios e ABS": {
      headline: "Freios e ABS",
      copy: "Pastilhas, discos, fluido, cilindros e diagnóstico do ABS. Segurança que você sente no pedal e vê na hora de frear.",
      tip: "Ruído ao frear, pedal mole ou luz do ABS acesa pedem atenção imediata. Freio não é item para esperar a próxima revisão.",
      problem: "ruído ao frear",
      tag: "#FreiosFord",
    },
    "Suspensão e direção": {
      headline: "Suspensão e direção",
      copy: "Diagnóstico de ruídos e vibrações, com amortecedores, molas, bandejas, pivôs e direção revisados conforme a necessidade do seu Ford.",
      tip: "Barulho em buracos e vibração no volante costumam indicar desgaste na suspensão. Resolver cedo preserva pneus e melhora a estabilidade.",
      problem: "barulho na suspensão",
      tag: "#SuspensaoFord",
    },
    "Ar-condicionado": {
      headline: "Ar-condicionado",
      copy: "Higienização, carga de gás, teste de vazamento e reparo do compressor. Climatizador gelando de verdade, sem cheiro ruim na cabine.",
      tip: "Ar fraco ou com cheiro de mofo pode indicar filtro sujo ou vazamento. A manutenção preventiva mantém o sistema eficiente e a cabine saudável.",
      problem: "o ar não gelando",
      tag: "#ArCondicionadoAutomotivo",
    },
    "Elétrica e módulos": {
      headline: "Elétrica e módulos",
      copy: "Alternador, bateria, partida, sensores e programação de módulos com equipamento adequado para a eletrônica do seu Ford.",
      tip: "Consumo de bateria, falhas de partida e sensores desregulados têm diagnóstico. Teste com equipamento certo evita trocar componentes sem necessidade.",
      problem: "falhas elétricas",
      tag: "#EletricaAutomotiva",
    },
    "Serviço geral": {
      headline: "Cuidado completo",
      copy: "Conte o que está acontecendo com seu Ford. A gente avalia, explica o problema e indica o reparo certo, com orçamento aprovado antes.",
      tip: "Sintomas parecidos podem ter causas diferentes. Descrever o comportamento do carro ajuda a oficina a acertar o diagnóstico com mais precisão.",
      problem: "uma necessidade geral",
      tag: "#OficinaFord",
    },
  };

  const OBJECTIVES = {
    servico: { label: "Serviço especializado", tag: "Serviço" },
    promocao: { label: "Oferta especial", tag: "Promoção" },
    dica: { label: "Dica da oficina", tag: "Dica" },
    prova: { label: "Cliente satisfeito", tag: "Prova social" },
    revisao: { label: "Revisão preventiva", tag: "Revisão" },
  };

  const TONE_LINES = {
    confiavel:
      "Aqui você recebe diagnóstico honesto, orçamento transparente e condições de garantia informadas antes da execução.",
    direto:
      "Diagnóstico, orçamento aprovado e serviço executado. Sem enrolação e sem surpresa.",
    descontraido:
      "Seu Ford merece carinho — e a gente entende do assunto. 😉",
  };

  /* ----------------------------------------------------------
     HELPERS
     ---------------------------------------------------------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function safeParse(value, fallback) {
    try {
      const parsed = JSON.parse(value);
      return parsed ?? fallback;
    } catch {
      return fallback;
    }
  }

  function loadSettings() {
    try {
      const stored = safeParse(localStorage.getItem(STORAGE.settings), {});
      return { ...DEFAULT_SETTINGS, ...stored };
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE.settings, JSON.stringify(settings));
    } catch {
      /* silencioso */
    }
  }

  function loadHistory() {
    try {
      const list = safeParse(localStorage.getItem(STORAGE.history), []);
      return Array.isArray(list) ? list : [];
    } catch {
      return [];
    }
  }

  function saveHistory() {
    try {
      localStorage.setItem(STORAGE.history, JSON.stringify(history));
    } catch {
      // Se o espaço acabar, remove os posts mais antigos e tenta novamente
      try {
        history = history.slice(0, Math.ceil(history.length / 2));
        localStorage.setItem(STORAGE.history, JSON.stringify(history));
      } catch {
        showToast("Não foi possível salvar: armazenamento do navegador cheio.", true);
      }
    }
  }

  function loadCounter() {
    try {
      const n = parseInt(localStorage.getItem(STORAGE.counter) || "0", 10);
      return Number.isFinite(n) ? n : 0;
    } catch {
      return 0;
    }
  }

  function bumpCounter() {
    generatedCount += 1;
    try {
      localStorage.setItem(STORAGE.counter, String(generatedCount));
    } catch {
      /* silencioso */
    }
    updateStats();
  }

  function escapeHtml(text) {
    return String(text ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function slug(text) {
    return String(text || "post")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48);
  }

  function cityTag(city) {
    const base = String(city || "").split(/[–—-]/)[0].trim();
    const tag = slug(base).replace(/-/g, "");
    return tag ? "#" + tag.replace(/^./, (c) => c.toUpperCase()) : "#Brasil";
  }

  function buildHashtags(config) {
    const service = SERVICES[config.servico] || SERVICES["Serviço geral"];
    return [
      "#CleberFord",
      "#MecanicaFord",
      "#OficinaFord",
      "#FordBrasil",
      "#ManutencaoPreventiva",
      service.tag,
      cityTag(settings.city),
    ].join(" ");
  }

  /* ----------------------------------------------------------
     LEGENDA
     ---------------------------------------------------------- */
  function buildCaption(config) {
    const service = SERVICES[config.servico] || SERVICES["Serviço geral"];
    const model = config.modelo.trim();
    const offer = config.oferta.trim();
    const tone = TONE_LINES[config.tom] || TONE_LINES.confiavel;
    const hashtags = buildHashtags(config);
    const phone = settings.phone;
    const city = settings.city;
    const shop = settings.name;
    let lines = [];

    switch (config.objetivo) {
      case "promocao":
        lines = [
          `🚨 ${offer || "Condição especial"} na ${shop}!`,
          "",
          service.copy,
          "",
          `Aproveite para deixar seu${model ? " " + model : " Ford"} em dia com quem entende do assunto. Vagas limitadas para esta semana.`,
          "",
          `📲 Chame no WhatsApp e garanta a sua: ${phone}`,
          `📍 ${city}`,
          "",
          hashtags,
        ];
        break;

      case "dica":
        lines = [
          "💡 Dica rápida para quem tem Ford:",
          "",
          service.tip,
          "",
          "Pequenos cuidados evitam reparos grandes. Se o seu Ford apresentar algum sintoma diferente, não espere piorar.",
          "",
          `${tone}`,
          "",
          `📲 ${shop} — ${phone}`,
          `📍 ${city}`,
          "",
          hashtags,
        ];
        break;

      case "prova":
        lines = [
          "✅ Mais um Ford saindo da oficina pronto para a estrada.",
          "",
          model
            ? `Desta vez foi o ${model}, que chegou com ${service.problem} e saiu com o serviço concluído e testado em rodagem.`
            : "Serviço concluído, testado e entregue com as condições de garantia informadas no orçamento. É assim que cuidamos de cada Ford.",
          "",
          tone,
          "",
          `📲 Quer o seu Ford cuidado assim? Chame no WhatsApp: ${phone}`,
          `📍 ${city}`,
          "",
          hashtags,
        ];
        break;

      case "revisao":
        lines = [
          "🚗 Revisão em dia é sinônimo de segurança.",
          "",
          model
            ? `Seu ${model} já está na hora de revisar?`
            : "Seu Ford já está na hora de revisar?",
          "",
          `Na ${shop}, a revisão inclui checklist completo, troca de óleo e filtros, freios, suspensão, fluidos e leitura eletrônica.`,
          "",
          tone,
          "",
          `📲 Agende seu horário: ${phone}`,
          `📍 ${city}`,
          "",
          hashtags,
        ];
        break;

      default:
        lines = [
          model ? `Seu ${model} está pedindo atenção? 🔧` : "Seu Ford está pedindo atenção? 🔧",
          "",
          service.copy,
          "",
          tone,
          "",
          `📲 Agende seu horário: ${phone}`,
          `📍 ${shop} · ${city}`,
          "",
          hashtags,
        ];
    }

    return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  }

  /* ----------------------------------------------------------
     ESTADO / ELEMENTOS
     ---------------------------------------------------------- */
  let settings = loadSettings();
  let history = loadHistory();
  let generatedCount = loadCounter();
  let state = {
    formato: "feed",
    objetivo: "servico",
    servico: "Revisão Ford",
    modelo: "",
    oferta: "",
    tom: "confiavel",
  };

  const form = $("#post-form");
  const captionEl = $("#caption");
  const charCount = $("#char-count");
  const canvas = $("#post-canvas");
  const canvasShell = $("#canvas-shell");
  const formatBadge = $("#format-badge");
  const ctx = canvas.getContext("2d");
  const toastEl = $("#toast");
  const historyGrid = $("#history-grid");
  const historyEmpty = $("#history-empty");
  const historyCount = $("#history-count");

  const logo = new Image();
  let logoReady = false;
  if (window.FORD_LOGO_DATA) {
    logo.src = window.FORD_LOGO_DATA;
    logo.onload = () => {
      logoReady = true;
      renderArt();
    };
  }

  let toastTimer = null;
  function showToast(message, isError = false) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.toggle("is-error", isError);
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 3200);
  }

  function blinkSaveState() {
    const el = $("#save-state");
    if (!el) return;
    el.classList.add("is-saving");
    setTimeout(() => el.classList.remove("is-saving"), 600);
  }

  function updateStats() {
    const saved = $("#stat-saved");
    const generated = $("#stat-generated");
    if (saved) saved.textContent = history.length;
    if (generated) generated.textContent = generatedCount;
    if (historyCount) historyCount.textContent = history.length;
  }

  /* ----------------------------------------------------------
     FORMULÁRIO
     ---------------------------------------------------------- */
  function readForm() {
    const data = new FormData(form);
    return {
      formato: String(data.get("formato") || "feed"),
      objetivo: String(data.get("objetivo") || "servico"),
      servico: String(data.get("servico") || "Revisão Ford"),
      modelo: String(data.get("modelo") || "").trim(),
      oferta: String(data.get("oferta") || "").trim(),
      tom: String(data.get("tom") || "confiavel"),
    };
  }

  function applyStateToForm(config) {
    if (!form) return;
    const setRadio = (name, value) => {
      const input = form.querySelector(`input[name="${name}"][value="${value}"]`);
      if (input) input.checked = true;
    };
    setRadio("formato", config.formato || "feed");
    setRadio("objetivo", config.objetivo || "servico");
    setRadio("tom", config.tom || "confiavel");

    const serviceSelect = form.querySelector("#servico");
    if (serviceSelect) serviceSelect.value = config.servico || "Revisão Ford";

    const modelo = form.querySelector("#modelo");
    if (modelo) modelo.value = config.modelo || "";
    const oferta = form.querySelector("#oferta");
    if (oferta) oferta.value = config.oferta || "";
  }

  function readSettingsInputs() {
    $$("[data-setting]").forEach((input) => {
      const key = input.getAttribute("data-setting");
      const value = input.value.trim();
      settings[key] = value || DEFAULT_SETTINGS[key] || "";
    });
    saveSettings();
  }

  function fillSettingsInputs() {
    $$("[data-setting]").forEach((input) => {
      const key = input.getAttribute("data-setting");
      input.value = settings[key] ?? "";
    });
  }

  function updateCaptionCounter() {
    if (!captionEl || !charCount) return;
    const length = captionEl.value.length;
    charCount.textContent = `${length.toLocaleString("pt-BR")} / 2.200`;
    charCount.classList.toggle("is-over", length > 2200);
  }

  /* ----------------------------------------------------------
     CANVAS — utilidades
     ---------------------------------------------------------- */
  function roundRectPath(x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  }

  function fillRound(x, y, w, h, r, fill) {
    roundRectPath(x, y, w, h, r);
    ctx.fillStyle = fill;
    ctx.fill();
  }

  function strokeRound(x, y, w, h, r, stroke, lineWidth = 1) {
    roundRectPath(x, y, w, h, r);
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }

  function setFont(weight, size, family = "Inter") {
    ctx.font = `${weight} ${size}px "${family}"`;
  }

  function wrapText(text, maxWidth, maxLines = 4) {
    const words = String(text).split(/\s+/).filter(Boolean);
    const lines = [];
    let line = "";
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
        if (lines.length === maxLines) break;
      } else {
        line = test;
      }
    }
    if (line && lines.length < maxLines) lines.push(line);
    return lines;
  }

  function fitHeadline(text, maxWidth, maxLines, startSize, minSize, weight = 800) {
    const words = String(text).toUpperCase().split(/\s+/);
    let size = startSize;
    let lines = [];
    while (size > minSize) {
      setFont(weight, size, "Barlow Condensed");
      lines = [];
      let line = "";
      for (const word of words) {
        const test = line ? `${line} ${word}` : word;
        if (ctx.measureText(test).width > maxWidth && line) {
          lines.push(line);
          line = word;
        } else {
          line = test;
        }
      }
      if (line) lines.push(line);
      const widest = Math.max(...lines.map((l) => ctx.measureText(l).width), 0);
      if (lines.length <= maxLines && widest <= maxWidth) break;
      size -= 4;
    }
    return { size, lines };
  }

  function drawHeadline(text, x, y, maxWidth, maxLines, startSize, minSize) {
    const { size, lines } = fitHeadline(text, maxWidth, maxLines, startSize, minSize);
    setFont(800, size, "Barlow Condensed");
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    const lineHeight = size * 0.92;
    lines.forEach((line, i) => {
      ctx.fillText(line, x, y + size * 0.76 + i * lineHeight);
    });
    return y + (lines.length - 1) * lineHeight + size * 0.76;
  }

  function drawParagraph(text, x, y, maxWidth, size, color, maxLines = 3, lineHeightFactor = 1.5) {
    setFont(500, size, "Inter");
    ctx.fillStyle = color;
    ctx.textAlign = "left";
    const lines = wrapText(text, maxWidth, maxLines);
    const lineHeight = size * lineHeightFactor;
    lines.forEach((line, i) => {
      ctx.fillText(line, x, y + i * lineHeight);
    });
    return { bottom: y + (lines.length - 1) * lineHeight, lines: lines.length };
  }

  function drawCheckDot(x, y, size, color = "#2f7bff") {
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(47, 123, 255, 0.18)";
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(2, size * 0.08);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + size * 0.27, y + size * 0.52);
    ctx.lineTo(x + size * 0.44, y + size * 0.68);
    ctx.lineTo(x + size * 0.74, y + size * 0.34);
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(2, size * 0.09);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  function drawPill(label, x, y) {
    setFont(700, 17, "Inter");
    const textWidth = ctx.measureText(label).width;
    const width = textWidth + 60;
    fillRound(x, y, width, 46, 23, "rgba(31, 111, 240, 0.16)");
    strokeRound(x, y, width, 46, 23, "rgba(138, 180, 255, 0.4)", 1.5);
    ctx.beginPath();
    ctx.arc(x + 24, y + 23, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#6fa8ff";
    ctx.fill();
    ctx.fillStyle = "#a9c7ff";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(label, x + 38, y + 24);
    ctx.textBaseline = "alphabetic";
    return width;
  }

  function drawLogoCard(x, y, w = 300, h = 120) {
    fillRound(x, y, w, h, 16, "#ffffff");
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 8;
    fillRound(x, y, w, h, 16, "#ffffff");
    ctx.restore();

    if (logoReady) {
      const ratio = logo.width / logo.height;
      const lw = w * 0.78;
      const lh = lw / ratio;
      ctx.drawImage(logo, x + (w - lw) / 2, y + (h - lh) / 2, lw, lh);
    } else {
      setFont(800, 44, "Barlow Condensed");
      ctx.fillStyle = "#003478";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("FORD", x + w / 2, y + h / 2);
      ctx.textBaseline = "alphabetic";
    }
  }

  function drawBackground(W, H, seed) {
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#040b16");
    bg.addColorStop(0.52, "#071a31");
    bg.addColorStop(1, "#030a13");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const glow = ctx.createRadialGradient(W * 0.86, H * 0.08, 0, W * 0.86, H * 0.08, W * 0.62);
    glow.addColorStop(0, "rgba(31, 111, 240, 0.34)");
    glow.addColorStop(0.55, "rgba(31, 111, 240, 0.1)");
    glow.addColorStop(1, "rgba(31, 111, 240, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // Grade técnica
    ctx.strokeStyle = "rgba(150, 185, 235, 0.045)";
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 72) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += 72) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(W, y + 0.5);
      ctx.stroke();
    }

    // Brilho diagonal
    ctx.save();
    const diagonal = ctx.createLinearGradient(0, H * 0.55, W, H * 0.9);
    diagonal.addColorStop(0, "rgba(255, 255, 255, 0)");
    diagonal.addColorStop(0.5, "rgba(93, 154, 255, 0.06)");
    diagonal.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = diagonal;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  function drawBrandLine(x, y, W, align = "left") {
    ctx.textAlign = align;
    setFont(600, 17, "Inter");
    ctx.fillStyle = "#6fa8ff";
    ctx.fillText("MECÂNICA ESPECIALIZADA FORD", x, y);
    setFont(500, 21, "Inter");
    ctx.fillStyle = "#9fb3cb";
    ctx.fillText(settings.city, x, y + 34);
    ctx.textAlign = "left";
  }

  function drawFeaturesRow(W, y) {
    const items = ["Diagnóstico preciso", "Peças de procedência", "Garantia no orçamento"];
    const margin = 64;
    const colWidth = (W - margin * 2) / 3;
    items.forEach((item, i) => {
      const x = margin + colWidth * i;
      drawCheckDot(x, y, 24);
      setFont(600, 19, "Inter");
      ctx.fillStyle = "#d7e4f4";
      ctx.textAlign = "left";
      ctx.fillText(item, x + 38, y + 18);
    });
  }

  function drawFeaturesColumn(x, y) {
    const items = ["Diagnóstico preciso", "Peças de procedência", "Garantia no orçamento"];
    items.forEach((item, i) => {
      drawCheckDot(x, y + i * 66, 30);
      setFont(500, 27, "Inter");
      ctx.fillStyle = "#d7e4f4";
      ctx.textAlign = "left";
      ctx.fillText(item, x + 48, y + i * 66 + 23);
    });
  }

  function drawFooter(W, H) {
    const y = H - 120;
    ctx.fillStyle = "rgba(255, 255, 255, 0.035)";
    ctx.fillRect(0, y, W, 120);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(W, y + 0.5);
    ctx.stroke();

    setFont(700, 14, "Inter");
    ctx.fillStyle = "#6fa8ff";
    ctx.textAlign = "left";
    ctx.fillText("AGENDE PELO WHATSAPP", 64, y + 40);

    setFont(700, 34, "Barlow Condensed");
    ctx.fillStyle = "#ffffff";
    ctx.fillText(settings.phone, 64, y + 84);

    setFont(500, 19, "Inter");
    ctx.fillStyle = "#9fb3cb";
    ctx.textAlign = "right";
    ctx.fillText(settings.instagram || "Nota 4,6 no Google", W - 64, y + 46);
    ctx.fillStyle = "#71869f";
    ctx.fillText(settings.city, W - 64, y + 78);
    ctx.textAlign = "left";
  }

  function drawOffer(x, y, w, offer, big = false) {
    const h = big ? 158 : 112;
    const gradient = ctx.createLinearGradient(x, y, x + w, y + h);
    gradient.addColorStop(0, "#1f6ff0");
    gradient.addColorStop(1, "#003478");
    fillRound(x, y, w, h, 16, gradient);
    ctx.save();
    roundRectPath(x, y, w, h, 16);
    ctx.clip();
    const shine = ctx.createRadialGradient(x + w * 0.85, y + h * 0.1, 0, x + w * 0.85, y + h * 0.1, w * 0.6);
    shine.addColorStop(0, "rgba(255, 255, 255, 0.22)");
    shine.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = shine;
    ctx.fillRect(x, y, w, h);
    ctx.restore();

    setFont(700, big ? 20 : 15, "Inter");
    ctx.fillStyle = "#cfe0ff";
    ctx.textAlign = "left";
    ctx.fillText("OFERTA ESPECIAL", x + (big ? 40 : 30), y + (big ? 48 : 36));

    let size = big ? 50 : 38;
    setFont(700, size, "Barlow Condensed");
    const maxTextWidth = w - (big ? 80 : 60);
    while (ctx.measureText(offer.toUpperCase()).width > maxTextWidth && size > 22) {
      size -= 2;
      setFont(700, size, "Barlow Condensed");
    }
    ctx.fillStyle = "#ffffff";
    ctx.fillText(offer.toUpperCase(), x + (big ? 40 : 30), y + (big ? 112 : 84));
  }

  /* ----------------------------------------------------------
     CANVAS — layout feed (1080×1080)
     ---------------------------------------------------------- */
  function renderFeed(config) {
    const W = 1080;
    const H = 1080;
    canvas.width = W;
    canvas.height = H;
    ctx.clearRect(0, 0, W, H);
    drawBackground(W, H, "feed");

    drawLogoCard(64, 64, 300, 120);
    drawBrandLine(W - 64, 104, W, "right");

    const objective = OBJECTIVES[config.objetivo] || OBJECTIVES.servico;
    drawPill(objective.label, 64, 232);

    const headline = headlineFor(config);
    const headlineBottom = drawHeadline(headline, 64, 302, 940, 3, 104, 64);

    // Barra de destaque
    const barY = headlineBottom + 28;
    const bar = ctx.createLinearGradient(64, barY, 330, barY);
    bar.addColorStop(0, "#2f7bff");
    bar.addColorStop(1, "rgba(47, 123, 255, 0)");
    fillRound(64, barY, 260, 7, 4, bar);

    const copy = copyFor(config);
    const copyBottom = drawParagraph(copy, 64, barY + 56, 880, 31, "#b9c9de", 3, 1.48).bottom;

    // Assinatura editorial
    const taglineY = Math.min(copyBottom + 96, 790);
    fillRound(64, taglineY - 42, 4, 54, 2, "#2f7bff");
    ctx.save();
    ctx.font = 'italic 600 40px "Barlow Condensed"';
    ctx.fillStyle = "#dbe8f9";
    ctx.textAlign = "left";
    ctx.fillText("Seu Ford cuidado por quem entende de Ford.", 88, taglineY);
    ctx.restore();

    if (config.oferta) {
      drawOffer(64, 828, 952, config.oferta, false);
    } else {
      drawFeaturesRow(W, 850);
    }

    drawFooter(W, H);
  }

  /* ----------------------------------------------------------
     CANVAS — layout story/status (1080×1920)
     ---------------------------------------------------------- */
  function renderStory(config) {
    const W = 1080;
    const H = 1920;
    canvas.width = W;
    canvas.height = H;
    ctx.clearRect(0, 0, W, H);
    drawBackground(W, H, "story");

    drawLogoCard(370, 118, 340, 136);

    ctx.textAlign = "center";
    setFont(600, 20, "Inter");
    ctx.fillStyle = "#6fa8ff";
    ctx.fillText("MECÂNICA ESPECIALIZADA FORD", W / 2, 322);
    setFont(500, 23, "Inter");
    ctx.fillStyle = "#9fb3cb";
    ctx.fillText(settings.city, W / 2, 360);
    ctx.textAlign = "left";

    const objective = OBJECTIVES[config.objetivo] || OBJECTIVES.servico;
    drawPill(objective.label, 72, 452);

    const headlineBottom = drawHeadline(headlineFor(config), 72, 542, 936, 4, 116, 68);

    const barY = headlineBottom + 30;
    const bar = ctx.createLinearGradient(72, barY, 380, barY);
    bar.addColorStop(0, "#2f7bff");
    bar.addColorStop(1, "rgba(47, 123, 255, 0)");
    fillRound(72, barY, 290, 7, 4, bar);

    drawParagraph(copyFor(config), 72, barY + 62, 900, 36, "#b9c9de", 3, 1.45);

    drawFeaturesColumn(72, 1240);

    if (config.oferta) {
      drawOffer(72, 1452, 936, config.oferta, true);
    }

    // Botão CTA
    const ctaY = config.oferta ? 1652 : 1510;
    const ctaGradient = ctx.createLinearGradient(72, ctaY, 1008, ctaY + 104);
    ctaGradient.addColorStop(0, "#1f6ff0");
    ctaGradient.addColorStop(1, "#003478");
    fillRound(72, ctaY, 936, 104, 14, ctaGradient);

    setFont(700, 34, "Barlow Condensed");
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("CHAME NO WHATSAPP", W / 2, ctaY + 65);

    setFont(700, 40, "Barlow Condensed");
    ctx.fillStyle = "#ffffff";
    ctx.fillText(settings.phone, W / 2, ctaY + 165);

    ctx.textAlign = "left";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.beginPath();
    ctx.moveTo(72, 1828);
    ctx.lineTo(1008, 1828);
    ctx.stroke();

    setFont(500, 20, "Inter");
    ctx.fillStyle = "#9fb3cb";
    ctx.fillText(settings.instagram || "Nota 4,6 no Google", 72, 1872);
    ctx.textAlign = "right";
    ctx.fillStyle = "#71869f";
    ctx.fillText(settings.city, 1008, 1872);
    ctx.textAlign = "left";
  }

  function headlineFor(config) {
    const service = SERVICES[config.servico] || SERVICES["Serviço geral"];
    switch (config.objetivo) {
      case "dica":
        return "Cuidado que evita prejuízo";
      case "prova":
        return "Mais um Ford pronto para rodar";
      case "revisao":
        return "Revisão em dia, estrada tranquila";
      case "promocao":
        return config.oferta ? "Condição especial para seu Ford" : service.headline;
      default:
        return service.headline;
    }
  }

  function copyFor(config) {
    const service = SERVICES[config.servico] || SERVICES["Serviço geral"];
    switch (config.objetivo) {
      case "dica":
        return service.tip;
      case "prova":
        return "Serviço concluído, testado e entregue com as condições de garantia informadas no orçamento. É assim que cuidamos de cada Ford.";
      case "revisao":
        return "Checklist completo, troca de óleo e filtros, freios, suspensão, fluidos e leitura eletrônica. Segurança para você e para o seu Ford.";
      case "promocao":
        return service.copy;
      default:
        return service.copy;
    }
  }

  function renderArt() {
    if (!ctx) return;
    if (state.formato === "story" || state.formato === "status") {
      renderStory(state);
      canvasShell?.classList.add("is-story");
      if (formatBadge) formatBadge.textContent = "1080 × 1920";
    } else {
      renderFeed(state);
      canvasShell?.classList.remove("is-story");
      if (formatBadge) formatBadge.textContent = "1080 × 1080";
    }
  }

  /* ----------------------------------------------------------
     GERAR
     ---------------------------------------------------------- */
  function refreshPreview(countGenerated = false) {
    if (!form || !canvas || !ctx) return;
    state = readForm();
    readSettingsInputs();
    currentCaption = buildCaption(state);
    if (captionEl) {
      captionEl.value = currentCaption;
      updateCaptionCounter();
    }
    renderArt();
    if (countGenerated) {
      bumpCounter();
      showToast("Post gerado! Revise a legenda e baixe a arte.");
    }
  }

  let currentCaption = "";

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    refreshPreview(true);
  });

  $$('input[name="formato"]', form || document).forEach((input) => {
    input.addEventListener("change", () => {
      if (input.checked) refreshPreview(false);
    });
  });

  $("#reset-form")?.addEventListener("click", () => {
    applyStateToForm({
      formato: "feed",
      objetivo: "servico",
      servico: "Revisão Ford",
      modelo: "",
      oferta: "",
      tom: "confiavel",
    });
    refreshPreview(false);
    showToast("Formulário limpo. Pronto para um novo post.");
  });

  $("#apply-settings")?.addEventListener("click", () => {
    readSettingsInputs();
    refreshPreview(false);
    blinkSaveState();
    showToast("Dados da oficina atualizados.");
  });

  $("#restore-settings")?.addEventListener("click", () => {
    settings = { ...DEFAULT_SETTINGS };
    fillSettingsInputs();
    saveSettings();
    refreshPreview(false);
    showToast("Dados padrão restaurados.");
  });

  $$("[data-setting]").forEach((input) => {
    input.addEventListener("input", () => {
      blinkSaveState();
    });
    input.addEventListener("change", () => {
      readSettingsInputs();
    });
  });

  captionEl?.addEventListener("input", updateCaptionCounter);

  /* ----------------------------------------------------------
     AÇÕES DO POST
     ---------------------------------------------------------- */
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(textarea);
        return ok;
      } catch {
        return false;
      }
    }
  }

  $("#btn-copy")?.addEventListener("click", async () => {
    const ok = await copyToClipboard(captionEl.value);
    showToast(
      ok ? "Legenda copiada! Agora é só colar no Instagram ou WhatsApp." : "Não foi possível copiar automaticamente.",
      !ok
    );
  });

  $("#btn-download")?.addEventListener("click", () => {
    try {
      const link = document.createElement("a");
      link.download = `cleber-ford-${slug(state.servico)}-${state.formato}.jpg`;
      link.href = canvas.toDataURL("image/jpeg", 0.92);
      link.click();
      showToast("Arte baixada em JPG.");
    } catch {
      showToast("Não foi possível baixar a imagem neste navegador.", true);
    }
  });

  $("#btn-save")?.addEventListener("click", () => {
    try {
      const image = canvas.toDataURL("image/jpeg", 0.82);
      const item = {
        id: Date.now(),
        savedAt: new Date().toISOString(),
        config: { ...state },
        caption: captionEl.value,
        image,
      };

      history.unshift(item);
      history = history.slice(0, 8);
      saveHistory();
      updateStats();
      renderHistory();
      showToast("Publicação salva no histórico!");
    } catch {
      showToast("Não foi possível salvar. Tente baixar a arte.", true);
    }
  });

  $("#btn-whatsapp")?.addEventListener("click", () => {
    const text = captionEl.value;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  });

  /* ----------------------------------------------------------
     HISTÓRICO
     ---------------------------------------------------------- */
  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
    } catch {
      return "";
    }
  }

  function renderHistory() {
    if (!historyGrid) return;
    historyGrid.innerHTML = "";
    const hasItems = history.length > 0;
    if (historyEmpty) historyEmpty.classList.toggle("is-visible", !hasItems);

    history.forEach((item) => {
      const objective = OBJECTIVES[item.config?.objetivo] || OBJECTIVES.servico;
      const card = document.createElement("article");
      card.className = "history-card";
      card.innerHTML = `
        <div class="history-thumb">
          <img src="${item.image}" alt="Arte gerada: ${escapeHtml(item.config?.servico || "")}">
          <span class="history-format">${item.config?.formato === "feed" ? "Feed" : "Story"}</span>
        </div>
        <div class="history-body">
          <div class="history-meta">
            <span class="history-tag">${escapeHtml(objective.tag)}</span>
            <span>${escapeHtml(formatDate(item.savedAt))}</span>
          </div>
          <h3>${escapeHtml(item.config?.servico || "Publicação")}</h3>
          <p>${escapeHtml((item.caption || "").replace(/\n+/g, " ").slice(0, 160))}</p>
          <div class="history-actions">
            <button class="icon-btn" type="button" data-action="copy" data-id="${item.id}" title="Copiar legenda" aria-label="Copiar legenda">
              <svg class="ic"><use href="#i-copy"/></svg>
            </button>
            <button class="icon-btn" type="button" data-action="download" data-id="${item.id}" title="Baixar arte" aria-label="Baixar arte">
              <svg class="ic"><use href="#i-download"/></svg>
            </button>
            <button class="icon-btn is-danger" type="button" data-action="delete" data-id="${item.id}" title="Excluir" aria-label="Excluir do histórico">
              <svg class="ic"><use href="#i-trash"/></svg>
            </button>
            <button class="reuse-btn" type="button" data-action="reuse" data-id="${item.id}">
              Reutilizar <svg class="ic"><use href="#i-arrow"/></svg>
            </button>
          </div>
        </div>
      `;
      historyGrid.appendChild(card);
    });
  }

  historyGrid?.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const id = Number(button.getAttribute("data-id"));
    const item = history.find((entry) => entry.id === id);
    if (!item) return;
    const action = button.getAttribute("data-action");

    if (action === "copy") {
      const ok = await copyToClipboard(item.caption || "");
      showToast(ok ? "Legenda copiada do histórico." : "Não foi possível copiar.", !ok);
    }

    if (action === "download") {
      const link = document.createElement("a");
      link.download = `cleber-ford-${slug(item.config?.servico)}-${item.config?.formato || "post"}.jpg`;
      link.href = item.image;
      link.click();
      showToast("Arte baixada.");
    }

    if (action === "delete") {
      if (!confirm("Excluir esta publicação do histórico?")) return;
      history = history.filter((entry) => entry.id !== id);
      saveHistory();
      updateStats();
      renderHistory();
      showToast("Publicação removida.");
    }

    if (action === "reuse") {
      applyStateToForm(item.config || {});
      switchTab("gerador");
      refreshPreview(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      showToast("Configuração carregada no gerador.");
    }
  });

  /* ----------------------------------------------------------
     ABAS
     ---------------------------------------------------------- */
  function switchTab(name) {
    $$(".app-tab").forEach((tab) => {
      const active = tab.getAttribute("data-tab") === name;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    $$(".tab-panel").forEach((panel) => {
      const active = panel.id === `tab-${name}`;
      panel.hidden = !active;
      panel.classList.toggle("is-active", active);
    });
    if (name === "historico") renderHistory();
  }

  $$(".app-tab").forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab.getAttribute("data-tab")));
  });

  $$("[data-go-tab]").forEach((button) => {
    button.addEventListener("click", () => switchTab(button.getAttribute("data-go-tab")));
  });

  /* ----------------------------------------------------------
     IDEIAS
     ---------------------------------------------------------- */
  $$(".idea-card").forEach((card) => {
    $(".idea-use", card)?.addEventListener("click", () => {
      const raw = card.getAttribute("data-idea");
      const idea = safeParse(raw, null);
      if (!idea) return;
      applyStateToForm({ ...idea, formato: "feed" });
      switchTab("gerador");
      refreshPreview(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  /* ----------------------------------------------------------
     INICIALIZAÇÃO
     ---------------------------------------------------------- */
  async function init() {
    fillSettingsInputs();
    applyStateToForm(state);
    updateStats();
    renderHistory();

    try {
      if (document.fonts?.ready) await document.fonts.ready;
      if (document.fonts?.load) {
        await Promise.all([
          document.fonts.load('800 100px "Barlow Condensed"'),
          document.fonts.load('700 40px "Barlow Condensed"'),
          document.fonts.load('500 30px "Inter"'),
          document.fonts.load('700 18px "Inter"'),
        ]);
      }
    } catch {
      /* usa fontes de fallback */
    }

    refreshPreview(false);
  }

  init();
})();
