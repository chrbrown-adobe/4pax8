/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-cta. Base: columns.
 * Source: https://www.pax8.com/en-us/marketplace/cybersecurity/
 * Generated: 2026-07-15
 *
 * Structure (from library-description.txt): flexible columns block. First row = block name.
 * CTA banner content (optional heading, supporting text, one or more buttons) is collected
 * into a single content cell so the full-width banner layout is preserved.
 *
 * Instances vary: some have two buttons, some one button, some a leading heading — the parser
 * walks the widgets in DOM order and keeps heading + text + button links.
 */
export default function parse(element, { document }) {
  const contentCell = [];

  // Walk widget-level elements in source order so heading/text/buttons keep their sequence.
  const widgets = Array.from(
    element.querySelectorAll('.elementor-widget-heading, .elementor-widget-text-editor, .elementor-widget-button'),
  );

  widgets.forEach((widget) => {
    if (widget.classList.contains('elementor-widget-heading')) {
      const heading = widget.querySelector('.elementor-heading-title, h1, h2, h3, h4, h5, h6');
      if (heading && heading.textContent.trim()) contentCell.push(heading);
    } else if (widget.classList.contains('elementor-widget-text-editor')) {
      Array.from(widget.querySelectorAll(':scope > p')).forEach((p) => {
        if (p.textContent.trim()) contentCell.push(p);
      });
    } else if (widget.classList.contains('elementor-widget-button')) {
      const btn = widget.querySelector('a.elementor-button, a');
      if (btn) {
        const href = btn.getAttribute('href') || '';
        const label = (btn.querySelector('.elementor-button-text') || btn).textContent.trim();
        const anchor = document.createElement('a');
        anchor.setAttribute('href', href);
        anchor.textContent = label;
        contentCell.push(anchor);
      }
    }
  });

  // Empty-block guard.
  if (contentCell.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  // Single row, single cell holding the full banner content.
  const cells = [[contentCell]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-cta', cells });
  element.replaceWith(block);
}
