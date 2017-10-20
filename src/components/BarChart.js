import React, { Component } from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux';
// import { barChange }  from '../store';

class BarChart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      barData: this.props.data,
      labels: this.props.labels
    }
  }

  componentWillReceiveProps(nextProps) {

    const begin = this.props.data;
    const end = nextProps.data;

    d3.selectAll("rect").transition().tween("attr.scale", null);
    d3.selectAll("rect").transition().duration(600).ease(d3.easeLinear).tween("attr.scale", () => {

      // set interpolator
      const interpolators = end.map((endpoint, index) => {
        return d3.interpolateNumber(begin[index], endpoint);
      })

      return (t) => {
        // reset state to trigger animation
        const newArr = interpolators.map(interpolator => {
          return interpolator(t);
        })
        this.setState({ barData: newArr });
      }
    })

  }

  render() {

    // canvas setting
    const canvasWidth = 800;
    const canvasHeight = 300;
    const padding = 20;

    // data
    const dataset = this.state.barData;
    const labels = this.state.labels;

    // scale
    const xScale = d3.scaleBand()
      .domain(d3.range(dataset.length))
      .rangeRound([0, canvasWidth])
      .paddingInner(0.05);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([0, canvasHeight - padding]);

    // label
    let key = 0;

    return (
      <div>
        <svg id="bar-chart" width={canvasWidth} height={canvasHeight + 20}>
          {
            dataset.map((data, index) => {
              return (
                <rect key={key++} x={xScale(index)} y={canvasHeight - yScale(data)} width={xScale.bandwidth()} height={yScale(data)} fill={`rgb(0, 0, ${Math.round(data * 10 % 255)})`}>
                </rect>
              )
            })
          }
          {
            dataset.map((data, index) => {
              return (
                <text key={key++} textAnchor="middle" x={xScale(index) + xScale.bandwidth() / 2} y={canvasHeight - yScale(data) + 14} fill="white" fontSize="11px">
                  {Math.floor(data)}
                </text>
              )
            })
          }
          {
            labels.map((label, index) => {
              return (
                <text key={key++} textAnchor="middle" x={xScale(index) + xScale.bandwidth() / 2} y={canvasHeight + 14} fill="black" fontSize="11px">
                  {label}
                </text>
              )
            })
          }
        </svg>
      </div>
    )
  }
}

const mapToState = function (state) {
  return {
  }
};

const mapToDispatch = function (dispatch) {
  return {
    // updateBarValues() {
    //   const action = barChange([ 11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
    //     5, 10, 13, 19, 21, 25, 22, 18, 15, 13 ]);
    //     dispatch(action);
    // }
  }
};

const barChartContainer = connect(mapToState, mapToDispatch)(BarChart);

export default barChartContainer;
