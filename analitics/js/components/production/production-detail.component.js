'use strict';

import { renderProductionDetail } from './production.renderer.js';

export function initializeProductionDetail() {
  return renderProductionDetail(document.querySelector('.details'));
}
