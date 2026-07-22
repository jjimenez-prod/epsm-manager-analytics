'use strict';

import { renderProductionDetail } from './production.renderer.js';

/**
 * Component: Production Detail
 * Responsibility: Coordinates rendering for the Production Detail section.
 * Owns: The Production Detail container lookup and Production Detail presentation data.
 * Does not own: Dashboard layout, styling, data services, or production calculations.
 */
const productionDetailData = {
  title: 'Detalle de producción',
  searchPlaceholder: 'Buscar fecha...',
  date: '21 Julio 2026',
  shifts: [
    { name: 'Mañana', hours: '(07:00 - 15:00)', amount: '730', dough: '30 kg masa utilizada', deviation: '0,81 % desviación' },
    { name: 'Tarde', hours: '(15:00 - 23:00)', amount: '510', dough: '22 kg masa utilizada', deviation: '0,92 % desviación' },
    { name: 'Noche', hours: '(23:00 - 07:00)', empty: 'Sin producción registrada' }
  ],
  action: 'Ver detalle',
  collapsedDates: ['20 Julio 2026', '19 Julio 2026']
};

export function initializeProductionDetail() {
  const container = document.querySelector('#production-detail-root');

  if (!container) {
    console.warn('[Production Detail] Container "#production-detail-root" was not found.');
    return;
  }

  const data = productionDetailData;
  return renderProductionDetail(container, data);
}
