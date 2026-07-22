'use strict';

import { renderInsights } from './insights.renderer.js';

/**
 * Component: Insights
 * Responsibility: Coordinates rendering for the dashboard Insights section.
 * Owns: The Insights container lookup and Insights presentation data.
 * Does not own: Dashboard layout, styling, data services, or insight calculations.
 */
const insightsData = {
  title: 'Insights principales',
  items: [
    { icon: '↗', primary: 'Producción aumentó un 6,4 %', secondary: 'respecto al mes anterior.' },
    { icon: '✓', primary: 'La desviación mejoró 0,12', secondary: 'puntos porcentuales.' },
    { icon: '♕', highlight: 'Ana lidera', primary: ' el número de', secondary: 'elaboraciones este mes.' },
    { icon: '▣', primary: 'El 23 de julio fue el día con', secondary: 'mayor producción.' }
  ],
  action: 'Ver todos los insights'
};

export function initializeInsights() {
  const container = document.querySelector('#insights-root');

  if (!container) {
    console.warn('[Insights] Container "#insights-root" was not found.');
    return;
  }

  const data = insightsData;
  return renderInsights(container, data);
}
