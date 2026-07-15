import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // label the sections so CSS can target them
  const sections = footer.children;
  if (sections[0]) sections[0].classList.add('footer-cta-row');
  if (sections[1]) sections[1].classList.add('footer-main');
  if (sections[2]) sections[2].classList.add('footer-bottom');

  block.append(footer);
}
