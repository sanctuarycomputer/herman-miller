const MIN_BOX_DIMENSIONS_PX = 100;
const MAX_BOX_DIMENSIONS_PX = 400;

const random = function(min, max) {
  return Math.random() * (max - min) + min;
}

// ----------------------------------------------------------------------------
// Drag helpers
//

const collisionsFor = function(objects, mode) {
  return objects.filter(item => { 
    let draggableRange,
        itemRange;
    if (mode === 'x-axis') {
      itemRange = [item.y, (item.y + item.height)];
      draggableRange = [this.y, (this.y + this.height)];
    } else {
      itemRange = [item.x, (item.x + item.width)];
      draggableRange = [this.x, (this.x + this.width)];
    }

    if (draggableRange[0] >= itemRange[0]) {
      if (draggableRange[0] < itemRange[1]) {
        return true;
      } else {
        return false; 
      }
    } else {
      if (draggableRange[1] > itemRange[0]) {
        return true;
      } else {
        return false; 
      }
    }
  });
}

const handleSolidDragAxis = function(delta, axis) {
  const Global = window.eamesInteractive;
  const solids = Global.getSolidObjects(this.key);
  
  let metric = axis === 'x' ? 'width' : 'height';

  if (delta) {
    let relevantObjects;
    if (delta < 0) {
      relevantObjects = solids.filter(item => { return ((item[axis] + item[metric]) <= this[axis]) })
                              .filter(item => { return ((item[axis] + item[metric]) >= (this[axis] + delta)) });

    } else {
      relevantObjects = solids.filter(item => { return (item[axis] >= (this[axis] + this[metric])) })
                              .filter(item => { return (item[axis] <= (this[axis] + this[metric] + delta)) });
    }
    
    let collisions = collisionsFor.apply(this, [relevantObjects, `${axis}-axis`]);
    
    if (collisions.length === 0) {
      this[axis] = this[axis] + delta;
    } else {
      if (delta < 0) {
        let closest = Math.max.apply(Math, collisions.map(item => { return item[axis] + item[metric] }) );
        this[axis] = this[axis] - (this[axis] - closest);
      } else {
        let closest = Math.min.apply(Math, collisions.map(item => { return item[axis] }) );
        this[axis] = this[axis] + (closest - (this[axis] + this[metric]));
      }
    }
  }
}

const onDrag = function(event) {
  this.x = (this.x || 0);
  this.y = (this.y || 0);
 
  if (this.solid) {
    handleSolidDragAxis.apply(this, [event.dy, 'y']);
    handleSolidDragAxis.apply(this, [event.dx, 'x']);
  } else {
    this.x = this.x + event.dx;
    this.y = this.y + event.dy;
  }

  let target = event.target;
  window.requestAnimationFrame(() => {
    target.style.webkitTransform =
    target.style.transform =
      `translate3d(${this.x}px, ${this.y}px, 0)`;
  });
}

const onDragEnd = function(event) {
  const Global = window.eamesInteractive;
  Global.setRegistryState(this.state.key, {
    x: this.x,
    y: this.y
  });
}

// ----------------------------------------------------------------------------
// Resize helpers

const onResize = function(event) {
  let target = event.target;
  this.x = this.x || 0;
  this.y = this.y || 0;
  let dx = -1 * event.dx;
  let dy = -1 * event.dy;

  let factor = Math.max(dx, dy);
  
  // TODO: Max and Min Height and Width
  // TODO: Collision Aware Resizing
  this.width  += factor;
  this.height += factor;
  
  this.x += (-1 * factor);
  this.y += (-1 * factor);

  window.requestAnimationFrame(() => {
    target.style.width = `${this.width}px`;
    target.style.height = `${this.height}px`;
    target.style.webkitTransform =
    target.style.transform =
      `translate3d(${this.x}px, ${this.y}px, 0)`;
  });
}

const onResizeEnd = function(event) {
  const Global = window.eamesInteractive;
  Global.setRegistryState(this.state.key, {
    x: this.x,
    y: this.y,
    width: this.width,
    height: this.height
  });
}


export { random, onDrag, onResize, onDragEnd, onResizeEnd };
