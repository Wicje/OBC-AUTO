// Generates structured brief data, Markdown documentation, and synthetic AI positioning insights

export function generateColorPalette(colorVibe) {
  if (!colorVibe) return ['#0f172a', '#3b82f6', '#06b6d4', '#64748b', '#f8fafc'];
  const lower = colorVibe.toLowerCase();
  
  if (lower.includes('cyber') || lower.includes('neon')) {
    return ['#0a0518', '#00f0ff', '#ff007f', '#7000ff', '#f8fafc'];
  } else if (lower.includes('obsidian') || lower.includes('monochrome')) {
    return ['#09090b', '#27272a', '#71717a', '#a1a1aa', '#f4f4f5'];
  } else if (lower.includes('emerald') || lower.includes('matrix')) {
    return ['#051c0d', '#10b981', '#34d399', '#064e3b', '#ecfdf5'];
  } else if (lower.includes('amber') || lower.includes('gold')) {
    return ['#1c1305', '#d97706', '#f59e0b', '#78350f', '#fffbeb'];
  } else if (lower.includes('cobalt') || lower.includes('slate')) {
    return ['#0f172a', '#2563eb', '#38bdf8', '#475569', '#f8fafc'];
  } else if (lower.includes('sunset') || lower.includes('coral')) {
    return ['#1f0d0d', '#f43f5e', '#fb923c', '#881337', '#fff1f2'];
  }
  return ['#0f172a', '#3b82f6', '#10b981', '#f59e0b', '#f8fafc'];
}

export function synthesizePositioningStatement(answers) {
  const company = answers.companyName || 'The Brand';
  const tagline = answers.tagline || 'Next-generation leader in the space';
  const audience = answers.targetAudience || 'discerning clients and forward-thinking organizations';
  const industry = answers.industry || 'the digital landscape';
  const tones = Array.isArray(answers.toneOfVoice) ? answers.toneOfVoice.join(', ') : (answers.toneOfVoice || 'innovative and distinct');

  return `For ${audience} who demand excellence in ${industry}, ${company} is the premier solution that ${tagline.toLowerCase().replace(/\.$/, '')}. Unlike traditional market alternatives, ${company} delivers a ${tones.toLowerCase()} experience defined by uncompromising quality and strategic clarity.`;
}

export function generateMarkdownBrief(answers) {
  const company = answers.companyName || 'Untitled Brand';
  const tagline = answers.tagline || 'N/A';
  const industry = answers.industry || 'Unspecified';
  const target = answers.targetAudience || 'Unspecified';
  const painPoints = Array.isArray(answers.customerPainPoints) ? answers.customerPainPoints.map(p => `- ${p}`).join('\n') : `- ${answers.customerPainPoints || 'N/A'}`;
  const tone = Array.isArray(answers.toneOfVoice) ? answers.toneOfVoice.join(', ') : (answers.toneOfVoice || 'N/A');
  const colorVibe = answers.colorVibe || 'Unspecified';
  const deliverables = Array.isArray(answers.deliverables) ? answers.deliverables.map(d => `- [ ] ${d}`).join('\n') : `- [ ] ${answers.deliverables || 'N/A'}`;
  const timeline = answers.timeline || 'TBD';
  const budget = answers.budgetTier || 'TBD';
  const references = answers.inspirationLinks || 'None provided';
  const notes = answers.notes || 'None';

  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const positioning = synthesizePositioningStatement(answers);
  const palette = generateColorPalette(colorVibe);

  return `# BRAND BRIEF // ${company.toUpperCase()}
*Generated via Automaton Onboarding System on ${dateStr}*

---

## 1. EXECUTIVE SUMMARY & IDENTITY
- **Brand Name**: ${company}
- **Tagline / Core Proposition**: ${tagline}
- **Industry Sector**: ${industry}
- **Document Version**: 1.0.0 (Final Intake)

### Strategic Positioning Statement
> "${positioning}"

---

## 2. TARGET AUDIENCE & PAIN POINTS
**Primary Audience**:
${target}

**Key Pain Points Solved**:
${painPoints}

---

## 3. BRAND PERSONALITY & AESTHETICS
- **Tone of Voice Attributes**: ${tone}
- **Visual Color Direction**: ${colorVibe}
- **Recommended Swatches**: ${palette.join(', ')}

### Tone Spectrum Matrix
- **Heritage (1) vs Modern (10)**: ${answers.toneSpectrum?.modernClassic || 8} / 10
- **Casual (1) vs Executive (10)**: ${answers.toneSpectrum?.casualFormal || 5} / 10
- **Minimal (1) vs Bold (10)**: ${answers.toneSpectrum?.subtleBold || 7} / 10
- **Human (1) vs Tech (10)**: ${answers.toneSpectrum?.techHuman || 8} / 10

---

## 4. PROJECT SCOPE & DELIVERABLES
**Required Assets**:
${deliverables}

- **Target Timeline**: ${timeline}
- **Investment Tier**: ${budget}

---

## 5. INSPIRATION & DIRECTIVES
- **Reference Benchmarks**: ${references}
- **Must-Haves & Mandatory Directives**: ${notes}

---
*End of Brief. Compiled automatically by Automaton CLI.*
`;
}
