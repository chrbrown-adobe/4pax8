/* eslint-disable */
/* global WebImporter */
/**
 * Parser for form-contact. Base: form (custom — not in the block library).
 * Source: https://www.pax8.com/en-us/marketplace/cybersecurity/
 * Generated: 2026-07-15
 *
 * The source is a JS-injected Marketo form (#mktoForm_1001) whose runtime markup includes
 * hundreds of <option> entries and hidden descriptor fields that are not meaningful content.
 * We reduce it to a simple form block: first row = block name, then one row per visible field
 * as [ Field label | field type ], followed by a submit row.
 *
 * Field types are derived from the input/select/textarea element (email/tel/text/select/...).
 */
export default function parse(element, { document }) {
  // `element` is the <form>. Fall back to a nested form if needed.
  const form = element.matches('form') ? element : element.querySelector('form');
  const scope = form || element;

  const cells = [];

  // Each labelled field: read the label text (stripping the required asterisk) and the field type.
  const labels = Array.from(scope.querySelectorAll('label.mktoLabel, label[for], label'));
  const seen = new Set();

  labels.forEach((label) => {
    // Label text without the "*" required marker or surrounding whitespace.
    const labelText = label.textContent.replace(/\*/g, '').trim();
    if (!labelText) return;

    // Resolve the associated field.
    const forId = label.getAttribute('for') || (label.id ? label.id.replace(/^Lbl/, '') : '');
    let field = forId ? scope.querySelector(`#${CSS.escape(forId)}`) : null;
    if (!field) {
      // Fallback: the field near this label's wrapper.
      const wrap = label.closest('.mktoFormRow, .mktoFieldWrap') || label.parentElement;
      field = wrap ? wrap.querySelector('input, select, textarea') : null;
    }

    let fieldType = 'text';
    if (field) {
      const tag = field.tagName.toLowerCase();
      if (tag === 'select') fieldType = 'select';
      else if (tag === 'textarea') fieldType = 'textarea';
      else if (field.classList.contains('mktoEmailField')) fieldType = 'email';
      else if (field.classList.contains('mktoTelField')) fieldType = 'tel';
      else fieldType = field.getAttribute('type') || 'text';
    }

    // De-dupe on label text (Marketo can render duplicate hidden labels).
    if (seen.has(labelText)) return;
    seen.add(labelText);

    cells.push([labelText, fieldType]);
  });

  // Submit button row.
  const submit = scope.querySelector('button.mktoButton, button[type="submit"], .mktoButtonRow button, input[type="submit"]');
  if (submit) {
    const submitLabel = (submit.textContent || submit.getAttribute('value') || 'Submit').trim();
    cells.push([submitLabel, 'submit']);
  }

  // Empty-block guard: no recognizable fields.
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'form-contact', cells });
  element.replaceWith(block);
}
