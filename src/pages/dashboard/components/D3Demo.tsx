import React from 'react';
import * as shotmap from '@/modules/wafermap';

class D3Demo extends React.Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    var myshotmap = shotmap('wafer2')
      .wafer(200, 3, 9, 'left')
      .die(3.76, 3.74)
      .reticle(5, 6, 0.3, -9.81)
      .create(true)
      .visibility('wafer2_cross', 'hidden');
    console.log(myshotmap);
  }

  render() {
    return <div id="wafer2">6</div>;
  }
}

export default D3Demo;
