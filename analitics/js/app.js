'use strict';

import { initializeFilters } from './components/filters/filters.component.js';
import { initializeSummary } from './components/summary/summary.component.js';
import { initializeInsights } from './components/insights/insights.component.js';
import { initializeOperators } from './components/operators/operators.component.js';
import { initializeProductionSummary } from './components/production/production-summary.component.js';
import { initializeProductionDetail } from './components/production/production-detail.component.js';

function initialize() {
  initializeFilters();
  initializeSummary();
  initializeInsights();
  initializeOperators();
  initializeProductionSummary();
  initializeProductionDetail();
}

document.addEventListener('DOMContentLoaded', initialize);
