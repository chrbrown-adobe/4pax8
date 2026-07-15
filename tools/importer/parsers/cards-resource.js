/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-resource. Base: cards.
 * Source: https://www.pax8.com/en-us/marketplace/cybersecurity/
 * Generated: 2026-07-15
 *
 * Structure (from library-description.txt): 2-column table. First row = block name.
 * Each subsequent row is one card: [ image cell | text content cell ].
 * Text cell holds heading + description + CTA link.
 *
 * Icon handling: cards use PNG <img> images in the image cell — keep them as images.
 *
 * Source: Elementor top-level columns. Each card column has an image widget followed by
 * an inner .elementor-section holding a heading widget and a text-editor (description + CTA).
 * Only TOP-LEVEL columns are cards; inner-section columns are layout wrappers, not cards.
 */
export default function parse(element, { document }) {
  // Cards are the top-level columns directly under the section container.
  let cardColumns = Array.from(
    element.querySelectorAll(':scope > .elementor-container > .elementor-column'),
  );
  // Fallback: top columns anywhere but exclude inner-section columns.
  if (!cardColumns.length) {
    cardColumns = Array.from(element.querySelectorAll('.elementor-top-column'));
  }

  const cells = [];

  cardColumns.forEach((col) => {
    // Image cell: the card's primary image (from the top-level image widget).
    const img = col.querySelector('.elementor-widget-image img, img');

    // Text content lives in heading + text-editor widgets (may be inside an inner section).
    const heading = col.querySelector('.elementor-widget-heading .elementor-heading-title, h1, h2, h3, h4, h5, h6');
    const textEditor = col.querySelector('.elementor-widget-text-editor');

    const textCell = [];
    if (heading) textCell.push(heading);
    if (textEditor) {
      Array.from(textEditor.querySelectorAll(':scope > p')).forEach((p) => {
        if (p.textContent.trim()) textCell.push(p);
      });
    }

    if (img || textCell.length) {
      cells.push([img || '', textCell.length ? textCell : '']);
    }
  });

  // Empty-block guard.
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-resource', cells });
  element.replaceWith(block);
}
