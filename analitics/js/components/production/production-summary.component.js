'use strict';

import { renderProductionSummary } from './production.renderer.js';

/**
 * Component: Production Summary
 * Responsibility: Coordinates rendering for the daily Production Summary section.
 * Owns: The Production Summary container lookup and Production Summary presentation data.
 * Does not own: Dashboard layout, styling, data services, or production calculations.
 */
const productionSummaryData = {
  title: 'Producción diaria',
  days: [
    { date: '21 Jul', production: '1.240 unidades', dough: '52 kg', deviation: '0,81 %', deviationClass: 'status-dot', comparisonClass: 'positive', comparison: '▲ +8,0 %' },
    { date: '22 Jul', production: '980 unidades', dough: '44 kg', deviation: '1,22 %', deviationClass: 'status-dot red-dot', comparisonClass: 'negative', comparison: '▼ -4,3 %' },
    { date: '23 Jul', production: '1.350 unidades', dough: '58 kg', deviation: '0,73 %', deviationClass: 'status-dot', comparisonClass: 'positive', comparison: '▲ +12,1 %' },
    { date: '24 Jul', production: '890 unidades', dough: '39 kg', deviation: '0,92 %', deviationClass: 'status-dot', comparisonClass: 'negative', comparison: '▼ -6,2 %' },
    { date: '25 Jul', production: '—', dough: '—', deviation: '—', comparison: '—' }
  ],
  action: 'Ver más días'
};

export function initializeProductionSummary() {
  const container = document.querySelector('#production-summary-root');

  if (!container) {
    console.warn('[Production Summary] Container "#production-summary-root" was not found.');
    return;
  }

  const data = productionSummaryData;
  return renderProductionSummary(container, data);
}
