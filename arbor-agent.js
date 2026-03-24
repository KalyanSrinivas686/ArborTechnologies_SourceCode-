/**
 * ============================================================
 *  ARBOR TECHNOLOGIES — AI SALES & SUPPORT AGENT v2.0
 *  A hybrid Sales Engineer / Technical Support / Lead Qualifier
 *  Fully client-side, zero external API dependency
 * ============================================================
 */
(function () {
  "use strict";

  /* ──────────────────────────────────────────────────────────
   *  1. KNOWLEDGE BASE (RAG-simulated)
   * ──────────────────────────────────────────────────────────*/
  const KB = {
    services: {
      cloud: {
        title: "Cloud Architecture (AWS / Azure)",
        desc: "We design cloud-native architectures that auto-scale with your user base. Specialising in multi-region setups, high-availability patterns, Graviton instances, Spot Fleet, and S3 intelligent tiering.",
        benefits: ["99.95% uptime SLA", "35% avg monthly cloud savings", "Multi-region failover"],
        tools: ["AWS", "Azure", "Terraform", "Pulumi", "CloudFormation"],
      },
      devops: {
        title: "CI/CD & DevOps Automation",
        desc: "Zero-touch deployment pipelines that push code to production in minutes, not hours. We build GitOps-native workflows using GitHub Actions, ArgoCD, and Jenkins.",
        benefits: ["10× faster release cycles", "Zero-downtime deployments", "Automated rollback"],
        tools: ["GitHub Actions", "ArgoCD", "Jenkins", "GitLab CI", "CircleCI"],
      },
      kubernetes: {
        title: "Kubernetes Orchestration",
        desc: "End-to-end K8s cluster design, hardening, and ongoing management. We fix the 80% of clusters that are misconfigured — covering resource limits, RBAC, ingress, and secrets management.",
        benefits: ["Sub-50ms latency at 50k TPS", "Auto-scaling HPA/VPA", "Service mesh (Istio/Linkerd)"],
        tools: ["Kubernetes", "Helm", "Kustomize", "Istio", "Prometheus", "Grafana"],
      },
      security: {
        title: "DevSecOps & Compliance",
        desc: "Security-first infrastructure with automated compliance monitoring. We embed security scanning into every pipeline stage — SAST, DAST, container scanning, secrets detection.",
        benefits: ["SOC 2 readiness", "VAPT & pen-testing", "Real-time threat detection"],
        tools: ["Falco", "Trivy", "OPA/Gatekeeper", "Vault", "Datadog Security"],
      },
      ai: {
        title: "AI/ML Infrastructure & Chatbot Integration",
        desc: "GPU-optimised pipelines for training and serving AI models at scale. We also build production-grade LLM chatbots and RAG systems tailored to your business workflows.",
        benefits: ["Cut GPU costs by 40%", "Sub-second inference latency", "Custom LLM fine-tuning"],
        tools: ["TensorFlow", "PyTorch", "LangChain", "HuggingFace", "Ray Serve"],
      },
      mvp: {
        title: "Startup MVP & Scalable Architecture",
        desc: "Full-stack MVP development with a scalable backbone from day one. We help founders go from idea to production-ready in weeks, not months.",
        benefits: ["Ship in 4–8 weeks", "Scalable from day 1", "Founder-friendly retainer"],
        tools: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "Supabase"],
      },
    },
    pricing: {
      project: "Project-based engagements come with a defined scope of work, fixed timeline, and full handover documentation. Pricing quoted per project.",
      retainer: "Fractional DevOps retainer — our most popular model. 24/7 Slack access, weekly deployment reviews, and continuous cost optimisation. Retainer pricing shared after a discovery call.",
      audit: "One-off Infrastructure Audit covers security vulnerabilities, architecture diagramming, and an actionable roadmap. Ideal starting point for new clients.",
    },
    process: [
      "1. Deep Audit — We analyse your AWS/Azure setup to find security flaws and cost bleeding.",
      "2. Architecture Design — Custom scalable cloud architecture using IaC & Kubernetes.",
      "3. Zero-Downtime Rollout — We migrate traffic seamlessly alongside your live systems.",
      "4. Fractional Support — Embedded 24/7 monitoring via Slack + cluster management.",
    ],
    faq: {
      global: "Yes! We work with hyper-growth startups globally, operating asynchronously with daily syncs.",
      replace: "No, we act as an extension of your existing team — we handle infra so your devs can ship product code.",
      clouds: "We specialise in AWS and Azure, with deep Kubernetes expertise across both.",
      timeline: "Most projects are production-ready within 1–4 weeks depending on scope.",
      security: "We follow Zero-Trust principles, embed security into every pipeline stage, and never compromise on GDPR/SOC 2 requirements.",
    },
    contact: {
      email: "arbortech.cloud@gmail.com",
      calendly: "https://calendly.com/arbortech",
      whatsapp: "https://wa.me/1234567890?text=Hi%20Arbor%20Technologies%2C%20I%20want%20to%20book%20a%20consultation.",
    },
  };

  /* ──────────────────────────────────────────────────────────
   *  2. INTENT / NLP ENGINE
   * ──────────────────────────────────────────────────────────*/
  const INTENTS = [
    { key: "greeting",    patterns: ["hello", "hi", "hey", "good morning", "good evening", "howdy", "sup", "start"] },
    { key: "cloud",       patterns: ["cloud", "aws", "azure", "gcp", "infrastructure", "servers", "ec2", "s3", "lambda", "cost optim", "cloud bill", "cloud savings"] },
    { key: "devops",      patterns: ["devops", "ci/cd", "pipeline", "github actions", "jenkins", "argocd", "deploy", "deployment", "automat", "cicd", "gitops"] },
    { key: "kubernetes",  patterns: ["kubernetes", "k8s", "k8", "kubectl", "helm", "pod", "container", "docker", "orchestrat"] },
    { key: "security",    patterns: ["security", "secops", "devsecops", "compliance", "soc2", "pen test", "vapt", "hack", "vulnerability", "gdpr", "secure"] },
    { key: "ai",          patterns: ["ai", "ml", "llm", "chatbot", "machine learning", "gpt", "langchain", "model", "training", "inference", "rag", "artificial intelligence"] },
    { key: "mvp",         patterns: ["mvp", "startup", "build product", "idea", "prototype", "saas", "found", "cto", "app", "product"] },
    { key: "pricing",     patterns: ["price", "pricing", "cost", "how much", "rates", "budget", "quote", "retainer", "package", "plan"] },
    { key: "booking",     patterns: ["book", "schedule", "call", "meeting", "consult", "demo", "talk to", "connect", "calendly", "appointment"] },
    { key: "process",     patterns: ["process", "how do you", "how does", "steps", "workflow", "timeline", "how long"] },
    { key: "faq_global",  patterns: ["global", "international", "outside us", "india", "remote", "different country"] },
    { key: "faq_replace", patterns: ["replace", "team", "engineer", "hire", "vs your team", "do i need"] },
    { key: "qualify",     patterns: ["interested", "learn more", "yes", "sure", "okay", "ok", "sounds good", "tell me", "next"] },
    { key: "name",        patterns: [] },  // handled by flow
    { key: "email",       patterns: [] },  // handled by flow
    { key: "company",     patterns: [] },  // handled by flow
    { key: "usecase",     patterns: [] },  // handled by flow
    { key: "negative",    patterns: ["no", "nope", "not now", "maybe later", "bye", "exit", "quit", "close", "cancel"] },
  ];

  function detectIntent(text) {
    const lower = text.toLowerCase();
    for (const intent of INTENTS) {
      if (intent.patterns.some((p) => lower.includes(p))) return intent.key;
    }
    return "unknown";
  }

  function detectMode(text) {
    const lower = text.toLowerCase();
    if (lower.match(/startu|founder|cto|saas|mvp|build|scale/)) return "founder";
    if (lower.match(/how to|configure|deploy|debug|error|issue|fix|kubernetes|pipeline|terraform/)) return "support";
    return "sales";
  }

  /* ──────────────────────────────────────────────────────────
   *  3. CONVERSATION STATE
   * ──────────────────────────────────────────────────────────*/
  const state = {
    step: "idle",          // idle | qualifying | collecting_name | collecting_email | collecting_company | collecting_usecase | done
    mode: "sales",         // sales | support | founder
    lead: { name: "", email: "", company: "", usecase: "" },
    leadScore: 0,          // 0–10
    messageCount: 0,
    lastIntent: null,
    logs: [],
  };

  function classifyLead() {
    const score = state.leadScore;
    if (score >= 7) return { label: "🔥 Hot Lead", color: "#ef4444", desc: "Ready to engage" };
    if (score >= 4) return { label: "🌡️ Warm Lead", color: "#f59e0b", desc: "Exploring options" };
    return { label: "❄️ Cold Lead", color: "#64748b", desc: "Just browsing" };
  }

  function scoreLead(intent) {
    const heatMap = {
      booking: 4, pricing: 3, cloud: 2, devops: 2, ai: 2,
      kubernetes: 2, security: 2, mvp: 2, qualify: 1,
    };
    state.leadScore = Math.min(10, state.leadScore + (heatMap[intent] || 0));
  }

  /* ──────────────────────────────────────────────────────────
   *  4. RESPONSE ENGINE
   * ──────────────────────────────────────────────────────────*/
  function buildResponse(userText) {
    const intent = detectIntent(userText);
    const mode = detectMode(userText);
    state.mode = mode;
    state.lastIntent = intent;
    scoreLead(intent);

    // ── Qualification flow ─────────────────────────────────
    if (state.step === "collecting_name") {
      state.lead.name = userText.trim();
      state.step = "collecting_email";
      return reply(`Nice to meet you, **${state.lead.name}**! 👋\n\nWhat's the best email to reach you at?`, null, "type_email");
    }
    if (state.step === "collecting_email") {
      if (!/\S+@\S+\.\S+/.test(userText)) {
        return reply("That doesn't look like a valid email. Please try again (e.g. you@company.com):", null, "type_email");
      }
      state.lead.email = userText.trim();
      state.step = "collecting_company";
      return reply("Perfect! And which **company or startup** are you building at?", null, "type_text");
    }
    if (state.step === "collecting_company") {
      state.lead.company = userText.trim();
      state.step = "collecting_usecase";
      return reply(
        `Great, **${state.lead.company}**! 🚀\n\nLastly — what's the main challenge you're looking to solve? (e.g. "We need help setting up Kubernetes", "We want to cut AWS costs", "Building an AI chatbot")`,
        null,
        "type_text"
      );
    }
    if (state.step === "collecting_usecase") {
      state.lead.usecase = userText.trim();
      state.step = "done";
      state.leadScore = Math.min(10, state.leadScore + 3);
      const lead = classifyLead();
      const log = {
        ...state.lead,
        score: state.leadScore,
        label: lead.label,
        ts: new Date().toISOString(),
      };
      state.logs.push(log);
      console.info("[Arbor Agent] Lead captured:", log);
      saveLead(log);
      return reply(
        `You're all set, **${state.lead.name}**! 🎯\n\nHere's what happens next:\n• Our team at Arbor Technologies will review your requirements\n• We'll send a **custom proposal** to ${state.lead.email} within 2 hours\n• Feel free to book a call directly below\n\nLead status: **${lead.label}** — ${lead.desc}`,
        [
          { label: "📅 Book a Call Now", action: "book_call" },
          { label: "💬 Chat on WhatsApp", action: "whatsapp" },
          { label: "✉️ Email Us Directly", action: "email" },
        ]
      );
    }

    // ── Intent routing ─────────────────────────────────────
    switch (intent) {
      case "greeting":
        return greet();
      case "cloud":
        return serviceReply("cloud", mode);
      case "devops":
        return serviceReply("devops", mode);
      case "kubernetes":
        return serviceReply("kubernetes", mode);
      case "security":
        return serviceReply("security", mode);
      case "ai":
        return serviceReply("ai", mode);
      case "mvp":
        return serviceReply("mvp", mode);
      case "pricing":
        return pricingReply();
      case "booking":
        return bookingReply();
      case "process":
        return processReply();
      case "faq_global":
        return reply(`**Global Operations:**\n\n${KB.faq.global}\n\nWe work across time zones with async daily updates and real-time Slack channels.`, quickStart());
      case "faq_replace":
        return reply(`**We complement, not replace:**\n\n${KB.faq.replace}`, quickStart());
      case "qualify":
        return startQualification();
      case "negative":
        return reply(
          `No problem at all! 😊 Feel free to come back anytime if you have questions.\n\nYou can also reach us at:\n📧 ${KB.contact.email}`,
          [{ label: "✉️ Email Us", action: "email" }]
        );
      default:
        return fallback(userText, mode);
    }
  }

  function greet() {
    state.messageCount++;
    const name = state.lead.name ? `, ${state.lead.name}` : "";
    return reply(
      `Hey${name}! 👋 I'm **Arbor AI** — your 24/7 digital sales engineer at **Arbor Technologies**.\n\nI can help you with:\n• DevOps & CI/CD pipelines\n• Cloud architecture (AWS / Azure)\n• Kubernetes deployments\n• AI chatbot & ML infrastructure\n• Security & DevSecOps\n• Startup MVP development\n\nWhat are you looking to build or solve today?`,
      [
        { label: "🛠️ I need DevOps help", action: "quick_devops" },
        { label: "🤖 Build an AI product", action: "quick_ai" },
        { label: "☁️ Cloud cost optimization", action: "quick_cloud" },
        { label: "📞 Talk to an expert", action: "quick_expert" },
      ]
    );
  }

  function serviceReply(svcKey, mode) {
    const svc = KB.services[svcKey];
    let intro = "";
    if (mode === "founder") {
      intro = `As a founder, here's the strategic value: `;
    } else if (mode === "support") {
      intro = `Technically speaking: `;
    } else {
      intro = `Great choice! Here's what we offer: `;
    }
    const tools = svc.tools.slice(0, 4).join(", ");
    const benefits = svc.benefits.map((b) => `✅ ${b}`).join("\n");
    return reply(
      `**${svc.title}**\n\n${intro}${svc.desc}\n\n${benefits}\n\n🔧 *Tech: ${tools}*`,
      [
        { label: "📅 Book a Free Consultation", action: "book_call" },
        { label: "💰 See Pricing", action: "quick_pricing" },
        { label: "🔋 Qualify My Project", action: "qualify_lead" },
      ]
    );
  }

  function pricingReply() {
    return reply(
      `**Flexible Engagement Models** 💼\n\n📌 **Project-Based** — ${KB.pricing.project}\n\n⭐ **Fractional DevOps (Most Popular)** — ${KB.pricing.retainer}\n\n🔍 **Infrastructure Audit** — ${KB.pricing.audit}\n\nAll models include a **free initial consultation** to assess fit.`,
      [
        { label: "📅 Book Free Consultation", action: "book_call" },
        { label: "🔋 Start Qualification", action: "qualify_lead" },
        { label: "✉️ Email Us", action: "email" },
      ]
    );
  }

  function bookingReply() {
    return reply(
      `Let's get you scheduled! 📅\n\nOur consultations are **free, 30-minute strategy calls** with our lead DevOps architect.\n\nYou'll walk away with:\n✅ A high-level audit of your current setup\n✅ Recommendations tailored to your stack\n✅ A rough engagement proposal\n\nChoose your preferred channel below:`,
      [
        { label: "📅 Book via Calendly", action: "book_call" },
        { label: "💬 WhatsApp", action: "whatsapp" },
        { label: "✉️ Email Us", action: "email" },
      ]
    );
  }

  function processReply() {
    const steps = KB.process.map((s) => `\n${s}`).join("");
    return reply(
      `**The Arbor Process** 🚀 ${steps}\n\nMost clients are running on their new infrastructure within **2–4 weeks**.`,
      [
        { label: "📅 Start the Process", action: "book_call" },
        { label: "🔋 Get Qualified", action: "qualify_lead" },
      ]
    );
  }

  function startQualification() {
    state.step = "collecting_name";
    return reply(
      `Awesome! Let me gather a few quick details so we can prepare a **custom proposal** for you. 📋\n\nFirst — what's your name?`,
      null,
      "type_text"
    );
  }

  function fallback(text, mode) {
    const modeMap = {
      founder: `From a strategic standpoint, this is a great question for our Founder Briefing call. Our lead architect can walk you through the architecture that best fits your growth stage.`,
      support: `That's a nuanced technical question — let me connect you with our engineering team for a deeper dive.`,
      sales: `That's a great question! Our team would love to give you a detailed answer. Let me connect you with the right expert.`,
    };
    return reply(
      `💡 ${modeMap[mode]}\n\nIn the meantime, feel free to explore what we do or book a call at no cost. I'm here if you have any other questions!`,
      [
        { label: "📅 Book a Free Call", action: "book_call" },
        { label: "🛠️ DevOps Help", action: "quick_devops" },
        { label: "☁️ Cloud Services", action: "quick_cloud" },
      ]
    );
  }

  function reply(text, buttons, inputHint) {
    return { text, buttons: buttons || null, inputHint: inputHint || null };
  }

  function quickStart() {
    return [
      { label: "📅 Book a Call", action: "book_call" },
      { label: "🔋 Qualify My Project", action: "qualify_lead" },
    ];
  }

  /* ──────────────────────────────────────────────────────────
   *  5. LEAD PERSISTENCE (localStorage — GDPR-info shown)
   * ──────────────────────────────────────────────────────────*/
  function saveLead(log) {
    try {
      const existing = JSON.parse(localStorage.getItem("arbor_leads") || "[]");
      existing.push(log);
      localStorage.setItem("arbor_leads", JSON.stringify(existing));
    } catch (_) {}
  }

  /* ──────────────────────────────────────────────────────────
   *  6. ACTION HANDLERS
   * ──────────────────────────────────────────────────────────*/
  function handleAction(action) {
    switch (action) {
      case "book_call":
        window.open(KB.contact.calendly, "_blank");
        return buildResponse("book a call");
      case "whatsapp":
        window.open(KB.contact.whatsapp, "_blank");
        return null;
      case "email":
        window.location.href = `mailto:${KB.contact.email}?subject=Consultation%20Request%20—%20Arbor%20Technologies`;
        return null;
      case "quick_devops":
        return buildResponse("devops pipeline help");
      case "quick_ai":
        return buildResponse("build an ai product");
      case "quick_cloud":
        return buildResponse("cloud cost optimization");
      case "quick_expert":
        return bookingReply();
      case "quick_pricing":
        return pricingReply();
      case "qualify_lead":
        return startQualification();
      default:
        return null;
    }
  }

  /* ──────────────────────────────────────────────────────────
   *  7. UI BUILDER
   * ──────────────────────────────────────────────────────────*/
  const STYLES = `
    #arbor-widget { all: initial; }
    #arbor-widget * { box-sizing: border-box; font-family: 'Outfit', 'Segoe UI', sans-serif; }

    /* ── Launcher button ── */
    #arbor-launcher {
      position: fixed; bottom: 28px; right: 28px; z-index: 9998;
      width: 60px; height: 60px; border-radius: 50%;
      background: linear-gradient(135deg, #0ea5e9, #6366f1);
      border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 8px 32px rgba(14,165,233,0.5);
      transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s;
      animation: arbor-pulse-ring 2.5s ease-out infinite;
    }
    #arbor-launcher:hover { transform: scale(1.12); box-shadow: 0 12px 40px rgba(14,165,233,0.7); }
    #arbor-launcher svg { width: 28px; height: 28px; fill: #fff; }
    #arbor-launcher .arbor-notif {
      position: absolute; top: 0; right: 0; width: 18px; height: 18px;
      background: #ef4444; border-radius: 50%; border: 2px solid #fff;
      font-size: 10px; color: #fff; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
    }
    #arbor-launcher-tooltip {
      position: absolute; bottom: 70px; right: 0;
      background: #0f172a; color: #f1f5f9;
      padding: 10px 16px; border-radius: 12px; white-space: nowrap;
      font-size: 13px; font-weight: 600; pointer-events: none;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
      opacity: 0; transform: translateY(8px) scale(0.95);
      transition: all 0.25s ease; font-family: 'Outfit', sans-serif;
    }
    #arbor-launcher:hover #arbor-launcher-tooltip,
    #arbor-launcher-tooltip.show { opacity: 1; transform: translateY(0) scale(1); }
    #arbor-launcher-tooltip::after {
      content: ''; position: absolute; bottom: -6px; right: 20px;
      border-width: 6px 6px 0; border-style: solid; border-color: #0f172a transparent transparent;
    }

    @keyframes arbor-pulse-ring {
      0% { box-shadow: 0 0 0 0 rgba(14,165,233,0.5); }
      70% { box-shadow: 0 0 0 14px rgba(14,165,233,0); }
      100% { box-shadow: 0 0 0 0 rgba(14,165,233,0); }
    }

    /* ── Chat window ── */
    #arbor-chat {
      position: fixed; bottom: 100px; right: 28px; z-index: 9999;
      width: 380px; max-width: calc(100vw - 32px); height: 580px; max-height: calc(100vh - 120px);
      background: #fff; border-radius: 20px;
      box-shadow: 0 24px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(148,163,184,0.15);
      display: flex; flex-direction: column; overflow: hidden;
      transform: scale(0.92) translateY(20px); opacity: 0;
      transition: transform 0.35s cubic-bezier(.34,1.56,.64,1), opacity 0.25s ease;
      pointer-events: none;
    }
    #arbor-chat.open { transform: scale(1) translateY(0); opacity: 1; pointer-events: all; }

    /* ── Header ── */
    #arbor-header {
      background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);
      padding: 16px 18px; display: flex; align-items: center; gap: 12px; flex-shrink: 0;
      border-bottom: 1px solid rgba(14,165,233,0.25);
    }
    #arbor-avatar {
      width: 42px; height: 42px; border-radius: 50%;
      background: linear-gradient(135deg, #0ea5e9, #6366f1);
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; flex-shrink: 0;
    }
    #arbor-header-info { flex: 1; }
    #arbor-header-name { color: #f1f5f9; font-size: 15px; font-weight: 700; line-height: 1.2; }
    #arbor-header-status { display: flex; align-items: center; gap: 6px; margin-top: 2px; }
    .arbor-online-dot {
      width: 8px; height: 8px; border-radius: 50%; background: #10b981;
      animation: arbor-blink 2s ease infinite;
    }
    @keyframes arbor-blink { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
    #arbor-header-status span { color: #94a3b8; font-size: 12px; }
    #arbor-mode-badge {
      padding: 3px 10px; background: rgba(14,165,233,0.15); border: 1px solid rgba(14,165,233,0.3);
      border-radius: 20px; font-size: 11px; color: #7dd3fc; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    #arbor-close-btn {
      background: none; border: none; color: #64748b; cursor: pointer;
      font-size: 20px; line-height: 1; padding: 2px; transition: color 0.2s;
      flex-shrink: 0;
    }
    #arbor-close-btn:hover { color: #f1f5f9; }

    /* ── Messages area ── */
    #arbor-messages {
      flex: 1; overflow-y: auto; padding: 16px 14px;
      display: flex; flex-direction: column; gap: 10px;
      scroll-behavior: smooth; background: #f8fafc;
    }
    #arbor-messages::-webkit-scrollbar { width: 4px; }
    #arbor-messages::-webkit-scrollbar-track { background: transparent; }
    #arbor-messages::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }

    .arbor-msg-row { display: flex; gap: 8px; max-width: 100%; animation: arbor-fade-in 0.3s ease; }
    @keyframes arbor-fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
    .arbor-msg-row.bot { align-items: flex-start; }
    .arbor-msg-row.user { justify-content: flex-end; }
    .arbor-bot-icon {
      width: 30px; height: 30px; border-radius: 50%;
      background: linear-gradient(135deg, #0ea5e9, #6366f1);
      display: flex; align-items: center; justify-content: center;
      font-size: 14px; flex-shrink: 0; margin-top: 2px;
    }
    .arbor-bubble {
      max-width: 82%; padding: 10px 14px; border-radius: 16px;
      font-size: 13.5px; line-height: 1.6; word-break: break-word;
    }
    .arbor-bubble.bot {
      background: #fff; color: #1e293b;
      border-radius: 4px 16px 16px 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.07);
      border: 1px solid #e2e8f0;
    }
    .arbor-bubble.user {
      background: linear-gradient(135deg, #0ea5e9, #6366f1);
      color: #fff; border-radius: 16px 4px 16px 16px;
    }
    .arbor-bubble strong { font-weight: 700; }
    .arbor-bubble em { font-style: italic; color: #64748b; }

    /* ── Typing indicator ── */
    #arbor-typing { display: none; align-items: flex-start; gap: 8px; padding: 0 14px 4px; }
    #arbor-typing .arbor-bot-icon { width: 28px; height: 28px; font-size: 12px; }
    .arbor-typing-dots {
      display: flex; gap: 4px; background: #fff; padding: 10px 14px;
      border-radius: 4px 16px 16px 16px; border: 1px solid #e2e8f0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.07);
    }
    .arbor-typing-dots span {
      width: 7px; height: 7px; border-radius: 50%; background: #94a3b8;
      animation: arbor-bounce 1.2s ease infinite;
    }
    .arbor-typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .arbor-typing-dots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes arbor-bounce { 0%,60%,100%{transform:translateY(0);} 30%{transform:translateY(-6px);} }

    /* ── Quick-reply buttons ── */
    .arbor-quick-replies {
      display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; max-width: 82%;
    }
    .arbor-quick-btn {
      background: #fff; border: 1.5px solid #e2e8f0; color: #0ea5e9;
      padding: 6px 12px; border-radius: 20px; font-size: 12.5px; font-weight: 600;
      cursor: pointer; transition: all 0.2s; white-space: nowrap;
      font-family: 'Outfit', sans-serif;
    }
    .arbor-quick-btn:hover { background: #0ea5e9; color: #fff; border-color: #0ea5e9; transform: translateY(-1px); }

    /* ── Input area ── */
    #arbor-input-area {
      padding: 12px 14px; background: #fff; border-top: 1px solid #e2e8f0; flex-shrink: 0;
    }
    #arbor-input-form { display: flex; gap: 8px; align-items: center; }
    #arbor-input {
      flex: 1; padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 24px;
      font-size: 13.5px; outline: none; font-family: 'Outfit', sans-serif; resize: none;
      transition: border-color 0.2s; background: #f8fafc; color: #1e293b;
    }
    #arbor-input:focus { border-color: #0ea5e9; background: #fff; }
    #arbor-input::placeholder { color: #94a3b8; }
    #arbor-send {
      width: 40px; height: 40px; border-radius: 50%; border: none;
      background: linear-gradient(135deg, #0ea5e9, #6366f1);
      color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center;
      font-size: 16px; transition: transform 0.2s, box-shadow 0.2s; flex-shrink: 0;
    }
    #arbor-send:hover { transform: scale(1.1); box-shadow: 0 4px 16px rgba(14,165,233,0.4); }
    #arbor-send:active { transform: scale(0.95); }
    #arbor-footer-note {
      text-align: center; font-size: 10.5px; color: #94a3b8; margin-top: 6px;
    }

    /* ── Lead score bar ── */
    #arbor-score-bar {
      padding: 6px 14px; background: #f1f5f9; border-top: 1px solid #e2e8f0;
      display: flex; align-items: center; gap: 8px; flex-shrink: 0;
    }
    #arbor-score-label { font-size: 10.5px; color: #64748b; font-weight: 600; white-space: nowrap; }
    #arbor-score-track { flex: 1; height: 5px; background: #e2e8f0; border-radius: 4px; overflow: hidden; }
    #arbor-score-fill { height: 100%; width: 0%; border-radius: 4px; background: linear-gradient(90deg, #10b981, #0ea5e9); transition: width 0.6s ease; }
    #arbor-score-pct { font-size: 10.5px; color: #64748b; font-weight: 700; }

    /* ── Responsive ── */
    @media (max-width: 420px) {
      #arbor-chat { width: calc(100vw - 16px); right: 8px; bottom: 90px; height: 70vh; }
      #arbor-launcher { right: 16px; bottom: 16px; }
    }
  `;

  /* ──────────────────────────────────────────────────────────
   *  8. DOM CONSTRUCTION
   * ──────────────────────────────────────────────────────────*/
  function buildUI() {
    // Inject styles
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);

    // Widget root
    const root = document.createElement("div");
    root.id = "arbor-widget";
    document.body.appendChild(root);

    // ── Launcher ──
    root.innerHTML = `
      <button id="arbor-launcher" aria-label="Chat with Arbor AI">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.03 2 11c0 2.61 1.19 4.96 3.07 6.59L4 22l4.66-2.33C9.73 19.87 10.83 20 12 20c5.52 0 10-4.03 10-9S17.52 2 12 2zm-1 13H7v-2h4v2zm6 0h-4v-2h4v2zm0-4H7V9h10v2z"/>
        </svg>
        <div class="arbor-notif" id="arbor-notif">1</div>
        <div id="arbor-launcher-tooltip">Chat with Arbor AI 👋</div>
      </button>

      <div id="arbor-chat" role="dialog" aria-label="Arbor AI Chat">
        <div id="arbor-header">
          <div id="arbor-avatar">🤖</div>
          <div id="arbor-header-info">
            <div id="arbor-header-name">Arbor AI — Sales Engineer</div>
            <div id="arbor-header-status">
              <div class="arbor-online-dot"></div>
              <span>Online · Typically replies instantly</span>
            </div>
          </div>
          <div id="arbor-mode-badge">Sales</div>
          <button id="arbor-close-btn" aria-label="Close chat">×</button>
        </div>

        <div id="arbor-messages" aria-live="polite"></div>
        <div id="arbor-typing">
          <div class="arbor-bot-icon" style="width:28px;height:28px;font-size:12px;">🤖</div>
          <div class="arbor-typing-dots">
            <span></span><span></span><span></span>
          </div>
        </div>

        <div id="arbor-score-bar">
          <span id="arbor-score-label">Lead Score</span>
          <div id="arbor-score-track"><div id="arbor-score-fill"></div></div>
          <span id="arbor-score-pct">0%</span>
        </div>

        <div id="arbor-input-area">
          <form id="arbor-input-form" autocomplete="off">
            <input id="arbor-input" type="text" placeholder="Ask me anything..." aria-label="Message input" maxlength="400">
            <button id="arbor-send" type="submit" aria-label="Send message">
              <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </form>
          <div id="arbor-footer-note">🔒 GDPR-compliant · Your data is stored locally only</div>
        </div>
      </div>
    `;
  }

  /* ──────────────────────────────────────────────────────────
   *  9. RENDER HELPERS
   * ──────────────────────────────────────────────────────────*/
  function md2html(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br>");
  }

  function renderBotMessage(response) {
    const msgs = document.getElementById("arbor-messages");
    const row = document.createElement("div");
    row.className = "arbor-msg-row bot";

    let html = `<div class="arbor-bot-icon">🤖</div><div>`;
    html += `<div class="arbor-bubble bot">${md2html(response.text)}</div>`;

    if (response.buttons && response.buttons.length) {
      html += `<div class="arbor-quick-replies">`;
      response.buttons.forEach((btn) => {
        html += `<button class="arbor-quick-btn" data-action="${btn.action}">${btn.label}</button>`;
      });
      html += `</div>`;
    }
    html += `</div>`;
    row.innerHTML = html;
    msgs.appendChild(row);

    // Attach button listeners
    row.querySelectorAll(".arbor-quick-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-action");
        btn.closest(".arbor-quick-replies").querySelectorAll(".arbor-quick-btn").forEach(b => b.disabled = true);
        btn.style.opacity = "0.6";
        const result = handleAction(action);
        if (result) setTimeout(() => renderBotMessage(result), 50);
        updateModeUI();
        updateScore();
        scrollDown();
      });
    });

    scrollDown();
  }

  function renderUserMessage(text) {
    const msgs = document.getElementById("arbor-messages");
    const row = document.createElement("div");
    row.className = "arbor-msg-row user";
    row.innerHTML = `<div class="arbor-bubble user">${escHTML(text)}</div>`;
    msgs.appendChild(row);
    scrollDown();
  }

  function escHTML(str) {
    return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  }

  function showTyping() {
    document.getElementById("arbor-typing").style.display = "flex";
    scrollDown();
  }
  function hideTyping() {
    document.getElementById("arbor-typing").style.display = "none";
  }
  function scrollDown() {
    const msgs = document.getElementById("arbor-messages");
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }

  function updateModeUI() {
    const badge = document.getElementById("arbor-mode-badge");
    const modeLabels = { sales: "Sales", support: "Support", founder: "Founder" };
    const modeColors = {
      sales: "rgba(14,165,233,0.15)",
      support: "rgba(99,102,241,0.15)",
      founder: "rgba(234,179,8,0.15)",
    };
    if (badge) {
      badge.textContent = modeLabels[state.mode] || "Sales";
      badge.style.background = modeColors[state.mode];
    }
  }

  function updateScore() {
    const pct = Math.min(100, state.leadScore * 10);
    const fill = document.getElementById("arbor-score-fill");
    const label = document.getElementById("arbor-score-pct");
    if (fill) fill.style.width = pct + "%";
    if (label) label.textContent = pct + "%";
  }

  /* ──────────────────────────────────────────────────────────
   *  10. EVENT CONTROLLER
   * ──────────────────────────────────────────────────────────*/
  let chatOpen = false;
  let firstOpen = true;

  function toggleChat(open) {
    chatOpen = open !== undefined ? open : !chatOpen;
    const chat = document.getElementById("arbor-chat");
    const notif = document.getElementById("arbor-notif");
    if (chatOpen) {
      chat.classList.add("open");
      if (notif) notif.style.display = "none";
      if (firstOpen) {
        firstOpen = false;
        setTimeout(() => {
          const welcome = greet();
          renderBotMessage(welcome);
          updateScore();
        }, 400);
      }
      setTimeout(() => document.getElementById("arbor-input").focus(), 350);
    } else {
      chat.classList.remove("open");
    }
  }

  function handleUserSend(text) {
    if (!text.trim()) return;

    renderUserMessage(text);
    showTyping();

    const delay = 700 + Math.random() * 600; // realistic delay
    setTimeout(() => {
      hideTyping();
      const response = buildResponse(text);
      renderBotMessage(response);
      updateModeUI();
      updateScore();
    }, delay);
  }

  function bindEvents() {
    document.getElementById("arbor-launcher").addEventListener("click", () => toggleChat());
    document.getElementById("arbor-close-btn").addEventListener("click", () => toggleChat(false));

    const form = document.getElementById("arbor-input-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const inp = document.getElementById("arbor-input");
      const text = inp.value.trim();
      if (!text) return;
      inp.value = "";
      handleUserSend(text);
    });

    // Enter key without shift
    document.getElementById("arbor-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const form = document.getElementById("arbor-input-form");
        form.dispatchEvent(new Event("submit", { bubbles: true }));
      }
    });

    // Show tooltip briefly on load
    setTimeout(() => {
      const tt = document.getElementById("arbor-launcher-tooltip");
      if (tt) {
        tt.classList.add("show");
        setTimeout(() => tt.classList.remove("show"), 3500);
      }
    }, 2000);

    // Auto-open after 45s if still on page (high-intent trigger)
    setTimeout(() => {
      if (!chatOpen) toggleChat(true);
    }, 45000);
  }

  /* ──────────────────────────────────────────────────────────
   *  11. BOOT
   * ──────────────────────────────────────────────────────────*/
  function init() {
    buildUI();
    bindEvents();
    console.info("[Arbor AI Agent] Initialized ✅ — Arbor Technologies");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
