# CSS 3D Tilt

Trying out how to do a 3D CSS with JavaScript and/or CSS-Only version.

Reference:
https://www.youtube.com/watch?v=Z-3tPXf9a7M

[See Demo](https://lightzane.github.io/css-3d-tilt)

## With JavaScript

### HTML

[See File](./src/index.html)

<!-- prettier-ignore -->
```html
    <pre class="language-css"><code class="language-css"><span class="token selector">.awesome-layouts</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>

    <div style="margin-top: 3rem; display: grid; place-items: center">
      <a href="./css-only">CSS Only &rightarrow;</a>
    </div>
```

### CSS

`style.css`

Note: This contains the minimum necessary snippets for the 3D to work.

[See full CSS styles here](./src/style.css)

```css
pre {
  position: relative;

  /* * 3D Getting Started * */
  transform-style: preserve-3d; /* enables "z-axis" for 3D space -- translateZ() */

  /* prettier-ignore */
  transform: 
    perspective(5000px)
    rotateY(var(--rotateY)) 
    rotateX(var(--rotateX));
}

pre::before,
pre::after {
  content: '';
  position: absolute;
  border-radius: inherit;
}

/* shadow */
pre::before {
  inset: 0.75rem;
  background: black;
  transform: translateZ(-49px);
  filter: blur(15px);
  opacity: 0.5;
}

/* gradient background */
pre::after {
  inset: -1rem;
  background: linear-gradient(-45deg, red, blue);
  transform: translateZ(-50px);
}
```

**Typescript** (or JavaScript)

[See file](./src/main.ts)

```ts
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
```

## CSS Only

### HTML

[See file](./src/css-only.html)

<!-- prettier-ignore -->
```html
<div class="pre-container">
      <!-- mouse trackers -->
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <!-- prettier-ignore -->
      <pre class="language-css"><code class="language-css"><span class="token selector">.awesome-layouts</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>
    </div>
```

### CSS

**Must have prior knowledge on CSS Grid**

See: https://lightzane.github.io/learn-css-grid/
<br />
And scroll down to "Mouse Track example"

[`style.css`](./src/style.css) + [`css-only.css`](./src/css-only.css)

```css
/* css-only.css */

.pre-container {
  position: relative;
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
}

pre {
  grid-column: 1 / -1;
  grid-row: 1 / -1;

  transition: transform 250ms ease;
  --angle: 25deg;
}

/* mouse tracker elements */
.pre-container > div {
  z-index: 10;
  position: absolute;
  inset: 0;
}

/* start: position grids */
.pre-container > div:nth-child(1) {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

.pre-container > div:nth-child(2) {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}

.pre-container > div:nth-child(3) {
  grid-column: 3 / 4;
  grid-row: 1 / 2;
}

.pre-container > div:nth-child(4) {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}

.pre-container > div:nth-child(5) {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}

.pre-container > div:nth-child(6) {
  grid-column: 3 / 4;
  grid-row: 2 / 3;
}

.pre-container > div:nth-child(7) {
  grid-column: 1 / 2;
  grid-row: 3 / 4;
}

.pre-container > div:nth-child(8) {
  grid-column: 2 / 3;
  grid-row: 3 / 4;
}

.pre-container > div:nth-child(9) {
  grid-column: 3 / 4;
  grid-row: 3 / 4;
}
/* end: position grids */

/* start: hover grids */
.pre-container > div:nth-child(1):hover ~ pre {
  --rotateX: var(--angle);
  --rotateY: calc(var(--angle) * -1);
}

.pre-container > div:nth-child(2):hover ~ pre {
  --rotateX: var(--angle);
  --rotateY: 0deg;
}

.pre-container > div:nth-child(3):hover ~ pre {
  --rotateX: var(--angle);
  --rotateY: var(--angle);
}

.pre-container > div:nth-child(4):hover ~ pre {
  --rotateX: 0deg;
  --rotateY: calc(var(--angle) * -1);
}

.pre-container > div:nth-child(5):hover ~ pre {
  --rotateX: 0deg;
  --rotateY: 0deg;
}

.pre-container > div:nth-child(6):hover ~ pre {
  --rotateX: 0deg;
  --rotateY: var(--angle);
}

.pre-container > div:nth-child(7):hover ~ pre {
  --rotateX: calc(var(--angle) * -1);
  --rotateY: calc(var(--angle) * -1);
}

.pre-container > div:nth-child(8):hover ~ pre {
  --rotateX: calc(var(--angle) * -1);
  --rotateY: 0deg;
}

.pre-container > div:nth-child(9):hover ~ pre {
  --rotateX: calc(var(--angle) * -1);
  --rotateY: var(--angle);
}
/* end: hover grids */
```
