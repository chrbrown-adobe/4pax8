/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-faq. Base: accordion.
 * Source: https://www.pax8.com/en-us/marketplace/cybersecurity/
 * Generated: 2026-07-15
 *
 * Structure (from library-description.txt): 2-column table. First row = block name.
 * Each subsequent row is one accordion item: [ title cell | content cell ].
 * Source markup is Elementor accordion: .elementor-accordion-item with
 * a .elementor-accordion-title (clickable label) and .elementor-tab-content (body).
 */
export default function parse(element, { document }) {
  const items = Array.from(element.querySelectorAll('.elementor-accordion-item'));

  const cells = [];

  items.forEach((item) => {
    // Title: the clickable label. Strip the leading +/- icon spans (design chrome).
    const titleEl = item.querySelector('.elementor-accordion-title');
    const contentEl = item.querySelector('.elementor-tab-content');

    // Title cell: prefer the plain text label so the +/- FontAwesome icons are dropped.
    let titleCell = '';
    if (titleEl) {
      titleCell = titleEl.textContent.trim();
    }

    // Content cell: keep the full body (paragraphs, lists, inline links) as elements.
    let contentCell = '';
    if (contentEl) {
      const contentNodes = Array.from(contentEl.childNodes).filter((n) => {
        // keep element nodes and non-empty text nodes
        if (n.nodeType === 1) return true;
        if (n.nodeType === 3) return n.textContent.trim().length > 0;
        return false;
      });
      contentCell = contentNodes.length ? contentNodes : contentEl;
    }

    // Only add the row if we have a title (mandatory).
    if (titleCell) {
      cells.push([titleCell, contentCell]);
    }
  });

  // Empty-block guard: no accordion items found.
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
