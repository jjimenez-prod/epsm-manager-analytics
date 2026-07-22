'use strict';

/**
 * Renderer: Production Summary
 * Responsibility: Renders the daily Production Summary markup.
 * Input: The Production Summary container and a data object with daily production presentation data.
 * Output: The Production Summary HTML inside the provided container.
 */
export function renderProductionSummary(container, data) {
  if (!container || !data || !Array.isArray(data.days) || data.days.length !== 5 || data.days.some((day) => !day || typeof day !== 'object')) {
    return;
  }

  const [firstDay, secondDay, thirdDay, fourthDay, fifthDay] = data.days;

  container.innerHTML = `
    <article class="panel table-panel production"><div class="panel-header"><h2><span>▣</span>${data.title}</h2></div><table><thead><tr><th>Día</th><th>Producción</th><th>Masa utilizada</th><th>Desviación</th><th>vs Mes anterior</th><th></th></tr></thead><tbody><tr><td>${firstDay.date}</td><td>${firstDay.production}</td><td>${firstDay.dough}</td><td>${firstDay.deviation} <i class="${firstDay.deviationClass}"></i></td><td class="${firstDay.comparisonClass}">${firstDay.comparison}</td><td>⌄</td></tr><tr><td>${secondDay.date}</td><td>${secondDay.production}</td><td>${secondDay.dough}</td><td>${secondDay.deviation} <i class="${secondDay.deviationClass}"></i></td><td class="${secondDay.comparisonClass}">${secondDay.comparison}</td><td>⌄</td></tr><tr><td>${thirdDay.date}</td><td>${thirdDay.production}</td><td>${thirdDay.dough}</td><td>${thirdDay.deviation} <i class="${thirdDay.deviationClass}"></i></td><td class="${thirdDay.comparisonClass}">${thirdDay.comparison}</td><td>⌄</td></tr><tr><td>${fourthDay.date}</td><td>${fourthDay.production}</td><td>${fourthDay.dough}</td><td>${fourthDay.deviation} <i class="${fourthDay.deviationClass}"></i></td><td class="${fourthDay.comparisonClass}">${fourthDay.comparison}</td><td>⌄</td></tr><tr><td>${fifthDay.date}</td><td>${fifthDay.production}</td><td>${fifthDay.dough}</td><td>${fifthDay.deviation}</td><td>${fifthDay.comparison}</td><td>⌄</td></tr></tbody></table><a class="panel-footer" href="#">${data.action} <svg><use href="#i-arrow"/></svg></a></article>
  `;

  return;
}

/**
 * Renderer: Production Detail
 * Responsibility: Renders the Production Detail markup.
 * Input: The Production Detail container and a data object with production detail presentation data.
 * Output: The Production Detail HTML inside the provided container.
 */
export function renderProductionDetail(container, data) {
  if (!container || !data || !Array.isArray(data.shifts) || data.shifts.length !== 3 || data.shifts.some((shift) => !shift || typeof shift !== 'object') || !Array.isArray(data.collapsedDates) || data.collapsedDates.length !== 2) {
    return;
  }

  const [morning, afternoon, night] = data.shifts;
  const [firstCollapsedDate, secondCollapsedDate] = data.collapsedDates;

  container.innerHTML = `
    <section class="panel details"><div class="panel-header"><h2><span>▣</span>${data.title}</h2><label class="search"><input placeholder="${data.searchPlaceholder}"/><svg><use href="#i-calendar"/></svg></label></div><div class="day-detail"><h3>${data.date} <span>⌃</span></h3><div class="shift-grid"><article class="shift"><div class="shift-icon sun"><svg><use href="#i-sun"/></svg></div><p><b>${morning.name}</b> <small>${morning.hours}</small><strong>${morning.amount} <small>unidades</small></strong><span>${morning.dough}</span><em>${morning.deviation} <i class="status-dot"></i></em></p><a>${data.action} <svg><use href="#i-arrow"/></svg></a></article><article class="shift"><div class="shift-icon sun"><svg><use href="#i-sun"/></svg></div><p><b>${afternoon.name}</b> <small>${afternoon.hours}</small><strong>${afternoon.amount} <small>unidades</small></strong><span>${afternoon.dough}</span><em>${afternoon.deviation} <i class="status-dot"></i></em></p><a>${data.action} <svg><use href="#i-arrow"/></svg></a></article><article class="shift empty"><div class="shift-icon moon"><svg><use href="#i-moon"/></svg></div><p><b>${night.name}</b> <small>${night.hours}</small><span>${night.empty}</span></p></article></div></div><div class="collapsed">${firstCollapsedDate} <span>⌄</span></div><div class="collapsed">${secondCollapsedDate} <span>⌄</span></div></section>
  `;

  return;
}
