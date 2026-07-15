/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-cybersecurity-marketplace.js
  var import_cybersecurity_marketplace_exports = {};
  __export(import_cybersecurity_marketplace_exports, {
    default: () => import_cybersecurity_marketplace_default
  });

  // tools/importer/parsers/columns-announce.js
  function parse(element, { document }) {
    const heading = element.querySelector(".elementor-widget-heading .elementor-heading-title, h1, h2, h3, h4, h5, h6");
    const ctaLink = element.querySelector("a.elementor-button, .elementor-widget-button a");
    let cta = "";
    if (ctaLink) {
      const href = ctaLink.getAttribute("href") || "";
      const label = (ctaLink.querySelector(".elementor-button-text") || ctaLink).textContent.trim();
      const anchor = document.createElement("a");
      anchor.setAttribute("href", href);
      anchor.textContent = label;
      cta = anchor;
    }
    if (!heading && !cta) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [[heading || "", cta || ""]];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-announce", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-cyber.js
  function parse2(element, { document }) {
    const bgImage = element.querySelector(":scope > img, .elementor-background-video-container ~ img, img");
    const heading = element.querySelector(".elementor-widget-heading h1, h1, .elementor-heading-title");
    const subheading = element.querySelector(".elementor-widget-heading h2, .elementor-widget-heading h3, .elementor-widget-heading h4, .elementor-widget-heading h5, .elementor-widget-heading h6");
    let cta = null;
    const btn = element.querySelector(".elementor-widget-button a, a.elementor-button");
    if (btn) {
      const href = btn.getAttribute("href") || "";
      const label = (btn.querySelector(".elementor-button-text") || btn).textContent.trim();
      cta = document.createElement("a");
      cta.setAttribute("href", href);
      cta.textContent = label;
    }
    if (!heading && !subheading && !cta && !bgImage) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    if (bgImage) cells.push([bgImage]);
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (subheading) contentCell.push(subheading);
    if (cta) contentCell.push(cta);
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-cyber", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-anchornav.js
  function parse3(element, { document }) {
    const links = Array.from(element.querySelectorAll("a.elementor-button, .elementor-widget-button a"));
    const rowCells = [];
    links.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const label = (link.querySelector(".elementor-button-text") || link).textContent.trim();
      const iconEl = link.querySelector('.elementor-button-icon i, i[class*="fa-"]');
      let iconToken = "";
      if (iconEl) {
        const faClass = Array.from(iconEl.classList).find((c) => c.startsWith("fa-") && c !== "fa-fw");
        if (faClass) {
          iconToken = `:${faClass.replace(/^fa-/, "")}:`;
        }
      }
      const anchor = document.createElement("a");
      anchor.setAttribute("href", href);
      anchor.textContent = iconToken ? `${iconToken} ${label}` : label;
      if (label || href) rowCells.push(anchor);
    });
    if (rowCells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [rowCells];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-anchornav", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-icon.js
  function parse4(element, { document }) {
    const columns = Array.from(element.querySelectorAll(":scope > .elementor-container > .elementor-column"));
    const cardColumns = columns.length ? columns : Array.from(element.querySelectorAll(".elementor-column"));
    const cells = [];
    cardColumns.forEach((col) => {
      const img = col.querySelector(".elementor-widget-image img, img");
      const heading = col.querySelector(".elementor-widget-heading .elementor-heading-title, h1, h2, h3, h4, h5, h6");
      const paragraphs = Array.from(col.querySelectorAll(".elementor-widget-text-editor p, .elementor-widget-text-editor"));
      const ctas = Array.from(col.querySelectorAll(".elementor-button, a.elementor-button-link, .elementor-widget-button a"));
      const textCell = [];
      if (heading) textCell.push(heading);
      paragraphs.forEach((p) => {
        if (p.textContent.trim()) textCell.push(p);
      });
      ctas.forEach((cta) => textCell.push(cta));
      if (img || textCell.length) {
        cells.push([img || "", textCell.length ? textCell : ""]);
      }
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-icon", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-cta.js
  function parse5(element, { document }) {
    const contentCell = [];
    const widgets = Array.from(
      element.querySelectorAll(".elementor-widget-heading, .elementor-widget-text-editor, .elementor-widget-button")
    );
    widgets.forEach((widget) => {
      if (widget.classList.contains("elementor-widget-heading")) {
        const heading = widget.querySelector(".elementor-heading-title, h1, h2, h3, h4, h5, h6");
        if (heading && heading.textContent.trim()) contentCell.push(heading);
      } else if (widget.classList.contains("elementor-widget-text-editor")) {
        Array.from(widget.querySelectorAll(":scope > p")).forEach((p) => {
          if (p.textContent.trim()) contentCell.push(p);
        });
      } else if (widget.classList.contains("elementor-widget-button")) {
        const btn = widget.querySelector("a.elementor-button, a");
        if (btn) {
          const href = btn.getAttribute("href") || "";
          const label = (btn.querySelector(".elementor-button-text") || btn).textContent.trim();
          const anchor = document.createElement("a");
          anchor.setAttribute("href", href);
          anchor.textContent = label;
          contentCell.push(anchor);
        }
      }
    });
    if (contentCell.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [[contentCell]];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-cta", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-resource.js
  function parse6(element, { document }) {
    let cardColumns = Array.from(
      element.querySelectorAll(":scope > .elementor-container > .elementor-column")
    );
    if (!cardColumns.length) {
      cardColumns = Array.from(element.querySelectorAll(".elementor-top-column"));
    }
    const cells = [];
    cardColumns.forEach((col) => {
      const img = col.querySelector(".elementor-widget-image img, img");
      const heading = col.querySelector(".elementor-widget-heading .elementor-heading-title, h1, h2, h3, h4, h5, h6");
      const textEditor = col.querySelector(".elementor-widget-text-editor");
      const textCell = [];
      if (heading) textCell.push(heading);
      if (textEditor) {
        Array.from(textEditor.querySelectorAll(":scope > p")).forEach((p) => {
          if (p.textContent.trim()) textCell.push(p);
        });
      }
      if (img || textCell.length) {
        cells.push([img || "", textCell.length ? textCell : ""]);
      }
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-resource", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-feature.js
  function parse7(element, { document }) {
    let columns = Array.from(
      element.querySelectorAll(":scope > .elementor-container > .elementor-column")
    );
    if (!columns.length) {
      columns = Array.from(element.querySelectorAll(".elementor-top-column"));
    }
    const rowCells = [];
    columns.forEach((col) => {
      const cellContent = [];
      const img = col.querySelector(".elementor-widget-image img, img");
      if (img) cellContent.push(img);
      const heading = col.querySelector(".elementor-widget-heading .elementor-heading-title, h1, h2, h3, h4, h5, h6");
      if (heading) cellContent.push(heading);
      const textEditor = col.querySelector(".elementor-widget-text-editor");
      if (textEditor) {
        Array.from(textEditor.querySelectorAll(":scope > p")).forEach((p) => {
          if (p.textContent.trim()) cellContent.push(p);
        });
      }
      const btn = col.querySelector(".elementor-widget-button a, a.elementor-button");
      if (btn) {
        const href = btn.getAttribute("href") || "";
        const label = (btn.querySelector(".elementor-button-text") || btn).textContent.trim();
        const anchor = document.createElement("a");
        anchor.setAttribute("href", href);
        anchor.textContent = label;
        cellContent.push(anchor);
      }
      if (cellContent.length) rowCells.push(cellContent);
    });
    if (rowCells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [rowCells];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/quote-testimonial.js
  function parse8(element, { document }) {
    const contentCell = [];
    const quote = element.querySelector(
      ".elementor-widget-text-editor h1, .elementor-widget-text-editor h2, .elementor-widget-text-editor h3, .elementor-widget-text-editor h4, .elementor-widget-text-editor h5, .elementor-widget-text-editor h6, blockquote, .elementor-widget-html h1, .elementor-widget-html h2, .elementor-widget-html h3, .elementor-widget-html h4, .elementor-widget-html h5"
    );
    if (quote) contentCell.push(quote);
    const paragraphs = Array.from(
      element.querySelectorAll(".elementor-widget-text-editor p, .elementor-widget-html p")
    );
    paragraphs.forEach((p) => {
      if (p.textContent.trim() && !contentCell.includes(p)) contentCell.push(p);
    });
    const btn = element.querySelector(".elementor-widget-button a, a.elementor-button");
    if (btn) {
      const href = btn.getAttribute("href") || "";
      const label = (btn.querySelector(".elementor-button-text") || btn).textContent.trim();
      const anchor = document.createElement("a");
      anchor.setAttribute("href", href);
      anchor.textContent = label;
      contentCell.push(anchor);
    }
    if (contentCell.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [[contentCell]];
    const block = WebImporter.Blocks.createBlock(document, { name: "quote-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-vendor.js
  function parse9(element, { document }) {
    let cardColumns = Array.from(
      element.querySelectorAll(":scope > .elementor-container > .elementor-column")
    );
    if (!cardColumns.length) {
      cardColumns = Array.from(element.querySelectorAll(".elementor-top-column"));
    }
    const cells = [];
    cardColumns.forEach((col) => {
      const img = col.querySelector(".elementor-widget-image img, img");
      const heading = col.querySelector(".elementor-widget-heading .elementor-heading-title, h1, h2, h3, h4, h5, h6");
      const textEditor = col.querySelector(".elementor-widget-text-editor");
      const textCell = [];
      if (heading) textCell.push(heading);
      if (textEditor) {
        Array.from(textEditor.querySelectorAll(":scope > p")).forEach((p) => {
          if (p.textContent.trim()) textCell.push(p);
        });
      }
      if (img || textCell.length) {
        cells.push([img || "", textCell.length ? textCell : ""]);
      }
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-vendor", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse10(element, { document }) {
    const items = Array.from(element.querySelectorAll(".elementor-accordion-item"));
    const cells = [];
    items.forEach((item) => {
      const titleEl = item.querySelector(".elementor-accordion-title");
      const contentEl = item.querySelector(".elementor-tab-content");
      let titleCell = "";
      if (titleEl) {
        titleCell = titleEl.textContent.trim();
      }
      let contentCell = "";
      if (contentEl) {
        const contentNodes = Array.from(contentEl.childNodes).filter((n) => {
          if (n.nodeType === 1) return true;
          if (n.nodeType === 3) return n.textContent.trim().length > 0;
          return false;
        });
        contentCell = contentNodes.length ? contentNodes : contentEl;
      }
      if (titleCell) {
        cells.push([titleCell, contentCell]);
      }
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/form-contact.js
  function parse11(element, { document }) {
    const form = element.matches("form") ? element : element.querySelector("form");
    const scope = form || element;
    const cells = [];
    const labels = Array.from(scope.querySelectorAll("label.mktoLabel, label[for], label"));
    const seen = /* @__PURE__ */ new Set();
    labels.forEach((label) => {
      const labelText = label.textContent.replace(/\*/g, "").trim();
      if (!labelText) return;
      const forId = label.getAttribute("for") || (label.id ? label.id.replace(/^Lbl/, "") : "");
      let field = forId ? scope.querySelector(`#${CSS.escape(forId)}`) : null;
      if (!field) {
        const wrap = label.closest(".mktoFormRow, .mktoFieldWrap") || label.parentElement;
        field = wrap ? wrap.querySelector("input, select, textarea") : null;
      }
      let fieldType = "text";
      if (field) {
        const tag = field.tagName.toLowerCase();
        if (tag === "select") fieldType = "select";
        else if (tag === "textarea") fieldType = "textarea";
        else if (field.classList.contains("mktoEmailField")) fieldType = "email";
        else if (field.classList.contains("mktoTelField")) fieldType = "tel";
        else fieldType = field.getAttribute("type") || "text";
      }
      if (seen.has(labelText)) return;
      seen.add(labelText);
      cells.push([labelText, fieldType]);
    });
    const submit = scope.querySelector('button.mktoButton, button[type="submit"], .mktoButtonRow button, input[type="submit"]');
    if (submit) {
      const submitLabel = (submit.textContent || submit.getAttribute("value") || "Submit").trim();
      cells.push([submitLabel, "submit"]);
    }
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "form-contact", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/cybersecurity-marketplace-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        "#ot-sdk-btn-floating"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".elementor-element-683194c",
        ".elementor-element-857fd3f"
      ]);
      WebImporter.DOMUtils.remove(element, [".elementor-widget-spacer"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#mysticky-wrap",
        "#masthead",
        "header",
        "#colophon",
        "footer"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "iframe",
        "noscript",
        "meta",
        "link",
        "style",
        "script"
      ]);
    }
  }

  // tools/importer/transformers/cybersecurity-marketplace-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName !== TransformHook2.afterTransform) {
      return;
    }
    const template = payload && payload.template;
    const sections = template && Array.isArray(template.sections) ? template.sections : [];
    if (sections.length < 2) {
      return;
    }
    const doc = element.ownerDocument;
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      if (!section || !section.selector) {
        continue;
      }
      const target = element.querySelector(section.selector);
      if (!target) {
        continue;
      }
      if (section.style) {
        const metadataBlock = WebImporter.Blocks.createBlock(doc, {
          name: "Section Metadata",
          cells: { Style: section.style }
        });
        if (target.nextSibling) {
          target.parentNode.insertBefore(metadataBlock, target.nextSibling);
        } else {
          target.parentNode.appendChild(metadataBlock);
        }
      }
      if (i > 0) {
        const hr = doc.createElement("hr");
        target.parentNode.insertBefore(hr, target);
      }
    }
  }

  // tools/importer/import-cybersecurity-marketplace.js
  var parsers = {
    "columns-announce": parse,
    "hero-cyber": parse2,
    "columns-anchornav": parse3,
    "cards-icon": parse4,
    "columns-cta": parse5,
    "cards-resource": parse6,
    "columns-feature": parse7,
    "quote-testimonial": parse8,
    "cards-vendor": parse9,
    "accordion-faq": parse10,
    "form-contact": parse11
  };
  var PAGE_TEMPLATE = {
    name: "cybersecurity-marketplace",
    description: "Pax8 cybersecurity marketplace landing page with hero, value props, resource cards, vendor cards, enablement cards, events, FAQ accordion, and contact form. Includes header navigation and footer.",
    urls: [
      "https://www.pax8.com/en-us/marketplace/cybersecurity/"
    ],
    blocks: [
      { name: "columns-announce", instances: [".elementor-element-396cec8"] },
      { name: "hero-cyber", instances: [".elementor-element-1d242be"] },
      { name: "columns-anchornav", instances: [".elementor-element-002b496"] },
      { name: "cards-icon", instances: [".elementor-element-7d58b72", ".elementor-element-82348e6"] },
      { name: "columns-cta", instances: [".elementor-element-f9836ef", ".elementor-element-e270d30", ".elementor-element-2b68861"] },
      { name: "cards-resource", instances: [".elementor-element-c21ae72", ".elementor-element-b9aeb8c"] },
      { name: "columns-feature", instances: [".elementor-element-d12ad68", ".elementor-element-51ffb19"] },
      { name: "quote-testimonial", instances: [".elementor-element-6051e5f", ".elementor-element-abd5961 .elementor-widget-html"] },
      { name: "cards-vendor", instances: [".elementor-element-f17dbc2"] },
      { name: "accordion-faq", instances: [".elementor-element-d2f57bf .elementor-widget-accordion"] },
      { name: "form-contact", instances: [".elementor-element-abd5961 form"] }
    ],
    sections: [
      { id: "s1-announcement", name: "Announcement Bar", selector: ".elementor-element-396cec8", style: "dark", blocks: ["columns-announce"], defaultContent: [] },
      { id: "s2-hero", name: "Hero", selector: ".elementor-element-1d242be", style: null, blocks: ["hero-cyber"], defaultContent: [] },
      { id: "s3-anchornav", name: "Anchor Navigation", selector: ".elementor-element-002b496", style: "light", blocks: ["columns-anchornav"], defaultContent: [] },
      { id: "s6-mission", name: "Mission Intro", selector: ".elementor-element-d0baef0", style: "light", blocks: [], defaultContent: [".elementor-element-d0baef0 .elementor-widget-heading"] },
      { id: "s7-valueprops", name: "Value Props", selector: ".elementor-element-7d58b72", style: "dark", blocks: ["cards-icon"], defaultContent: [] },
      { id: "s8-cta-community", name: "Community CTA", selector: ".elementor-element-f9836ef", style: "accent", blocks: ["columns-cta"], defaultContent: [] },
      { id: "s9-cyberinsurance-intro", name: "Cyber Insurance Intro", selector: ".elementor-element-68afc05", style: "light", blocks: [], defaultContent: [".elementor-element-68afc05 .elementor-widget-heading"] },
      { id: "s10-resource-cards", name: "Resource Cards", selector: ".elementor-element-c21ae72", style: "light", blocks: ["cards-resource"], defaultContent: [] },
      { id: "s11-whitelabel-heading", name: "White-Label Heading", selector: ".elementor-element-bd179fb", style: "light", blocks: [], defaultContent: [".elementor-element-bd179fb .elementor-widget-heading"] },
      { id: "s12-chateau-cards", name: "Chateau Cards", selector: ".elementor-element-b9aeb8c", style: "light", blocks: ["cards-resource"], defaultContent: [] },
      { id: "s13-security-coach", name: "Security Coach Feature", selector: ".elementor-element-d12ad68", style: "dark", blocks: ["columns-feature"], defaultContent: [] },
      { id: "s14-testimonial", name: "Testimonial", selector: ".elementor-element-6051e5f", style: "dark", blocks: ["quote-testimonial"], defaultContent: [] },
      { id: "s15-vendors-heading", name: "Vendors Heading", selector: ".elementor-element-36e67dd", style: "dark", blocks: [], defaultContent: [".elementor-element-36e67dd .elementor-widget-heading"] },
      { id: "s16-vendor-cards", name: "Vendor Cards", selector: ".elementor-element-f17dbc2", style: "dark", blocks: ["cards-vendor"], defaultContent: [] },
      { id: "s17-cta-vendor", name: "Vendor CTA", selector: ".elementor-element-e270d30", style: "accent", blocks: ["columns-cta"], defaultContent: [] },
      { id: "s18-enablement-heading", name: "Enablement Heading", selector: ".elementor-element-1886815", style: "light", blocks: [], defaultContent: [".elementor-element-1886815 .elementor-widget-heading"] },
      { id: "s19-enablement-cards", name: "Enablement Cards", selector: ".elementor-element-82348e6", style: "light", blocks: ["cards-icon"], defaultContent: [] },
      { id: "s20-events", name: "Security Events", selector: ".elementor-element-51ffb19", style: "dark", blocks: ["columns-feature"], defaultContent: [] },
      { id: "s21-microsoft-cta", name: "Microsoft CTA", selector: ".elementor-element-2b68861", style: "accent", blocks: ["columns-cta"], defaultContent: [] },
      { id: "s22-faq", name: "FAQ", selector: ".elementor-element-d2f57bf", style: "light", blocks: ["accordion-faq"], defaultContent: [".elementor-element-d2f57bf .elementor-widget-heading"] },
      { id: "s23-contact-heading", name: "Contact Heading", selector: ".elementor-element-daad9c6", style: "dark", blocks: [], defaultContent: [".elementor-element-daad9c6 .elementor-widget-heading"] },
      { id: "s24-contact-form", name: "Contact Form", selector: ".elementor-element-abd5961", style: "dark", blocks: ["quote-testimonial", "form-contact"], defaultContent: [] }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_cybersecurity_marketplace_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      WebImporter.rules.convertIcons(main, document);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_cybersecurity_marketplace_exports);
})();
