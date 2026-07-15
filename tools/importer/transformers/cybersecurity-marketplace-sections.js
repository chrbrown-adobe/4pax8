/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Pax8 cybersecurity-marketplace section breaks + section metadata.
 *
 * Runs in afterTransform only. Reads payload.template.sections and, for each
 * section (processed in reverse so inserted nodes don't shift earlier lookups):
 *   - inserts a Section Metadata block (Style = section.style) after the
 *     section's first element when section.style is set;
 *   - inserts an <hr> before the section's first element for every section
 *     except the first, so EDS renders discrete sections.
 *
 * Section selectors come from tools/importer/page-templates.json, which were
 * derived from the captured DOM (migration-work/cleaned.html). The template
 * defines 22 sections: 21 need an <hr> (all but the first) and 21 carry a
 * non-null style (only the hero section has style: null).
 */

const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName !== TransformHook.afterTransform) {
    return;
  }

  const template = payload && payload.template;
  const sections = template && Array.isArray(template.sections) ? template.sections : [];
  if (sections.length < 2) {
    return;
  }

  const doc = element.ownerDocument;

  // Process in reverse so DOM insertions never invalidate earlier section lookups.
  for (let i = sections.length - 1; i >= 0; i -= 1) {
    const section = sections[i];
    if (!section || !section.selector) {
      continue;
    }

    const target = element.querySelector(section.selector);
    if (!target) {
      // Section element not present on this page; skip gracefully.
      continue;
    }

    // Section Metadata block after the section for sections that declare a style.
    if (section.style) {
      const metadataBlock = WebImporter.Blocks.createBlock(doc, {
        name: 'Section Metadata',
        cells: { Style: section.style },
      });
      if (target.nextSibling) {
        target.parentNode.insertBefore(metadataBlock, target.nextSibling);
      } else {
        target.parentNode.appendChild(metadataBlock);
      }
    }

    // Section break before every section except the first.
    if (i > 0) {
      const hr = doc.createElement('hr');
      target.parentNode.insertBefore(hr, target);
    }
  }
}
