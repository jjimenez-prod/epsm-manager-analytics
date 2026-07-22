'use strict';

import { renderSummary } from './summary.renderer.js';

/**
 * Component: Summary
 * Responsibility: Coordinates rendering for the dashboard KPI Summary section.
 * Owns: The Summary container lookup and Summary presentation data.
 * Does not own: Dashboard layout, styling, data services, or KPI calculations.
 */
const summaryData = {
  kpis: [
    {
      variant: 'red',
      icon: 'pizza',
      title: 'Producción Total',
      value: '4.320',
      unit: 'unidades',
      description: '18 elaboraciones',
      comparisonClass: 'positive',
      comparison: '▲ +6,4 %',
      reference: 'vs Junio 2026',
      statusClass: 'success',
      status: 'Excelente'
    },
    {
      variant: 'green',
      icon: 'scale',
      title: 'Masa Utilizada',
      value: '812',
      unit: 'kg',
      description: '45 kg promedio / lote',
      comparisonClass: 'negative',
      comparison: '▼ -3,1 %',
      reference: 'vs Junio 2026',
      statusClass: 'warn',
      status: 'Esperado'
    },
    {
      variant: 'purple',
      icon: 'target',
      title: 'Desviación Promedio',
      value: '0,84',
      unit: '%',
      description: 'Desviación sobre objetivo',
      comparisonClass: 'positive',
      comparison: '▼ -0,12 pts',
      reference: 'vs Junio 2026',
      statusClass: 'success',
      status: 'Muy buena mejora'
    }
  ]
};

export function initializeSummary() {
  const container = document.querySelector('#summary-root');

  if (!container) {
    console.warn('[Summary] Container "#summary-root" was not found.');
    return;
  }

  const data = summaryData;
  return renderSummary(container, data);
}
