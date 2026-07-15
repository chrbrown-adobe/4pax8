/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-icon. Base: cards.
 * Source: https://www.pax8.com/en-us/marketplace/cybersecurity/
 * Generated: 2026-07-15
 *
 * Structure (from library-description.txt): 2-column table. First row = block name.
 * Each subsequent row is one card: [ image/icon cell | text content cell ].
 * Text cell holds heading + description + optional CTA link.
 *
 * Icon handling: cards use PNG <img> icons in the image cell — keep them as images
 * (do NOT convert to icon tokens).
 *
 * Source: Elementor columns (.elementor-column). Each column contains an image widget,
 * a heading widget, a text-editor widget, and (for enablement cards) a button/link.
 */
export default function parse(element, { document }) {
  // Each card is an Elementor column within the section container.
  const columns = Array.from(element.querySelectorAll(':scope > .elementor-container > .elementor-column'));
  // Fallback for varied nesting across instances.
  const cardColumns = columns.length
    ? columns
    : Array.from(element.querySelectorAll('.elementor-column'));

  const cells = [];

  cardColumns.forEach((col) => {
    // Image/icon cell: keep the PNG image as an <img>.
    const img = col.querySelector('.elementor-widget-image img, img');

    // Text content: heading, description paragraph(s), optional CTA link.
    const heading = col.querySelector('.elementor-widget-heading .elementor-heading-title, h1, h2, h3, h4, h5, h6');
    const paragraphs = Array.from(col.querySelectorAll('.elementor-widget-text-editor p, .elementor-widget-text-editor'));
    const ctas = Array.from(col.querySelectorAll('.elementor-button, a.elementor-button-link, .elementor-widget-button a'));

    const textCell = [];
    if (heading) textCell.push(heading);
    paragraphs.forEach((p) => {
      if (p.textContent.trim()) textCell.push(p);
    });
    ctas.forEach((cta) => textCell.push(cta));

    // Only add a card row if it has an image or some text content.
    if (img || textCell.length) {
      cells.push([img || '', textCell.length ? textCell : '']);
    }
  });

  // Empty-block guard.
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-icon', cells });
  element.replaceWith(block);
}
