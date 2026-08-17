export const INTERNATIONAL_QUESTIONS = {
  en: [
    {
      id: 'companyName',
      section: 'Identity',
      title: 'Brand / Company Name',
      question: 'What is the name of your company, project, or brand?',
      placeholder: 'e.g., Apex Intelligence, Kuro Atelier, CyberCorp',
      type: 'text',
      required: true,
      hint: 'Type your brand name and press ENTER.'
    },
    {
      id: 'tagline',
      section: 'Identity',
      title: 'Tagline & Proposition',
      question: 'In one sentence, what does your brand do or stand for?',
      placeholder: 'e.g., Autonomous predictive engine for enterprise supply chain resilience.',
      type: 'text',
      required: false,
      hint: 'A concise summary of your core proposition.'
    },
    {
      id: 'industry',
      section: 'Identity',
      title: 'Industry Sector',
      question: 'Which primary industry or market niche best describes your brand?',
      type: 'choice',
      options: [
        'B2B SaaS / Enterprise Tech',
        'E-Commerce & Retail Studio',
        'Fintech & Web3 Platform',
        'Creative Agency & Studio',
        'Consumer App & Mobile',
        'Healthcare & BioTech',
        'Gaming & Entertainment',
        'Custom Niche Sector'
      ],
      required: true,
      hint: 'Select the primary sector.'
    },
    {
      id: 'targetAudience',
      section: 'Audience',
      title: 'Target Persona',
      question: 'Who is your ideal customer or primary target demographic?',
      placeholder: 'e.g., Tech leads at mid-market SaaS firms, Gen Z fashion enthusiasts',
      type: 'text',
      required: true,
      hint: 'Describe your primary target audience.'
    },
    {
      id: 'customerPainPoints',
      section: 'Audience',
      title: 'Core Pain Points',
      question: 'What primary problems or friction points does your brand eliminate?',
      type: 'tags',
      options: [
        'High complexity & steep learning curve',
        'Outdated visual aesthetic & weak brand',
        'Slow execution & time wasted in workflows',
        'Lack of trust & poor conversion credibility',
        'High operational & software costs',
        'Generic market competition',
        'Fragmented tools & disconnected data'
      ],
      required: true,
      hint: 'Select all relevant pain points.'
    },
    {
      id: 'toneOfVoice',
      section: 'Personality',
      title: 'Brand Voice',
      question: 'How should your brand sound to the world? Select core attributes:',
      type: 'tags',
      options: [
        'Minimalist & Elegant',
        'Bold & Rebellious',
        'High-Tech & Cyber',
        'Warm & Human-Centric',
        'Authoritative & Academic',
        'Playful & Witty',
        'Luxury & Prestigious',
        'Raw & Underground'
      ],
      required: true,
      hint: 'Select key brand voice attributes.'
    },
    {
      id: 'toneSpectrum',
      section: 'Personality',
      title: 'Spectrum Matrix',
      question: 'Fine-tune your positioning sliders (1 = Left, 10 = Right):',
      type: 'sliders',
      sliders: [
        { id: 'modernClassic', label: 'Heritage Classic (1)  ↔  Cutting-Edge Modern (10)', defaultVal: 9 },
        { id: 'casualFormal', label: 'Friendly Casual (1)   ↔  Executive Formal (10)', defaultVal: 5 },
        { id: 'subtleBold', label: 'Understated Minimal (1) ↔ High-Impact Bold (10)', defaultVal: 8 },
        { id: 'techHuman', label: 'Organic Human (1)      ↔  Futuristic Tech (10)', defaultVal: 8 }
      ],
      required: false,
      hint: 'Adjust sliders.'
    },
    {
      id: 'colorVibe',
      section: 'Aesthetics',
      title: 'Visual Direction',
      question: 'What visual color direction best fits your brand identity?',
      type: 'choice',
      options: [
        'Electric Emerald & Cyber Mint (Tech & High-Energy)',
        'Clean Obsidian & Slate Monochrome (Minimal Black & White)',
        'Deep Cyber Dark (Neon Cyan & Electric Purple)',
        'Solar Amber & Warm Gold (Luxury, Heritage & Warmth)',
        'Cobalt Enterprise Blue (Trust & Corporate B2B)',
        'Sunset Coral & Terracotta (Lifestyle & Creative)'
      ],
      required: true,
      hint: 'Select color vibe palette.'
    },
    {
      id: 'deliverables',
      section: 'Scope',
      title: 'Deliverables',
      question: 'What assets or deliverables are required for this engagement?',
      type: 'tags',
      options: [
        'Complete Visual Brand Identity System',
        'Logo Suite & Vector Brand Marks',
        'Typography & Color Guidelines',
        'Web Application / Website Design (Figma)',
        'Design System & Component Library',
        'Pitch Deck & Investor Presentation',
        'Social Media Kit',
        'Copywriting Playbook'
      ],
      required: true,
      hint: 'Select deliverables scope.'
    },
    {
      id: 'timeline',
      section: 'Scope',
      title: 'Project Timeline',
      question: 'What is your target launch date or turnaround timeframe?',
      type: 'choice',
      options: [
        '⚡ Express Intake Sprint (1 - 2 Weeks)',
        '🚀 Standard Fast-Track (3 - 4 Weeks)',
        '🏗️ Comprehensive Overhaul (6 - 8 Weeks)',
        '📅 Flexible / Ongoing Advisory Partnership'
      ],
      required: true,
      hint: 'Select turnaround duration.'
    },
    {
      id: 'budgetTier',
      section: 'Scope',
      title: 'Investment Allocation',
      question: 'What is your estimated investment range for this project?',
      type: 'choice',
      options: [
        'Tier I: 5,000 - 10,000 (Sprint)',
        'Tier II: 10,000 - 25,000 (Full Brand + Web)',
        'Tier III: 25,000 - 50,000+ (Enterprise System)',
        'Undisclosed / Custom Proposal Required'
      ],
      required: false,
      hint: 'Select budget tier.'
    },
    {
      id: 'inspirationLinks',
      section: 'References',
      title: 'Inspiration Benchmarks',
      question: 'List 1-3 websites or brands you admire as benchmarks:',
      placeholder: 'e.g., Stripe, Linear.app, Vercel, Apple',
      type: 'text',
      required: false,
      hint: 'Reference brands for visual benchmarking.'
    },
    {
      id: 'notes',
      section: 'References',
      title: 'Mandatory Directives',
      question: 'Any mandatory directives, non-negotiables, or things to avoid?',
      placeholder: 'e.g., Must retain dark mode aesthetic; avoid generic stock vectors.',
      type: 'text',
      required: false,
      hint: 'Final directives.'
    }
  ],
  es: [
    {
      id: 'companyName',
      section: 'Identidad',
      title: 'Nombre de la Marca',
      question: '¿Cuál es el nombre de su empresa, proyecto o marca?',
      placeholder: 'ej., Apex Intelligence, Kuro Atelier, CyberCorp',
      type: 'text',
      required: true,
      hint: 'Escriba el nombre y presione ENTER.'
    },
    {
      id: 'tagline',
      section: 'Identidad',
      title: 'Lema y Propuesta',
      question: 'En una frase, ¿qué hace o representa su marca?',
      placeholder: 'ej., Motor predictivo autónomo para la resiliencia empresarial.',
      type: 'text',
      required: false,
      hint: 'Un resumen conciso de su propuesta.'
    },
    {
      id: 'industry',
      section: 'Identidad',
      title: 'Sector Industrial',
      question: '¿Qué sector o nicho de mercado describe mejor su marca?',
      type: 'choice',
      options: [
        'SaaS B2B / Tecnología Empresarial',
        'Comercio Electrónico y Estudio Minorista',
        'Fintech y Plataforma Web3',
        'Agencia Creativa y Estudio de Diseño',
        'Aplicación Móvil de Consumo',
        'Salud y Biotecnología',
        'Videojuegos y Entretenimiento',
        'Sector Personalizado'
      ],
      required: true,
      hint: 'Seleccione el sector principal.'
    },
    {
      id: 'targetAudience',
      section: 'Audiencia',
      title: 'Perfil de Audiencia',
      question: '¿Quién es su cliente ideal o público objetivo?',
      placeholder: 'ej., Directores de tecnología en empresas SaaS',
      type: 'text',
      required: true,
      hint: 'Describa su público objetivo.'
    },
    {
      id: 'customerPainPoints',
      section: 'Audiencia',
      title: 'Puntos de Dolor',
      question: '¿Qué problemas principales elimina su marca para sus clientes?',
      type: 'tags',
      options: [
        'Alta complejidad y curva de aprendizaje',
        'Estética visual obsoleta y marca débil',
        'Ejecución lenta y tiempo perdido',
        'Falta de confianza y baja conversión',
        'Altos costos operativos y de software',
        'Competencia genérica en el mercado',
        'Herramientas fragmentadas y datos desconectados'
      ],
      required: true,
      hint: 'Seleccione los puntos de dolor.'
    },
    {
      id: 'toneOfVoice',
      section: 'Personalidad',
      title: 'Tono de Voz',
      question: '¿Cómo debe sonar su marca al mundo? Seleccione atributos:',
      type: 'tags',
      options: [
        'Minimalista y Elegante',
        'Audaz y Rebelde',
        'Alta Tecnología y Ciber',
        'Cálido y Humano',
        'Autoritario y Académico',
        'Divertido e Ingenioso',
        'Lujo y Prestigio',
        'Subterráneo e Innovador'
      ],
      required: true,
      hint: 'Seleccione atributos clave.'
    },
    {
      id: 'toneSpectrum',
      section: 'Personalidad',
      title: 'Matriz de Posicionamiento',
      question: 'Ajuste los controles de posicionamiento (1 = Izquierda, 10 = Derecha):',
      type: 'sliders',
      sliders: [
        { id: 'modernClassic', label: 'Herencia Clásica (1) ↔ Vanguardia Moderna (10)', defaultVal: 9 },
        { id: 'casualFormal', label: 'Amigable y Informal (1) ↔ Ejecutivo y Formal (10)', defaultVal: 5 },
        { id: 'subtleBold', label: 'Minimalista Sutil (1) ↔ Alto Impacto Audaz (10)', defaultVal: 8 },
        { id: 'techHuman', label: 'Humano Orgánico (1) ↔ Tecnología Futurista (10)', defaultVal: 8 }
      ],
      required: false,
      hint: 'Ajuste los deslizadores.'
    },
    {
      id: 'colorVibe',
      section: 'Estética',
      title: 'Dirección Visual',
      question: '¿Qué paleta de colores representa mejor su marca?',
      type: 'choice',
      options: [
        'Esmeralda Eléctrico y Menta Ciber',
        'Obsidiana Limpia y Monocromo',
        'Ciber Oscuro Profundo (Neón y Púrpura)',
        'Ámbar Solar y Oro Cálido (Lujo)',
        'Azul Corporativo Cobalto',
        'Coral de Atardecer y Terracota'
      ],
      required: true,
      hint: 'Seleccione la paleta de colores.'
    },
    {
      id: 'deliverables',
      section: 'Alcance',
      title: 'Entregables',
      question: '¿Qué activos o servicios requiere para este proyecto?',
      type: 'tags',
      options: [
        'Sistema Completo de Identidad Visual',
        'Suite de Logotipos y Marcas Vectoriales',
        'Guía de Tipografía y Paleta de Colores',
        'Diseño de Sitio Web / App (Figma)',
        'Sistema de Diseño y Biblioteca de Componentes',
        'Presentación para Inversionistas',
        'Kit de Redes Sociales',
        'Manual de Redacción y Mensajes'
      ],
      required: true,
      hint: 'Seleccione el alcance.'
    },
    {
      id: 'timeline',
      section: 'Alcance',
      title: 'Plazo del Proyecto',
      question: '¿Cuál es su plazo estimado para el lanzamiento?',
      type: 'choice',
      options: [
        '⚡ Sprint Express (1 - 2 Semanas)',
        '🚀 Vía Rápida Estándar (3 - 4 Semanas)',
        '🏗️ Renovación Integral (6 - 8 Semanas)',
        '📅 Asesoría Continua y Flexible'
      ],
      required: true,
      hint: 'Seleccione el plazo.'
    },
    {
      id: 'budgetTier',
      section: 'Alcance',
      title: 'Presupuesto Estimado',
      question: '¿Cuál es el rango de inversión estimado?',
      type: 'choice',
      options: [
        'Nivel I: 5.000 - 10.000 (Sprint)',
        'Nivel II: 10.000 - 25.000 (Marca + Web)',
        'Nivel III: 25.000 - 50.000+ (Sistema Empresarial)',
        'Por Determinar / Propuesta Personalizada'
      ],
      required: false,
      hint: 'Seleccione el nivel de presupuesto.'
    },
    {
      id: 'inspirationLinks',
      section: 'Referencias',
      title: 'Marcas de Referencia',
      question: 'Indique 1-3 sitios web o marcas que admire como referencia:',
      placeholder: 'ej., Stripe, Linear.app, Vercel, Apple',
      type: 'text',
      required: false,
      hint: 'Referencias de diseño.'
    },
    {
      id: 'notes',
      section: 'Referencias',
      title: 'Directivas Obligatorias',
      question: '¿Tiene alguna directiva o requisito obligatorio?',
      placeholder: 'ej., Mantener tema oscuro; evitar vectores genéricos.',
      type: 'text',
      required: false,
      hint: 'Notas finales.'
    }
  ]
};

