/* eslint-disable */
/* global WebImporter */
/**
 * Parser for quote-testimonial. Base: quote (custom — not in the block library).
 * Source: https://www.pax8.com/en-us/marketplace/cybersecurity/
 * Generated: 2026-07-15
 *
 * Inferred structure: single-column testimonial. First row = block name.
 * Content cell holds: quote text (heading) + attribution (name/title/company) + optional CTA.
 *
 * Decorative quotation-mark PNG and the right-side decorative image are design chrome
 * (not testimonial content) and are intentionally dropped.
 *
 * Instances vary: one is an Elementor column layout (text-editor widgets + button); the other
 * is a plain HTML widget (.elementor-widget-html) — the parser handles both by falling back to
 * blockquote/heading/paragraph extraction.
 */
export default function parse(element, { document }) {
  const contentCell = [];

  // Quote text: prefer a heading inside a text-editor widget, then blockquote, then any heading.
  const quote = element.querySelector(
    '.elementor-widget-text-editor h1, .elementor-widget-text-editor h2, .elementor-widget-text-editor h3, .elementor-widget-text-editor h4, .elementor-widget-text-editor h5, .elementor-widget-text-editor h6, blockquote, .elementor-widget-html h1, .elementor-widget-html h2, .elementor-widget-html h3, .elementor-widget-html h4, .elementor-widget-html h5',
  );
  if (quote) contentCell.push(quote);

  // Attribution: paragraph(s) inside text-editor / html widgets that are not the quote.
  const paragraphs = Array.from(
    element.querySelectorAll('.elementor-widget-text-editor p, .elementor-widget-html p'),
  );
  paragraphs.forEach((p) => {
    if (p.textContent.trim() && !contentCell.includes(p)) contentCell.push(p);
  });

  // Optional CTA link — rebuild a clean anchor.
  const btn = element.querySelector('.elementor-widget-button a, a.elementor-button');
  if (btn) {
    const href = btn.getAttribute('href') || '';
    const label = (btn.querySelector('.elementor-button-text') || btn).textContent.trim();
    const anchor = document.createElement('a');
    anchor.setAttribute('href', href);
    anchor.textContent = label;
    contentCell.push(anchor);
  }

  // Empty-block guard.
  if (contentCell.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  // Single-column: one row, one cell holding all testimonial content.
  const cells = [[contentCell]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'quote-testimonial', cells });
  element.replaceWith(block);
}
