/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-anchornav. Base: columns.
 * Source: https://www.pax8.com/en-us/marketplace/cybersecurity/
 * Generated: 2026-07-15
 *
 * Structure (from library-description.txt): flexible columns block. First row = block name.
 * The nav strip is a single row of N cells, one cell per anchor jump-link.
 *
 * Icon handling: each nav link has a leading FontAwesome icon-font element
 * (<i class="far fa-angle-double-down">). These are preserved as EDS icon tokens
 * (e.g. :angle-double-down:) prepended to each link — NOT as images.
 *
 * Source: Elementor button widgets; each link is
 *   <a class="elementor-button" href="#anchor">
 *     <span class="elementor-button-icon"><i class="far fa-angle-double-down"></i></span>
 *     <span class="elementor-button-text">Label</span>
 *   </a>
 */
export default function parse(element, { document }) {
  const links = Array.from(element.querySelectorAll('a.elementor-button, .elementor-widget-button a'));

  const rowCells = [];

  links.forEach((link) => {
    const href = link.getAttribute('href') || '';
    const label = (link.querySelector('.elementor-button-text') || link).textContent.trim();

    // Derive an EDS icon token from the FontAwesome class (e.g. fa-angle-double-down -> :angle-double-down:).
    const iconEl = link.querySelector('.elementor-button-icon i, i[class*="fa-"]');
    let iconToken = '';
    if (iconEl) {
      const faClass = Array.from(iconEl.classList).find((c) => c.startsWith('fa-') && c !== 'fa-fw');
      if (faClass) {
        iconToken = `:${faClass.replace(/^fa-/, '')}:`;
      }
    }

    // Rebuild a clean anchor: icon token text prefix + label, preserving the href.
    const anchor = document.createElement('a');
    anchor.setAttribute('href', href);
    anchor.textContent = iconToken ? `${iconToken} ${label}` : label;

    if (label || href) rowCells.push(anchor);
  });

  // Empty-block guard.
  if (rowCells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  // Single row, one cell per nav link (flexible columns count = number of links).
  const cells = [rowCells];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-anchornav', cells });
  element.replaceWith(block);
}
