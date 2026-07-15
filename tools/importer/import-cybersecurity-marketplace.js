/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import columnsAnnounceParser from './parsers/columns-announce.js';
import heroCyberParser from './parsers/hero-cyber.js';
import columnsAnchornavParser from './parsers/columns-anchornav.js';
import cardsIconParser from './parsers/cards-icon.js';
import columnsCtaParser from './parsers/columns-cta.js';
import cardsResourceParser from './parsers/cards-resource.js';
import columnsFeatureParser from './parsers/columns-feature.js';
import quoteTestimonialParser from './parsers/quote-testimonial.js';
import cardsVendorParser from './parsers/cards-vendor.js';
import accordionFaqParser from './parsers/accordion-faq.js';
import formContactParser from './parsers/form-contact.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/cybersecurity-marketplace-cleanup.js';
import sectionsTransformer from './transformers/cybersecurity-marketplace-sections.js';

// PARSER REGISTRY
const parsers = {
  'columns-announce': columnsAnnounceParser,
  'hero-cyber': heroCyberParser,
  'columns-anchornav': columnsAnchornavParser,
  'cards-icon': cardsIconParser,
  'columns-cta': columnsCtaParser,
  'cards-resource': cardsResourceParser,
  'columns-feature': columnsFeatureParser,
  'quote-testimonial': quoteTestimonialParser,
  'cards-vendor': cardsVendorParser,
  'accordion-faq': accordionFaqParser,
  'form-contact': formContactParser,
};

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'cybersecurity-marketplace',
  description: 'Pax8 cybersecurity marketplace landing page with hero, value props, resource cards, vendor cards, enablement cards, events, FAQ accordion, and contact form. Includes header navigation and footer.',
  urls: [
    'https://www.pax8.com/en-us/marketplace/cybersecurity/',
  ],
  blocks: [
    { name: 'columns-announce', instances: ['.elementor-element-396cec8'] },
    { name: 'hero-cyber', instances: ['.elementor-element-1d242be'] },
    { name: 'columns-anchornav', instances: ['.elementor-element-002b496'] },
    { name: 'cards-icon', instances: ['.elementor-element-7d58b72', '.elementor-element-82348e6'] },
    { name: 'columns-cta', instances: ['.elementor-element-f9836ef', '.elementor-element-e270d30', '.elementor-element-2b68861'] },
    { name: 'cards-resource', instances: ['.elementor-element-c21ae72', '.elementor-element-b9aeb8c'] },
    { name: 'columns-feature', instances: ['.elementor-element-d12ad68', '.elementor-element-51ffb19'] },
    { name: 'quote-testimonial', instances: ['.elementor-element-6051e5f', '.elementor-element-abd5961 .elementor-widget-html'] },
    { name: 'cards-vendor', instances: ['.elementor-element-f17dbc2'] },
    { name: 'accordion-faq', instances: ['.elementor-element-d2f57bf .elementor-widget-accordion'] },
    { name: 'form-contact', instances: ['.elementor-element-abd5961 form'] },
  ],
  sections: [
    { id: 's1-announcement', name: 'Announcement Bar', selector: '.elementor-element-396cec8', style: 'dark', blocks: ['columns-announce'], defaultContent: [] },
    { id: 's2-hero', name: 'Hero', selector: '.elementor-element-1d242be', style: null, blocks: ['hero-cyber'], defaultContent: [] },
    { id: 's3-anchornav', name: 'Anchor Navigation', selector: '.elementor-element-002b496', style: 'light', blocks: ['columns-anchornav'], defaultContent: [] },
    { id: 's6-mission', name: 'Mission Intro', selector: '.elementor-element-d0baef0', style: 'light', blocks: [], defaultContent: ['.elementor-element-d0baef0 .elementor-widget-heading'] },
    { id: 's7-valueprops', name: 'Value Props', selector: '.elementor-element-7d58b72', style: 'dark', blocks: ['cards-icon'], defaultContent: [] },
    { id: 's8-cta-community', name: 'Community CTA', selector: '.elementor-element-f9836ef', style: 'accent', blocks: ['columns-cta'], defaultContent: [] },
    { id: 's9-cyberinsurance-intro', name: 'Cyber Insurance Intro', selector: '.elementor-element-68afc05', style: 'light', blocks: [], defaultContent: ['.elementor-element-68afc05 .elementor-widget-heading'] },
    { id: 's10-resource-cards', name: 'Resource Cards', selector: '.elementor-element-c21ae72', style: 'light', blocks: ['cards-resource'], defaultContent: [] },
    { id: 's11-whitelabel-heading', name: 'White-Label Heading', selector: '.elementor-element-bd179fb', style: 'light', blocks: [], defaultContent: ['.elementor-element-bd179fb .elementor-widget-heading'] },
    { id: 's12-chateau-cards', name: 'Chateau Cards', selector: '.elementor-element-b9aeb8c', style: 'light', blocks: ['cards-resource'], defaultContent: [] },
    { id: 's13-security-coach', name: 'Security Coach Feature', selector: '.elementor-element-d12ad68', style: 'dark', blocks: ['columns-feature'], defaultContent: [] },
    { id: 's14-testimonial', name: 'Testimonial', selector: '.elementor-element-6051e5f', style: 'dark', blocks: ['quote-testimonial'], defaultContent: [] },
    { id: 's15-vendors-heading', name: 'Vendors Heading', selector: '.elementor-element-36e67dd', style: 'dark', blocks: [], defaultContent: ['.elementor-element-36e67dd .elementor-widget-heading'] },
    { id: 's16-vendor-cards', name: 'Vendor Cards', selector: '.elementor-element-f17dbc2', style: 'dark', blocks: ['cards-vendor'], defaultContent: [] },
    { id: 's17-cta-vendor', name: 'Vendor CTA', selector: '.elementor-element-e270d30', style: 'accent', blocks: ['columns-cta'], defaultContent: [] },
    { id: 's18-enablement-heading', name: 'Enablement Heading', selector: '.elementor-element-1886815', style: 'light', blocks: [], defaultContent: ['.elementor-element-1886815 .elementor-widget-heading'] },
    { id: 's19-enablement-cards', name: 'Enablement Cards', selector: '.elementor-element-82348e6', style: 'light', blocks: ['cards-icon'], defaultContent: [] },
    { id: 's20-events', name: 'Security Events', selector: '.elementor-element-51ffb19', style: 'dark', blocks: ['columns-feature'], defaultContent: [] },
    { id: 's21-microsoft-cta', name: 'Microsoft CTA', selector: '.elementor-element-2b68861', style: 'accent', blocks: ['columns-cta'], defaultContent: [] },
    { id: 's22-faq', name: 'FAQ', selector: '.elementor-element-d2f57bf', style: 'light', blocks: ['accordion-faq'], defaultContent: ['.elementor-element-d2f57bf .elementor-widget-heading'] },
    { id: 's23-contact-heading', name: 'Contact Heading', selector: '.elementor-element-daad9c6', style: 'dark', blocks: [], defaultContent: ['.elementor-element-daad9c6 .elementor-widget-heading'] },
    { id: 's24-contact-form', name: 'Contact Form', selector: '.elementor-element-abd5961', style: 'dark', blocks: ['quote-testimonial', 'form-contact'], defaultContent: [] },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });
  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. beforeTransform (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return; // Already replaced by earlier parser
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. afterTransform (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
    WebImporter.rules.convertIcons(main, document);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
