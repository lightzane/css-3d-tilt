const pre = document.querySelector('pre');

document.addEventListener('mousemove', (e) => {
  rotateElement(e, pre);
});

function rotateElement(
  event: MouseEvent,
  element: HTMLPreElement | null,
): void {
  if (!element) {
    return;
  }

  // Get mouse position
  const x = event.clientX;
  const y = event.clientY;

  // Find middle of page
  const middleX = window.innerWidth / 2;
  const middleY = window.innerHeight / 2;

  // Get offset from middle (how far is the mouse from middle)
  let offsetX = x - middleX;
  let offsetY = y - middleY;

  // Convert offset to decimal / percentage
  offsetX /= middleX;
  offsetY /= middleY;

  // Note: 100% percent is equal to max degrees which is 45deg
  offsetX *= 45;
  offsetY *= 45;

  // Update custom properties
  element.style.setProperty('--rotateX', `${offsetY * -1}deg`); // 3d-rotation on X-axis varies on offsetY
  element.style.setProperty('--rotateY', `${offsetX}deg`); // 3d-rotation on Y-axis varies on offsetX

  // * The "-1" on Line 36 will inverse the direction so that the element is facing wherever the mouse is (e.g, faces UP when mouse is on top)
  // * Since the top area is negative Y, and bottom area is positive Y
  // * Zero is the middle
}
