/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-feature. Base: columns.
 * Source: https://www.pax8.com/en-us/marketplace/cybersecurity/
 * Generated: 2026-07-15
 *
 * Structure (from library-description.txt): flexible columns block. First row = block name.
 * Feature is a single row of 2 cells (side-by-side): typically [ image | text ] or [ text | image ].
 * Column order is preserved from the source so image/text side matches the original.
 *
 * Source: two Elementor top-level 50% columns; one holds an image widget, the other holds a
 * heading + text-editor (paragraphs, inline quote) + a button widget.
 */
export default function parse(element, { document }) {
  // The two side-by-side columns are the top-level columns under the section container.
  let columns = Array.from(
    element.querySelectorAll(':scope > .elementor-container > .elementor-column'),
  );
  if (!columns.length) {
    columns = Array.from(element.querySelectorAll('.elementor-top-column'));
  }

  const rowCells = [];

  columns.forEach((col) => {
    const cellContent = [];

    // Image widget (if this column is the media side).
    const img = col.querySelector('.elementor-widget-image img, img');
    if (img) cellContent.push(img);

    // Heading.
    const heading = col.querySelector('.elementor-widget-heading .elementor-heading-title, h1, h2, h3, h4, h5, h6');
    if (heading) cellContent.push(heading);

    // Text-editor paragraphs (preserve inline emphasis / quotes).
    const textEditor = col.querySelector('.elementor-widget-text-editor');
    if (textEditor) {
      Array.from(textEditor.querySelectorAll(':scope > p')).forEach((p) => {
        if (p.textContent.trim()) cellContent.push(p);
      });
    }

    // CTA button.
    const btn = col.querySelector('.elementor-widget-button a, a.elementor-button');
    if (btn) {
      const href = btn.getAttribute('href') || '';
      const label = (btn.querySelector('.elementor-button-text') || btn).textContent.trim();
      const anchor = document.createElement('a');
      anchor.setAttribute('href', href);
      anchor.textContent = label;
      cellContent.push(anchor);
    }

    // Only include columns that actually have content (skip empty menu-anchor-only columns).
    if (cellContent.length) rowCells.push(cellContent);
  });

  // Empty-block guard.
  if (rowCells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  // Single row with one cell per content column.
  const cells = [rowCells];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-feature', cells });
  element.replaceWith(block);
}
