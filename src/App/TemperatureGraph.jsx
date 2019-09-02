import React, { Component } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

class TemperatureGraph extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    const data = [1556668800000, date.getTime()];
    this.apiEndpoint = `http://${process.env.SERVER_IP}:3000/fan/temperature`;
    this.state = {
      chartOptions: {
        chart: {
          type: 'scatter',
          zoomType: 'x',
        },

        navigator: {
          adaptToUpdatedData: false,
          series: {
            data,
          },
        },

        scrollbar: {
          liveRedraw: false,
        },

        title: {
          text: 'AAPL history by the minute from 1998 to 2011',
        },

        subtitle: {
          text: 'Displaying 1.7 million data points in Highcharts Stock by async server loading',
        },

        rangeSelector: {
          buttons: [{
            type: 'hour',
            count: 1,
            text: '1h',
          }, {
            type: 'day',
            count: 1,
            text: '1d',
          }, {
            type: 'month',
            count: 1,
            text: '1m',
          }, {
            type: 'year',
            count: 1,
            text: '1y',
          }, {
            type: 'all',
            text: 'All',
          }],
          inputEnabled: false, // it supports only days
          selected: 4, // all
        },

        xAxis: {
          events: {
            afterSetExtremes: this.afterSetExtremes.bind(this),
          },
          minRange: 3600 * 1000, // one hour
        },

        yAxis: {
          floor: 0,
        },

        series: [{
          data,
          dataGrouping: {
            enabled: false,
          },
        }],
      },
    };
    this.afterSetExtremes = this.afterSetExtremes.bind(this);
    this.afterChartCreated = this.afterChartCreated.bind(this);
    this.getNavigatorData = this.getNavigatorData.bind(this);
    this.getInitialChartData = this.getInitialChartData.bind(this);

    this.webSocket = new WebSocket(`ws://${process.env.CLIENT_IP}:1920`);

    // chart: {
    //   zoomType: 'x',
    //   events: {
    //     load() {
    //       // set up the updating of the chart each second
    //       // const series = this.series[0];
    //       setInterval(() => {
    //         // console.log('series  ', this.series);
    //         const x = (new Date()).getTime(); // current time
    //         const y = Math.round(Math.random() * 100);
    //         this.series[0].addPoint([x, y], true, false);
    //       }, 1000);
    //     },
    //   },
    // },

    // time: {
    //   useUTC: false,
    // },

    // rangeSelector: {
    //   buttons: [{
    //     count: 1,
    //     type: 'minute',
    //     text: '1M',
    //   }, {
    //     count: 5,
    //     type: 'minute',
    //     text: '5M',
    //   }, {
    //     type: 'all',
    //     text: 'All',
    //   }],
    //   inputEnabled: false,
    //   selected: 0,
    // },

    // scrollbar: {
    //   enabled: true,
    // },

    // title: {
    //   text: 'Live random data',
    // },

    // exporting: {
    //   enabled: false,
    // },

    // series: [{
    //   name: 'Random data',
    //   data: (function () {
    //     // generate an array of random data
    //     const data = [];
    //     const time = (new Date()).getTime();
    //     let i;

    //     for (i = -999; i <= 0; i += 1) {
    //       data.push([
    //         time + i * 1000,
    //         Math.round(Math.random() * 100),
    //       ]);
    //     }
    //     return data;
    //   }()),
    // }],

    // dataGrouping: {
    //   enabled: false,
    // },
  }
  // console.log('client ip:', process.env.CLIENT_IP);

  componentDidMount() {
    this.getNavigatorData();
  }

  componentDidUpdate() {
    console.log('data state after update', this.state.chartOptions.series[0].data);
  }

  getInitialChartData() {
    const { internalChart } = this.state;
    internalChart.showLoading('Loading data from server...');
    const currentTime = Math.round(Date.now() / 1000);
    // currentTime - 60 * 60 * 24 * 2
    axios.get(this.apiEndpoint, {
      params: {
        start: currentTime - 60 * 60 * 24 * 2,
        end: currentTime,
      },
    })
      .then((response) => {
        const { data } = response;
        console.log('getinitialchartdata', data);
        // data = [].concat(data, [Date.UTC(2011, 9, 14, 19, 59)]);]
        const { chartOptions } = this.state;
        this.setState({
          chartOptions: {
            ...chartOptions,
            series: [{
              data,
            }],
          },
        });
        internalChart.hideLoading();
      });
  }

  getNavigatorData() {
    const currentTime = Math.round(Date.now() / 1000);
    // currentTime - 60 * 60 * 24 * 2
    axios.get(this.apiEndpoint, {
      params: {
        start: 0,
        end: currentTime,
      },
    })
      .then((response) => {
        let { data } = response;
        const date = new Date();
        data = [].concat(data, [date.getTime(), null]);
        const { chartOptions } = this.state;
        this.setState({
          chartOptions: {
            ...chartOptions,
            navigator: {
              series: {
                data,
              },
            },
          },
        });
      });
  }

  async afterSetExtremes(extreme) {
    if (Number.isInteger(extreme.min) && Number.isInteger(extreme.max)) {
      const { internalChart } = await this.state;
      internalChart.showLoading('Loading data from server...');
      axios.get(this.apiEndpoint, {
        params: {
          start: Math.round(extreme.dataMin),
          end: Math.round(extreme.dataMax),
        },
      })
        .then((data) => {
          console.log('changing data after set extremes', data);
          const { chartOptions } = this.state;
          this.setState({
            chartOptions: {
              ...chartOptions,
              series: [{
                data,
              }],
            },
          });
          internalChart.hideLoading();
        });
      // $.getJSON('https://www.highcharts.com/samples/data/from-sql.php?start=' + Math.round(e.min) +
      //   '&end=' + Math.round(e.max) + '&callback=?', function (data) {
      //     chart.series[0].setData(data);
      //     chart.hideLoading();
      // });
    }
  }

  afterChartCreated(chart) {
    this.setState({ internalChart: chart }, () => {
      this.getInitialChartData();
    });
  }

  render() {
    const { chartOptions } = this.state;
    if (chartOptions.navigator.series.data.length !== 0) {
      return (
        <div>
          <HighchartsReact
            highcharts={Highcharts}
            constructorType="stockChart"
            options={chartOptions}
            callback={this.afterChartCreated}
          />
        </div>
      );
    }
    return (
      <div>
        Loading Chart...
      </div>
    );
  }
}

export default TemperatureGraph;
