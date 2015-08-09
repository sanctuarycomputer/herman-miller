const MIN_BOX_DIMENSIONS_PX = 100;
const MAX_BOX_DIMENSIONS_PX = 400;

const random = function(min, max) {
  return Math.random() * (max - min) + min;
}

const randomWhole = function(min, max){
  return Math.round(random(min, max))
}
// ----------------------------------------------------------------------------
// Drag helpers
//

const collisionsFor = function(mode, objects) {
  return objects.filter(item => {
    let draggableRange,
        itemRange;
    if (mode === 'x') {
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

const relevantObjectsFor = function(delta, axis, metric) {
  const Global = window.eamesInteractive;
  const solids = Global.getSolidObjects(this.key);

  let relevantObjects = [];
  if (delta) {
    if (delta < 0) {
      relevantObjects = solids.filter(item => { return ((item[axis] + item[metric]) <= this[axis]) })
                              .filter(item => { return ((item[axis] + item[metric]) >= (this[axis] + delta)) });

    } else {
      relevantObjects = solids.filter(item => { return (item[axis] >= (this[axis] + this[metric])) })
                              .filter(item => { return (item[axis] <= (this[axis] + this[metric] + delta)) });
    }
  }
  return relevantObjects;
}

const handleSolidDragAxis = function(delta, axis) {
  let metric = axis === 'x' ? 'width' : 'height';
  let relevantObjects = relevantObjectsFor.apply(this, [delta, axis, metric])
  let collisions = collisionsFor.apply(this, [axis, relevantObjects]);

  // Move up against closest object
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
  const Sound = window.Sound;
  let index = randomWhole(1, 10);
  Sound.snare[index].play();
  Global.setRegistryState(this.state.key, {
    x: this.x,
    y: this.y
  });

}

// ----------------------------------------------------------------------------
// Resize helpers
//
const onResizeStart = function(event) {
  this.yInitial      = this.y;
  this.xInitial      = this.x;
  this.initialWidth  = this.width;
  this.initialHeight = this.height;
  this.aspect        = this.width / this.height;
}

const onResize = function(event) {
  let target = event.target;
  this.x = this.x || 0;
  this.y = this.y || 0;
  let dx = -1 * event.dx;
  let dy = -1 * event.dy;

  let factor = Math.max(dx, dy);

  this.width  += factor * this.aspect;
  this.height += factor;

  this.x += (-1 * factor * this.aspect);
  this.y += (-1 * factor);

  window.requestAnimationFrame(() => {
    target.style.width = `${this.width}px`;
    target.style.height = `${this.height}px`;
    target.style.webkitTransform =
    target.style.transform =
      `translate3d(${this.x}px, ${this.y}px, 0)`;
  });
}

const maxExpansionForResize = function(axis) {
  let metric = axis === 'x' ? 'width' : 'height';
  let solids = eamesInteractive.getSolidObjects(this.state.key);

  let relevantObjects = solids.filter(item => { return item[axis] < this[`${axis}Initial`] })
                              .filter(item => { return (item[axis] + item[metric]) > this[axis] })

  let collisions = collisionsFor.apply(this, [axis, relevantObjects]);

  if (collisions.length) {
    return Math.max.apply(Math, collisions.map(item => { return item[axis] + item[metric] }) );
  } else {
    return 0;
  }
}

const onResizeEnd = function(event) {
  let deltaX = this.x - this.xInitial;
  let deltaY = this.y - this.yInitial;

  if (this.solid) {
    let maxX = maxExpansionForResize.apply(this, ['x']);
    let maxY = maxExpansionForResize.apply(this, ['y']);

    let reductionRatioX = 1;
    let reductionRatioY = 1;
    if (maxX > 0)  {
      let requiredReduction = maxX - this.x;
      console.log(`Reduce X: ${requiredReduction}`);
      reductionRatioX = requiredReduction / this.width;
    }

    if (maxY > 0)  {
      let requiredReduction = maxY - this.y;
      console.log(`Reduce Y: ${requiredReduction}`);
      reductionRatioY = requiredReduction / this.height;
    }

    let reductionRatio = Math.min.apply(Math, [reductionRatioX, reductionRatioY]);

    if (reductionRatio < 1) {
      reductionRatio = 1 - reductionRatio;
    }

    this.x      = this.x + (this.width - (this.width * reductionRatio));
    this.y      = this.y + (this.height - (this.height * reductionRatio));
    this.width  = this.width * reductionRatio;
    this.height = this.height * reductionRatio;

    let node = React.findDOMNode(this);

    dynamics.animate(node, {
      translateX: this.x,
      translateY: this.y,
      width: this.width,
      height: this.height
    }, {
      type: dynamics.spring,
      frequency: 200,
      friction: 200,
      duration: 400
    })
  }

  const Global = window.eamesInteractive;
  const Sound = window.Sound;
  let index = randomWhole(1, 10);
  Sound.toms[index].play();
  Global.setRegistryState(this.state.key, {
    x: this.x,
    y: this.y,
    width: this.width,
    height: this.height
  });


  this.xInitial      = null;
  this.yInitial      = null;
  this.initialWidth  = null;
  this.initialHeight = null;
}


export { random, onDrag, onResize, onResizeStart, onDragEnd, onResizeEnd };
