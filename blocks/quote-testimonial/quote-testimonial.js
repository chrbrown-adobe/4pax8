export default async function decorate(block) {
  // The block has a single row with one cell containing the quote content:
  //   h5  -> the quotation
  //   p   -> the attribution (name / title / company)
  //   p>a -> optional "read the case study" link
  const cell = block.querySelector(':scope > div > div');
  if (!cell) return;

  cell.classList.add('quote-testimonial-content');

  const quote = cell.querySelector('h1, h2, h3, h4, h5, h6');
  if (quote) quote.classList.add('quote-testimonial-quotation');

  // First paragraph that is NOT just a link/button becomes the attribution.
  const paragraphs = [...cell.querySelectorAll(':scope > p')];
  const attribution = paragraphs.find((p) => {
    const onlyLink = p.children.length === 1 && p.firstElementChild?.tagName === 'A';
    return !onlyLink && p.textContent.trim().length > 0;
  });
  if (attribution) attribution.classList.add('quote-testimonial-attribution');
}
