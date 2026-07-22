'use strict';

import { renderOperators } from './operators.renderer.js';

/**
 * Component: Operators
 * Responsibility: Coordinates rendering for the dashboard Operators section.
 * Owns: The Operators container lookup and Operators presentation data.
 * Does not own: Dashboard layout, styling, data services, or operator calculations.
 */
const operatorsData = {
  title: 'Performance Operadores',
  searchPlaceholder: 'Buscar operador...',
  operators: [
    { rank: '🥇', name: 'Ana', elaborations: '18', deviation: '0,84 %', comparisonClass: 'positive', comparison: '▲ +3', statusClass: 'success', status: 'Bonus' },
    { rank: '🥈', name: 'Karin', elaborations: '15', deviation: '0,84 %', comparisonClass: 'positive', comparison: '▲ +1', statusClass: 'success', status: 'Bonus' },
    { rank: '🥉', name: 'Massimo', elaborations: '12', deviation: '0,84 %', comparisonClass: 'negative', comparison: '▼ -2', statusClass: 'success', status: 'Bonus' },
    { rank: '4', name: 'Luca', elaborations: '8', deviation: '1,12 %', comparisonClass: 'negative', comparison: '▼ -3', statusClass: 'danger', status: 'Sin bonus' },
    { rank: '5', name: 'Giulia', elaborations: '7', deviation: '1,12 %', comparisonClass: 'negative', comparison: '▼ -1', statusClass: 'danger', status: 'Sin bonus' }
  ],
  action: 'Ver todos los operadores'
};

export function initializeOperators() {
  const container = document.querySelector('#operators-root');

  if (!container) {
    console.warn('[Operators] Container "#operators-root" was not found.');
    return;
  }

  const data = operatorsData;
  return renderOperators(container, data);
}
