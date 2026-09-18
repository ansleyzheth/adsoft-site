"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Activity, ArrowRight, ArrowUpRight, Bot, BriefcaseBusiness, Check, ChevronDown, CircleGauge, Code2, Database, Layers3, LineChart, Menu, Network, Search, Send, Settings2, ShoppingBag, Sparkles, Workflow, X } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";

const navigation = [
  { label: "Início", id: "inicio" },
  { label: "Soluções", id: "solucoes" },
  { label: "Projetos", id: "projetos" },
  { label: "Sobre", id: "sobre" },
  { label: "Contato", id: "contato" },
];
const systemCards = [
  { label: "Automação", icon: Bot, tone: "cyan" },
  { label: "IA", icon: Network, tone: "green" },
  { label: "Dados", icon: Database, tone: "blue" },
  { label: "Sistemas", icon: Layers3, tone: "violet" },
];
const solutions = [
  { title: "Sites", description: "Presença digital profissional, rápida e preparada para crescer.", icon: Code2 },
  { title: "Landing Pages", description: "Experiências objetivas para transformar atenção em oportunidade.", icon: LayoutTemplateIcon },
  { title: "E-commerce", description: "Lojas digitais conectadas a pagamentos, gestão e operação.", icon: ShoppingBag },
  { title: "Sistemas personalizados", description: "Software desenhado para o processo real da sua empresa.", icon: Settings2 },
  { title: "Dashboards / BI", description: "Dados organizados para orientar decisões com clareza.", icon: LineChart },
  { title: "Automação", description: "Workflows que reduzem tarefas repetitivas e gargalos.", icon: Workflow },
  { title: "IA", description: "Agentes e fluxos inteligentes conectados ao seu contexto.", icon: Sparkles },
  { title: "CRM", description: "Leads, pipeline e relacionamento em uma operação integrada.", icon: CircleGauge },
  { title: "SEO", description: "Otimização para mecanismos de busca tradicionais.", icon: Search },
  { title: "GEO", description: "Conteúdo estruturado para ser compreendido por sistemas de IA.", icon: Network },
];
const projects = [
  { title: "Restaurante", description: "Site + Google + WhatsApp + chatbot", icon: BriefcaseBusiness },
  { title: "Clínica", description: "Site + agendamento + chatbot + CRM", icon: CircleGauge },
  { title: "Imobiliária", description: "Imóveis + CRM + automação", icon: Layers3 },
  { title: "E-commerce", description: "Loja + pagamentos + gestão", icon: ShoppingBag },
  { title: "Empresa B2B", description: "Site + landing + SEO + GEO", icon: Code2 },
  { title: "CRM", description: "Login + dashboard + leads + pipeline", icon: LineChart },
  { title: "IA", description: "Agente de atendimento", icon: Bot },
  { title: "Automação", description: "Workflow inteligente + integrações", icon: Workflow },
];
const evolution = ["Site", "Presença digital", "Automação", "IA", "Sistemas", "SaaS"];

function LayoutTemplateIcon(props: { size?: number; strokeWidth?: number }) {
  return <Layers3 {...props} />;
}

