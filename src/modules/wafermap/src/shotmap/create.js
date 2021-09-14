import * as d3 from 'd3-selection';

/**
 * create shotmap without data
 *
 * @param {boolean} diesGrid Draw grid line of dies.
 */
export default function (diesGrid) {
  // width/height: die
  var dw = this.dieWidth * this.zoom;
  var dh = this.dieHeight * this.zoom;

  // width/height: reticle
  var rtw = dw * this.diesX;
  var rth = dh * this.diesY;

  // width/height: svg
  var w = this.diameter * this.zoom + rtw * 2;
  var h = this.diameter * this.zoom + rth * 2;

  // svg
  this.svg = d3
    .select('#' + this.id())
    .append('svg')
    .attr('id', this.id() + '_svg')
    .attr('width', w)
    .attr('height', h);

  // shadow
  var defs = this.svg.append('defs');
  var filter = defs
    .append('filter')
    .attr('id', 'drop-shadow')
    .attr('height', '125%');
  filter
    .append('feGaussianBlur')
    .attr('in', 'SourceAlpha')
    .attr('stdDeviation', 3)
    .attr('result', 'blur');
  filter
    .append('feOffset')
    .attr('in', 'blur')
    .attr('dx', 3)
    .attr('dy', 3)
    .attr('result', 'offsetBlur');
  var feMerge = filter.append('feMerge');
  feMerge.append('feMergeNode').attr('in', 'offsetBlur');
  feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

  // circle
  var d = this.diameter * this.zoom;
  var m = this.margin * this.zoom;
  var r = d / 2;
  var rm = r - m;
  var cx = r + rtw;
  var cy = r + rth;
  // circle: wafer
  this.svg
    .append('circle')
    .style('filter', 'url(#drop-shadow)')
    .attr('cx', cx)
    .attr('cy', cy)
    .attr('r', r)
    .attr('class', 'wafer')
    .attr('fill', 'gray');
  // circle: margin
  this.svg
    .append('circle')
    .attr('cx', cx)
    .attr('cy', cy)
    .attr('r', rm)
    .attr('stroke', '#222')
    .attr('fill', 'lightgray');

  // position of reticle at top-left
  var rtx0 = (r + this.zoom * this.offsetX + rtw / 2) % rtw;
  var rty0 = (r + this.zoom * -this.offsetY + rth / 2) % rth;

  // position of die at top-left
  var dx0 = rtx0 + Math.ceil((cx - rm - rtx0) / dw) * dw;
  var dy0 = rty0 + Math.ceil((cy - rm - rty0) / dh) * dh;
  var dx1 = dx0 + Math.floor((cx + rm - dx0) / dw) * dw;
  var dy1 = dy0 + Math.floor((cy + rm - dy0) / dh) * dh;

  this.svg
    .append('rect')
    .attr('id', this.id() + '_rect_area')
    .attr('x', dx0)
    .attr('y', dy0)
    .attr('width', dx1 - dx0)
    .attr('height', dy1 - dy0)
    .attr('stroke', 'lightgray')
    .attr('stroke-width', 0.8)
    .attr('fill', 'none');

  // flat
  var flatL = 0,
    flatR = w,
    flatT = 0,
    flatB = h;
  if (this.notchSide == 'left') flatL = cx - r + this.notch * this.zoom;
  if (this.notchSide == 'right') flatR = cx + r - this.notch * this.zoom;
  if (this.notchSide == 'top') flatT = cy - r + this.notch * this.zoom;
  if (this.notchSide == 'bottom') flatB = cy + r - this.notch * this.zoom;

  // grid: dies
  var x = 0;
  var y = 0;
  var gd = this.svg.append('g').attr('id', this.id() + '_dies');
  for (var dy = dy0; dy < dy1; dy += dh) {
    for (var dx = dx0; dx < dx1; dx += dw) {
      var rect = gd
        .append('rect')
        .attr('id', this.id() + '_dies_' + x + '_' + y)
        .attr('x', dx)
        .attr('y', dy)
        .attr('width', dw)
        .attr('height', dh)
        .attr('class', 'die')
        .on('click', updateDie);

      if (
        inside(dx, dy, dw, dh, cx, cy, rm) &&
        flat(dx, dy, dw, dh, flatL, flatR, flatT, flatB)
      ) {
        if (diesGrid) {
          rect.attr('stroke-width', 1).attr('stroke', 'darkgray');
        } else {
          rect.attr('stroke-width', 0);
        }
        rect.attr('fill', 'lightgray');
      } else {
        rect.attr('visibility', 'hidden');
      }
      x++;
    }
    x = 0;
    y++;
  }

  // grid: reticle
  var gr = this.svg.append('g').attr('id', this.id() + '_reticles');
  for (var rtx = rtx0; rtx < w; rtx += rtw) {
    for (var rty = rty0; rty < h; rty += rth) {
      if (touch(rtx, rty, rtw, rth, cx, cy, r)) {
        gr.append('rect')
          .attr('x', rtx)
          .attr('y', rty)
          .attr('width', rtw)
          .attr('height', rth)
          .attr('stroke', 'black')
          .attr('stroke-width', 0.8)
          .attr('fill', 'none');
      }
    }
  }

  // circle: cross
  var g0 = this.svg.append('g').attr('id', this.id() + '_cross');
  g0.append('line')
    .attr('x1', cx)
    .attr('y1', 0)
    .attr('x2', cx)
    .attr('y2', h)
    .attr('stroke-width', 1)
    .attr('stroke', 'orange');
  g0.append('line')
    .attr('x1', 0)
    .attr('y1', cy)
    .attr('x2', w)
    .attr('y2', cy)
    .attr('stroke', 'orange')
    .attr('stroke-width', 1);

  return this;
}

function updateDie() {
  var rect = d3.select(this);
  // .attr('visibility', 'visible');

  var color = 'none';
  var die = rect.datum();
  if (die.grade === 'bin') {
    die.grade = 'd';
    color = 'yellow';
  } else if (die.grade === 'd') {
    die.grade = 'f';
    color = 'red';
  } else if (die.grade === 'f') {
    die.grade = undefined;
    color = 'white';
  } else {
    die.grade = 'bin';
    color = 'rgb(0,212,0)';
  }

  rect.attr('fill', color);
  // rect.attr('fill', this.diePalette()(die.grade));	// this is not correct
}

function inside(x, y, w, h, cx, cy, r) {
  var r2 = r * r;
  return (
    dist(x, y, cx, cy) < r2 &&
    dist(x + w, y, cx, cy) < r2 &&
    dist(x, y + h, cx, cy) < r2 &&
    dist(x + w, y + h, cx, cy) < r2
  );
}

function touch(x, y, w, h, cx, cy, r) {
  var r2 = r * r;
  return (
    dist(x, y, cx, cy) <= r2 ||
    dist(x + w, y, cx, cy) <= r2 ||
    dist(x, y + h, cx, cy) <= r2 ||
    dist(x + w, y + h, cx, cy) <= r2
  );
}

function flat(x, y, w, h, flatL, flatR, flatT, flatB) {
  return (
    x + w / 2 >= flatL &&
    y + w / 2 >= flatT &&
    x + w / 2 <= flatR &&
    y + h / 2 <= flatB
  );
}

function dist(x, y, cx, cy) {
  return (x - cx) * (x - cx) + (y - cy) * (y - cy);
}
