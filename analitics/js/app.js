'use strict';

import { initializeFilters } from './components/filters/filters.component.js';
import { initializeSummary } from './components/summary/summary.component.js';
import { initializeInsights } from './components/insights/insights.component.js';
import { initializeOperators } from './components/operators/operators.component.js';
import { initializeProduction } from './components/production/production-summary.component.js';

function initialize() {
  initializeFilters();
  initializeSummary();
  initializeInsights();
  initializeOperators();
  initializeProduction();
}

document.addEventListener('DOMContentLoaded', initialize);
