export default function decorate(block) {
  // Background is provided via CSS (circuit-board image + optional video).
  // If the author supplies an image in the first cell, promote it to the
  // block background and remove it from the content flow.
  const firstCellPicture = block.querySelector(':scope > div:first-child picture');
  if (firstCellPicture) {
    const img = firstCellPicture.querySelector('img');
    if (img) {
      block.style.backgroundImage = `url("${img.src}")`;
    }
    firstCellPicture.closest('div')?.remove();
  }
}