export function AdsoftLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [formSent, setFormSent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.7, ease: "easeOut" as const };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
        if (visibleSection) setActiveSection(visibleSection.target.id);
      },
      { rootMargin: "-25% 0px -55%", threshold: [0.1, 0.35, 0.65] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSent(true);
  };

  const handleAnchorClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    setMenuOpen(false);
    setActiveSection(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
    window.history.replaceState({}, "", window.location.pathname + window.location.search);
  };

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState({}, "", window.location.pathname + window.location.search);
    }
  }, []);

  const showHeroVideo = isMounted && !reduceMotion && !isMobile && !videoUnavailable;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const heroVideoSources = [`${basePath}/videos/adsoft-here.mp4`, `${basePath}/videos/adsoft-hero.mp4`];

  return (
    <main className="site-shell" id="inicio">
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner">
          <a className="brand-mark" href="#inicio" aria-label="ADSOFT SYSTEMS, início" onClick={(event) => handleAnchorClick(event, "inicio")}>
            <Image src={`${basePath}/adsoft-logo.png`} alt="ADSOFT SYSTEMS" width={155} height={72} priority />
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navigation.map((item) => <a key={item.id} className={activeSection === item.id ? "active" : ""} aria-current={activeSection === item.id ? "page" : undefined} href={`#${item.id}`} onClick={(event) => handleAnchorClick(event, item.id)}>{item.label}</a>)}
          </nav>
          <a className="header-cta" href="#contato" onClick={(event) => handleAnchorClick(event, "contato")}>Começar um projeto <ArrowUpRight size={16} strokeWidth={1.8} /></a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && <motion.nav className="mobile-nav" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={transition} aria-label="Navegação móvel">
            {navigation.map((item) => <a key={item.id} aria-current={activeSection === item.id ? "page" : undefined} href={`#${item.id}`} onClick={(event) => handleAnchorClick(event, item.id)}>{item.label}</a>)}
            <a className="mobile-cta" href="#contato" onClick={(event) => handleAnchorClick(event, "contato")}>Começar um projeto <ArrowUpRight size={16} /></a>
          </motion.nav>}
        </AnimatePresence>
      </header>

      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-video-layer" aria-hidden="true">
          <div className="hero-video-fallback" />
          {showHeroVideo && <video className="hero-video" autoPlay muted loop playsInline preload="metadata" onError={() => setVideoUnavailable(true)}>
            {heroVideoSources.map((src) => <source key={src} src={src} type="video/mp4" />)}
          </video>}
        </div>
        <div className="hero-video-overlay" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" /><div className="hero-glow hero-glow-one" aria-hidden="true" /><div className="hero-glow hero-glow-two" aria-hidden="true" />
        <div className="hero-content">
          <motion.div className="hero-copy" initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }} animate={{ opacity: 1, y: 0, x: 0 }} transition={transition}>
            <div className="eyebrow"><span className="eyebrow-dot" /> Engenharia digital para o próximo passo</div>
            <h1 id="hero-title">Transformamos ideias em <span>soluções digitais.</span></h1>
            <p className="hero-description">Sites, sistemas, automações e soluções inteligentes para conectar sua empresa, otimizar processos e escalar resultados.</p>
            <div className="hero-actions"><a className="button button-primary" href="#contato" onClick={(event) => handleAnchorClick(event, "contato")}>Vamos conversar <ArrowUpRight size={18} /></a><a className="button button-secondary" href="#solucoes" onClick={(event) => handleAnchorClick(event, "solucoes")}>Conheça nossas soluções <ChevronDown size={17} /></a></div>
            <div className="hero-slogan">CONECTAMOS <b>•</b> OTIMIZAMOS <b>•</b> ESCALAMOS</div>
          </motion.div>

          <motion.div className="ecosystem" initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96, x: reduceMotion ? 0 : 22 }} animate={{ opacity: 1, scale: 1, x: 0, y: 0 }} transition={{ ...transition, delay: 0.16 }} aria-label="Ecossistema ADSOFT: Website, ADSOFT Core e automação, IA, dados e sistemas">
            <div className="ecosystem-label"><span /> ECOSSISTEMA ADSOFT</div>
            <div className="network-board">
              <div className="network-line line-horizontal" /><div className="network-line line-vertical" /><div className="network-line line-diagonal" />
              <span className="network-node node-one" /><span className="network-node node-two" /><span className="network-node node-three" />
              <motion.div className="signal signal-one" animate={reduceMotion ? undefined : { x: [0, 28, 0], opacity: [0.2, 1, 0.2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
              <motion.div className="signal signal-two" animate={reduceMotion ? undefined : { y: [0, 24, 0], opacity: [0.2, 1, 0.2] }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
              <div className="website-card tech-card"><div className="card-topline"><span className="window-dots" /><span className="card-tag">01</span></div><div className="mini-browser"><span /><span /><span /></div><div className="mini-bars"><i /><i /><i /></div><strong>Website</strong><small>Experiências que conectam</small></div>
              <motion.div className="core-card" animate={reduceMotion ? undefined : { y: [0, -7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}><div className="core-ring"><Activity size={20} /></div><div><span>ADSOFT</span><strong>CORE</strong></div><small>ORQUESTRAÇÃO DIGITAL</small></motion.div>
              <div className="data-card tech-card"><div className="data-chart"><span /><span /><span /><span /><span /></div><strong>Insights em movimento</strong><small>Dados que orientam decisões</small></div>
              <div className="system-cards">{systemCards.map(({ label, icon: Icon, tone }, index) => <motion.div key={label} className={`system-card ${tone}`} animate={reduceMotion ? undefined : { y: [0, index % 2 ? 5 : -5, 0] }} transition={{ duration: 4 + index * 0.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}><Icon size={15} /><span>{label}</span></motion.div>)}</div>
            </div>
            <div className="ecosystem-caption"><span className="pulse-dot" /> Um ecossistema, infinitas possibilidades.</div>
          </motion.div>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span /> role para explorar</div>
      </section>

      <section className="landing-section solutions-section" id="solucoes" aria-labelledby="solutions-title">
        <div className="section-inner">
          <motion.div className="section-heading" initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={transition}>
            <div className="eyebrow"><span className="eyebrow-dot" /> Estrutura digital inteligente</div>
            <h2 id="solutions-title">Uma base digital que acompanha o próximo passo.</h2>
            <p>Da presença digital ao software, conectamos tecnologia, dados, IA e automação para que cada etapa prepare a próxima.</p>
          </motion.div>
          <div className="solutions-grid">
            {solutions.map(({ title, description, icon: Icon }, index) => <motion.article className="solution-card" key={title} initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} whileHover={reduceMotion ? undefined : { y: -8, scale: 1.01 }} transition={{ ...transition, delay: reduceMotion ? 0 : index * 0.04 }}><div className="card-index">0{index + 1}</div><Icon size={21} strokeWidth={1.5} /><h3>{title}</h3><p>{description}</p></motion.article>)}
          </div>
        </div>
      </section>

      <section className="landing-section projects-section" id="projetos" aria-labelledby="projects-title">
        <div className="section-inner">
          <motion.div className="section-heading section-heading-split" initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={transition}>
            <div><div className="eyebrow"><span className="eyebrow-dot" /> Laboratório ADSOFT</div><h2 id="projects-title">Portfólio preparado para problemas reais.</h2></div>
            <p>Projetos demonstrativos com demos funcionais para explorar como diferentes negócios podem evoluir com tecnologia conectada.</p>
          </motion.div>
          <div className="projects-grid">
            {projects.map(({ title, description, icon: Icon }, index) => <motion.article className="project-card" key={title} initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} whileHover={reduceMotion ? undefined : { y: -8, scale: 1.01 }} transition={{ ...transition, delay: reduceMotion ? 0 : index * 0.04 }}><div className="project-card-top"><span className="project-label">Projeto demonstrativo</span><span className="project-number">0{index + 1}</span></div><Icon size={24} strokeWidth={1.4} /><h3>{title}</h3><p>{description}</p><span className="project-link">Explorar conceito <ArrowRight size={15} /></span></motion.article>)}
          </div>
        </div>
      </section>

      <section className="landing-section about-section" id="sobre" aria-labelledby="about-title">
        <div className="section-inner about-layout">
          <motion.div className="about-copy" initial={{ opacity: 0, x: reduceMotion ? 0 : -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={transition}>
            <div className="eyebrow"><span className="eyebrow-dot" /> Sobre a ADSOFT</div>
            <h2 id="about-title">A ADSOFT começa pelo digital e evolui junto com o negócio.</h2>
            <p>Somos uma empresa de tecnologia que constrói soluções personalizadas, sustentáveis e conectadas. O site é a porta de entrada. A solução digital completa é o produto.</p>
            <p>Um cliente pode começar pequeno e contratar novas soluções conforme a operação amadurece, do SEO e Google ao CRM, automação, sistemas e SaaS.</p>
          </motion.div>
          <motion.div className="evolution-panel" initial={{ opacity: 0, x: reduceMotion ? 0 : 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ ...transition, delay: 0.08 }}>
            <span className="panel-label">Evolução do cliente</span>
            <div className="evolution-list">{evolution.map((item, index) => <div className="evolution-step" key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < evolution.length - 1 && <ArrowRight size={15} />}</div>)}</div>
          </motion.div>
        </div>
      </section>

      <section className="landing-section contact-section" id="contato" aria-labelledby="contact-title">
        <div className="section-inner contact-layout">
          <motion.div className="contact-copy" initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={transition}>
            <div className="eyebrow"><span className="eyebrow-dot" /> Próximo passo</div>
            <h2 id="contact-title">Vamos transformar a próxima ideia em sistema.</h2>
            <p>Conte o que sua empresa precisa. Este formulário é uma primeira conversa visual e ainda não envia dados para um backend.</p>
            <div className="contact-signature">CONECTAMOS <b>•</b> OTIMIZAMOS <b>•</b> ESCALAMOS</div>
          </motion.div>
          <motion.form className="contact-form" onSubmit={handleSubmit} initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ ...transition, delay: 0.08 }}>
            <label>Nome<input name="name" type="text" placeholder="Como podemos chamar você?" required /></label>
            <label>E-mail<input name="email" type="email" placeholder="seu@email.com" required /></label>
            <div className="form-row"><label>Empresa<input name="company" type="text" placeholder="Nome da empresa" required /></label><label>Tipo de projeto<select name="projectType" defaultValue="" required><option value="" disabled>Selecione</option><option>Site ou landing page</option><option>Sistema ou dashboard</option><option>IA ou automação</option><option>SEO ou GEO</option></select></label></div>
            <label>Mensagem<textarea name="message" rows={4} placeholder="O que você quer construir?" required /></label>
            <button className="button button-primary form-submit" type="submit">Enviar mensagem <Send size={16} /></button>
            {formSent && <p className="form-feedback" role="status"><Check size={16} /> Mensagem validada visualmente. O envio será conectado em uma próxima etapa.</p>}
          </motion.form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner"><a className="footer-brand" href="#inicio" onClick={(event) => handleAnchorClick(event, "inicio")}>ADSOFT <span>SYSTEMS</span></a><p>CONECTAMOS <b>•</b> OTIMIZAMOS <b>•</b> ESCALAMOS</p><nav aria-label="Links do rodapé">{navigation.map((item) => <a key={item.id} href={`#${item.id}`} onClick={(event) => handleAnchorClick(event, item.id)}>{item.label}</a>)}</nav><small>© 2026 ADSOFT SYSTEMS. Em desenvolvimento.</small></div>
      </footer>
    </main>
  );
}