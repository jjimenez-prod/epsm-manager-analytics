'use strict';

/**
 * Renderer: Operators
 * Responsibility: Renders the dashboard Operators markup.
 * Input: The Operators container and a data object with Operators presentation data.
 * Output: The Operators HTML inside the provided container.
 */
export function renderOperators(container, data) {
  if (!container || !data || !Array.isArray(data.operators) || data.operators.length !== 5 || data.operators.some((operator) => !operator || typeof operator !== 'object')) {
    return;
  }

  const [ana, karin, massimo, luca, giulia] = data.operators;

  container.innerHTML = `
    <article class="panel table-panel operators"><div class="panel-header"><h2><span>♧</span>${data.title}</h2><label class="search"><input placeholder="${data.searchPlaceholder}"/><svg><use href="#i-search"/></svg></label></div><table><thead><tr><th>#</th><th>Operador</th><th>Elaboraciones</th><th>Desviación Prom.</th><th>vs Mes anterior</th><th>Estado</th></tr></thead><tbody><tr><td>${ana.rank}</td><td>${ana.name}</td><td>${ana.elaborations}</td><td>${ana.deviation}</td><td class="${ana.comparisonClass}">${ana.comparison}</td><td><span class="tag ${ana.statusClass}">${ana.status}</span></td></tr><tr><td>${karin.rank}</td><td>${karin.name}</td><td>${karin.elaborations}</td><td>${karin.deviation}</td><td class="${karin.comparisonClass}">${karin.comparison}</td><td><span class="tag ${karin.statusClass}">${karin.status}</span></td></tr><tr><td>${massimo.rank}</td><td>${massimo.name}</td><td>${massimo.elaborations}</td><td>${massimo.deviation}</td><td class="${massimo.comparisonClass}">${massimo.comparison}</td><td><span class="tag ${massimo.statusClass}">${massimo.status}</span></td></tr><tr><td>${luca.rank}</td><td>${luca.name}</td><td>${luca.elaborations}</td><td>${luca.deviation}</td><td class="${luca.comparisonClass}">${luca.comparison}</td><td><span class="tag ${luca.statusClass}">${luca.status}</span></td></tr><tr><td>${giulia.rank}</td><td>${giulia.name}</td><td>${giulia.elaborations}</td><td>${giulia.deviation}</td><td class="${giulia.comparisonClass}">${giulia.comparison}</td><td><span class="tag ${giulia.statusClass}">${giulia.status}</span></td></tr></tbody></table><a class="panel-footer" href="#">${data.action} <svg><use href="#i-arrow"/></svg></a></article>
  `;

  return;
}
