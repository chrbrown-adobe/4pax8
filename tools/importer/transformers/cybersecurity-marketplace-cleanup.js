/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Pax8 cybersecurity-marketplace site-wide cleanup.
 *
 * WordPress/Elementor page. Main authorable content lives in
 * `#post-24446 > div.entry-content.clear`. Everything below is global
 * chrome / non-authorable content and is removed so the import contains
 * only page-level authorable content.
 *
 * All selectors verified against migration-work/cleaned.html:
 *  - #mysticky-wrap  -> sticky wrapper containing header #masthead (line 8/10)
 *  - #colophon       -> site footer (line 2552)
 *  - #onetrust-consent-sdk -> cookie consent SDK (line 2964)
 *  - #ot-sdk-btn-floating  -> OneTrust floating persistent button (line 3225)
 *  - .elementor-element-683194c / .elementor-element-857fd3f
 *        -> elementor-hidden-desktop mobile duplicates of hero/anchor-nav
 *           (desktop originals .elementor-element-1d242be / -002b496 are kept)
 *  - .elementor-widget-spacer -> Elementor spacer widgets (multiple, e.g. lines 318/327/635)
 *  - tracking img/iframe/noscript/meta/link at end of body (lines 3222-3263)
 */

const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Cookie consent + overlays that would otherwise interfere with parsing.
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '#ot-sdk-btn-floating',
    ]);

    // Responsive mobile duplicates (elementor-hidden-desktop) of the hero and
    // anchor-nav sections. The desktop originals (.elementor-element-1d242be,
    // .elementor-element-002b496) are the ones mapped in page-templates.json,
    // so remove the mobile clones before parsing to avoid duplicated content.
    WebImporter.DOMUtils.remove(element, [
      '.elementor-element-683194c',
      '.elementor-element-857fd3f',
    ]);

    // Elementor layout spacers carry no authorable content.
    WebImporter.DOMUtils.remove(element, ['.elementor-widget-spacer']);
  }

  if (hookName === TransformHook.afterTransform) {
    // Non-authorable global chrome: sticky header wrapper (contains #masthead)
    // and the site footer. EDS auto-populates header/footer, so exclude them.
    WebImporter.DOMUtils.remove(element, [
      '#mysticky-wrap',
      '#masthead',
      'header',
      '#colophon',
      'footer',
    ]);

    // Leftover non-authorable / tracking elements.
    WebImporter.DOMUtils.remove(element, [
      'iframe',
      'noscript',
      'meta',
      'link',
      'style',
      'script',
    ]);
  }
}
