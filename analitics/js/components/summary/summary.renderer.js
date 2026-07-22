'use strict';

/**
 * Renderer: Summary
 * Responsibility: Renders the dashboard KPI Summary markup.
 * Input: The Summary container and a data object with KPI presentation data.
 * Output: The Summary HTML inside the provided container.
 */
export function renderSummary(container, data) {
  if (!container || !data || !Array.isArray(data.kpis) || data.kpis.some((kpi) => !kpi || typeof kpi !== 'object')) {
    return;
  }

  const enabledKpis = data.kpis.filter((kpi) => kpi.enabled);

  container.innerHTML = `
    <section class="kpi-grid" aria-label="Indicadores principales">
      ${enabledKpis.map(renderKpiCard).join('')}
    </section>
  `;

  return;
}

function renderKpiCard(kpi) {
  const icon = kpi.icon === 'scale'
    ? '<span>⚖</span>'
    : `<svg><use href="#i-${kpi.icon}"/></svg>`;

  return `<article class="kpi-card ${kpi.variant}"><div class="metric-icon">${icon}</div><div class="metric"><b>${kpi.title}</b><strong>${kpi.value} <small>${kpi.unit}</small></strong><span>${kpi.description}</span></div><div class="metric-side"><strong class="${kpi.comparisonClass}">${kpi.comparison}</strong><small>${kpi.reference}</small><em class="tag ${kpi.statusClass}">${kpi.status}</em></div></article>`;
}