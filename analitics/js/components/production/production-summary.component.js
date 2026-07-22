'use strict';

import { renderProductionSummary } from './production.renderer.js';
import { initializeProductionDetail } from './production-detail.component.js';

export function initializeProduction() {
  const summary = renderProductionSummary(document.querySelector('.production'));
  const detail = initializeProductionDetail();
  return { summary, detail };
}
