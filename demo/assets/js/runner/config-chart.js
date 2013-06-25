function getChart(colorRGBA, dataChart) {

    var chart;

    nv.addGraph(function() {
      chart = nv.models.lineChart();

    chart.x(function(d,i) { return i });

    chart.xAxis
         .axisLabel('ColorRGB');

    chart.yAxis
          .tickFormat(d3.format(',.2f'));

    d3.select('#chart1 svg')
      .datum(printChart(dataChart))
      .transition().duration(500)
      .call(chart);

      nv.utils.windowResize(chart.update);

      chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

      return chart;
    });

    function printChart(histogram) {

      var dataChart = {r: [],
                       g: [],
                       b: []};

      for (var i = 0; i < 256; i++) {
        dataChart.r.push({x: i, y: histogram.r[i]});
        dataChart.g.push({x: i, y: histogram.g[i]});
        dataChart.b.push({x: i, y: histogram.b[i]});
      }

      return [
          {
            values: dataChart.r,
            key: "R",
            color: 'rgba(255, 0, 0, 1)'
          },
          {
            values: dataChart.g,
            key: "G",
            color: 'rgba(0, 255, 0, 1)'
          },
          {
            values: dataChart.b,
            key: "B",
            color: 'rgba(0, 0, 255, 1)'
          }
        ];
    }
}