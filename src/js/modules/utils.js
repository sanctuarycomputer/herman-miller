const random = function(min, max) {
  return Math.random() * (max - min) + min;
}

const onDrag = function(event) {
  var target = event.target,
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  target.style.webkitTransform =
  target.style.transform =
    `translate(${x}px, ${y}px)`;

  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

const onResize = function(event) {
  var target = event.target,
      x = (parseFloat(target.getAttribute('data-x')) || 0),
      y = (parseFloat(target.getAttribute('data-y')) || 0);

  target.style.width  = event.rect.width + 'px';
  target.style.height = event.rect.height + 'px';

  x += event.deltaRect.left;
  y += event.deltaRect.top;

  target.style.webkitTransform =
  target.style.transform =
    `translate(${x}px, ${y}px)`;

  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}


export { random, onDrag, onResize };
