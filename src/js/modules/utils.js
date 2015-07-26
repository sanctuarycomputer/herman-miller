const MIN_BOX_DIMENSIONS_PX = 100;
const MAX_BOX_DIMENSIONS_PX = 400;

const random = function(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
};

const vmin = function() {
  let bodyRect = document.body.getBoundingClientRect();
  console.log(bodyRect);
  let vmin = bodyRect.width < bodyRect.height ? bodyRect.width : bodyRect.height;
  vmin /= 100;
  return Math.round(vmin);
};

// ----------------------------------------------------------------------------
// Drag helpers

const onDrag = function(event) {
  let target = event.target;
  this.x = (this.x || 0) + event.dx;
  this.y = (this.y || 0) + event.dy;

  window.requestAnimationFrame(() => {
    target.style.webkitTransform =
    target.style.transform =
      `translate3d(${this.x}px, ${this.y}px, 0)`;
  });
}

const onDragEnd = function(event) {
  let target = event.target;
  this.x = this.x || 0;
  this.y = this.y || 0;

  window.requestAnimationFrame(() => {
    target.style.webkitTransform =
    target.style.transform =
      `translate(${this.x}px, ${this.y}px)`;
  });
}

// ----------------------------------------------------------------------------
// Resize helpers

// Determine the interactable's starting size.
// We use this to reset to 'real' coordinates after our scale3d resize
const onResizeStart = function(event) {
  this.startSize = parseFloat(window.getComputedStyle(event.target).getPropertyValue('width'));
  this.x = this.x || 0;
  this.y = this.y || 0;
}

const onResize = function(event) {
  let target = event.target;

  // Limit calculated rectangle dimensions to our specified values
  event.rect.width = Math.min(MAX_BOX_DIMENSIONS_PX, Math.max(event.rect.width, MIN_BOX_DIMENSIONS_PX));

  // Calculate scale based on the interact event's dimensions
  this.scale = event.rect.width / this.startSize;

  // Move x and y in different directions depending on which edge is being dragged
  // (because we have origin in the centre of the interactable)
  this.x += event.deltaRect.left; //* (event.edges.right ? 1 : -1);
  this.y += event.deltaRect.top; //* (event.edges.bottom ? 1 : -1);

  window.requestAnimationFrame(() => {
    target.style.webkitTransform =
    target.style.transform =
      `translate3d(${this.x}px, ${this.y}px, 0) scale3d(${this.scale}, ${this.scale}, 1)`;
  });
}

const onResizeEnd = function(event) {
  let target = event.target;

  // Set our values (and repaint) with the new 'real' coordinates:
  let realNewSize = this.startSize * this.scale + 'px';
  target.style.width = realNewSize;
  target.style.height = realNewSize;

  // We resize from the centre of the element (which is why we divide the dimensions by 2)
  // This means we need to offset the 'real' x & y by a multiple of our scale
  let offset = this.startSize * ((this.scale - 1) / 2);
  this.x -= offset;
  this.y -= offset;

  target.style.webkitTransform =
  target.style.transform =
    `translate(${this.x}px, ${this.y}px)`;

  delete this.scale;
  delete this.startSize;
}


export { random, onDrag, onResize, onDragEnd, onResizeStart, onResizeEnd, vmin };
