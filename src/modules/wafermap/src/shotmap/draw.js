import * as d3 from 'd3-selection';

/**
 * draws shotmap with data.
 *
 */
export default function () {
  var self = this;
  d3.select('#' + this.id() + '_dies')
    .selectAll('rect')
    .transition()
    .duration(1000)
    .attr('class', 'die')
    .attr('fill', function (d) {
      if (d === undefined) {
        return 'none';
      } else {
        return self.diePalette()(d.testResult());
      }
    });
}

function defaultColorPicker(d) {
  if (d === undefined) {
    return 'none';
  }

  var grade = d.testResult();
  if (grade === 'd') {
    return 'yellow';
  }
  if (grade === 'e') {
    return 'yellow';
  }
  if (grade === 'f') {
    return 'red';
  }
  if (grade === 'g') {
    return 'yellow';
  }
  if (grade === undefined) {
    return 'none';
  }
  return 'green';
}