export function getQuestionsForLanguage(langKey = 'en') {
  return INTERNATIONAL_QUESTIONS[langKey] || INTERNATIONAL_QUESTIONS.en;
}

export const THEMES = {
  matrix: {
    id: 'matrix',
    name: 'Mint Hacker CLI',
    bg: '#070709',
    termBg: '#0a0a0d',
    cardBg: '#111116',
    border: '#272730',
    text: '#f4f4f6',
    dimText: '#71717a',
    accent: '#00f5a0',
    prompt: '#00f5a0',
    glow: 'rgba(0, 245, 160, 0.15)',
    font: "'JetBrains Mono', monospace"
  }
};

export const DEMO_PRESETS = {
  saas: {
    name: 'Apex AI (B2B SaaS)',
    data: {
      companyName: 'Apex Intelligence',
      tagline: 'Autonomous predictive engine for enterprise supply chain resilience.',
      industry: 'B2B SaaS / Enterprise Tech',
      targetAudience: 'VP of Logistics & CSCOs at Fortune 500 manufacturing firms.',
      customerPainPoints: [
        'Slow execution & time wasted in workflows',
        'High operational & software costs',
        'Fragmented tools & disconnected data'
      ],
      toneOfVoice: [
        'Minimalist & Elegant',
        'High-Tech & Cyber',
        'Authoritative & Academic'
      ],
      toneSpectrum: { modernClassic: 9, casualFormal: 8, subtleBold: 7, techHuman: 9 },
      colorVibe: 'Electric Emerald & Cyber Mint (Tech & High-Energy)',
      deliverables: [
        'Complete Visual Brand Identity System',
        'Design System & Component Library',
        'Web Application / Website Design (Figma)'
      ],
      timeline: '🚀 Standard Fast-Track (3 - 4 Weeks)',
      budgetTier: 'Tier II: 10,000 - 25,000 (Full Brand + Web)',
      inspirationLinks: 'Linear.app, Vercel, Datadog',
      notes: 'Need high-contrast dark theme and crisp data visualization component layouts.'
    }
  }
};
