/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-cyber. Base: hero.
 * Source: https://www.pax8.com/en-us/marketplace/cybersecurity/
 * Generated: 2026-07-15
 *
 * Structure (from library-description.txt): 1-column, 3-row hero.
 *   Row 1: block name.
 *   Row 2 (one cell): background image (optional).
 *   Row 3 (one cell): title (h1) + subheading + CTA link.
 *
 * Source: full-bleed section with a background <img> (and a background video), plus a column
 * holding a heading (h1), a subheading (h5), and a button widget.
 */
export default function parse(element, { document }) {
  // Background image: the section's direct background <img> (not inside the text column).
  const bgImage = element.querySelector(':scope > img, .elementor-background-video-container ~ img, img');

  // Foreground text content.
  const heading = element.querySelector('.elementor-widget-heading h1, h1, .elementor-heading-title');
  const subheading = element.querySelector('.elementor-widget-heading h2, .elementor-widget-heading h3, .elementor-widget-heading h4, .elementor-widget-heading h5, .elementor-widget-heading h6');

  // CTA button — rebuild a clean anchor.
  let cta = null;
  const btn = element.querySelector('.elementor-widget-button a, a.elementor-button');
  if (btn) {
    const href = btn.getAttribute('href') || '';
    const label = (btn.querySelector('.elementor-button-text') || btn).textContent.trim();
    cta = document.createElement('a');
    cta.setAttribute('href', href);
    cta.textContent = label;
  }

  // Empty-block guard.
  if (!heading && !subheading && !cta && !bgImage) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Row 2: background image (only if present).
  if (bgImage) cells.push([bgImage]);

  // Row 3: single cell holding all foreground content.
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);
  cells.push([contentCell]); // 1-column: one row, one cell with all elements

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-cyber', cells });
  element.replaceWith(block);
}
