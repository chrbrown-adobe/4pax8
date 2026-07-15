/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-announce. Base: columns.
 * Source: https://www.pax8.com/en-us/marketplace/cybersecurity/
 * Generated: 2026-07-15
 *
 * Structure (from library-description.txt): flexible columns block. First row = block name.
 * Announcement bar is a single row with 2 cells: [ promo text | CTA link ].
 *
 * Source: Elementor inner section with two 50% columns — a heading widget and a button widget.
 */
export default function parse(element, { document }) {
  // Promo text (heading) and the CTA link.
  const heading = element.querySelector('.elementor-widget-heading .elementor-heading-title, h1, h2, h3, h4, h5, h6');
  const ctaLink = element.querySelector('a.elementor-button, .elementor-widget-button a');

  // Rebuild a clean anchor from the button text so we drop the span chrome.
  let cta = '';
  if (ctaLink) {
    const href = ctaLink.getAttribute('href') || '';
    const label = (ctaLink.querySelector('.elementor-button-text') || ctaLink).textContent.trim();
    const anchor = document.createElement('a');
    anchor.setAttribute('href', href);
    anchor.textContent = label;
    cta = anchor;
  }

  // Empty-block guard.
  if (!heading && !cta) {
    element.replaceWith(...element.childNodes);
    return;
  }

  // Single 2-cell row: text | link.
  const cells = [[heading || '', cta || '']];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-announce', cells });
  element.replaceWith(block);
}
