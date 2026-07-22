'use strict';

/**
 * Renderer: Summary
 * Responsibility: Renders the dashboard KPI Summary markup.
 * Input: The Summary container and a data object with KPI presentation data.
 * Output: The Summary HTML inside the provided container.
 */
export function renderSummary(container, data) {
  if (!container || !data || !Array.isArray(data.kpis) || data.kpis.length !== 3 || data.kpis.some((kpi) => !kpi || typeof kpi !== 'object')) {
    return;
  }

  const [production, dough, deviation] = data.kpis;

  container.innerHTML = `
    <section class="kpi-grid" aria-label="Indicadores principales">
      <article class="kpi-card ${production.variant}"><div class="metric-icon"><svg><use href="#i-${production.icon}"/></svg></div><div class="metric"><b>${production.title}</b><strong>${production.value} <small>${production.unit}</small></strong><span>${production.description}</span></div><div class="metric-side"><strong class="${production.comparisonClass}">${production.comparison}</strong><small>${production.reference}</small><em class="tag ${production.statusClass}">${production.status}</em></div></article>
      <article class="kpi-card ${dough.variant}"><div class="metric-icon"><span>⚖</span></div><div class="metric"><b>${dough.title}</b><strong>${dough.value} <small>${dough.unit}</small></strong><span>${dough.description}</span></div><div class="metric-side"><strong class="${dough.comparisonClass}">${dough.comparison}</strong><small>${dough.reference}</small><em class="tag ${dough.statusClass}">${dough.status}</em></div></article>
      <article class="kpi-card ${deviation.variant}"><div class="metric-icon"><svg><use href="#i-${deviation.icon}"/></svg></div><div class="metric"><b>${deviation.title}</b><strong>${deviation.value} <small>${deviation.unit}</small></strong><span>${deviation.description}</span></div><div class="metric-side"><strong class="${deviation.comparisonClass}">${deviation.comparison}</strong><small>${deviation.reference}</small><em class="tag ${deviation.statusClass}">${deviation.status}</em></div></article>
    </section>
  `;

  return;
}
