import React from "react";
import ReactHighcharts from 'react-highcharts/ReactHighstock.src'
import moment from 'moment'

const PriceChart = (props) => {

    const options = {style: 'currency', currency: 'USD'};
    const numberFormat = new Intl.NumberFormat('en-US', options);
    let priceData = props.data

    const configPrice = {

      yAxis: [{
        offset: 20,

        labels: {
          formatter: function () {
            return numberFormat.format(this.value)
          }
          ,
          x: -15,
          style: {
            "color": "#000", "position": "absolute"

          },
          align: 'left'
        },
      },

      ],
      tooltip: {
        shared: true,
        formatter: function () {
          return numberFormat.format(this.y, 0) +  '</b><br/>' + moment(this.x).format('MMMM Do YYYY, h:mm')
        }
      },
    //   plotOptions: {
    //     series: {
    //       showInNavigator: false,
    //       gapSize: 6,

    //     }
    //   },
      rangeSelector: {
        verticalAlign: 'bottom',
        x: 0,
        y: 0
      },
      title: {
        text: `Bitcoin price`
      },
    //   chart: {
    //     height: 600,
    //   },

      credits: {
        enabled: false
      },
      xAxis: {
        type: 'date',
      },
      series: [{
        name: 'Price',
        type: 'spline',

        data: priceData,
        tooltip: {
          valueDecimals: 2
        },

      }
      ]
    };

    return (
      <div style={{
        'width' : '50%',
        'height' : '50%'
    }}>
         <ReactHighcharts config = {configPrice}></ReactHighcharts>
      </div>
    )
}

export default PriceChart;
