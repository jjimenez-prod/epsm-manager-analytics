'use strict';

import { renderOperators } from './operators.renderer.js';

export function initializeOperators() {
  return renderOperators(document.querySelector('.operators'));
}
