'use strict';

import { renderInsights } from './insights.renderer.js';

export function initializeInsights() {
  return renderInsights(document.querySelector('.insights'));
}
