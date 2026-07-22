'use strict';

import { renderSummary } from './summary.renderer.js';

export function initializeSummary() {
  return renderSummary(document.querySelector('.kpi-grid'));
}
