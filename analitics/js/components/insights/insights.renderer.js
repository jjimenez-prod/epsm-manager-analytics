'use strict';

/**
 * Renderer: Insights
 * Responsibility: Renders the dashboard Insights markup.
 * Input: The Insights container and a data object with Insights presentation data.
 * Output: The Insights HTML inside the provided container.
 */
export function renderInsights(container, data) {
  if (!container || !data || !Array.isArray(data.items) || data.items.length !== 4 || data.items.some((item) => !item || typeof item !== 'object')) {
    return;
  }

  const [production, deviation, leader, peakDay] = data.items;

  container.innerHTML = `
    <section class="insights panel"><div class="section-title orange">♧ <strong>${data.title}</strong></div><div class="insight-list"><p><b>${production.icon}</b>${production.primary}<br>${production.secondary}</p><p><b>${deviation.icon}</b>${deviation.primary}<br>${deviation.secondary}</p><p><b>${leader.icon}</b><strong>${leader.highlight}</strong>${leader.primary}<br>${leader.secondary}</p><p><b>${peakDay.icon}</b>${peakDay.primary}<br>${peakDay.secondary}</p></div><button class="button-outline small">${data.action} <svg><use href="#i-arrow"/></svg></button></section>
  `;

  return;
}
