import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { Axios } from 'axios'
import { Plotly } from 'plotly'





var Graph = React.createClass({
  getInitialState() {
    return {data: ""}
  },
  componentWillReceiveProps() {
    console.log('component will receive props called')
    // this.setState({data: this.props.data})
    this.organizeData()
    this.createChart()
  },
  componentWillUpdate() {
    console.log('componentWillUpdate called')
    // this.organizeData();
    // this.createChart();
  },
  organizeData() {
    if (this.props.data) {
      var dataCopy = this.props.data
      dataCopy.sort((a,b) => {
        return parseInt(a['Contributions'].slice(0,3).trim()) - parseInt(b['Contributions'].slice(0,3).trim())
      })
      dataCopy.reverse()
        this.setState({data: dataCopy})
    }
  },
  createChart() {
    if (this.props.data) {
      var chart = {};
      chart.x = this.props.data.map(student => {
        if (student.fullName) return student.fullName
        else return student.gitName
      })
      chart.y = this.props.data.map(student => student['Contributions'].slice(0,3))
      var layout = {
        title: '1601 Commits'
      }
      Plotly.newPlot('myChart', [chart], layout);
    }
  },
  render() {
    return (
      <div>
        <div id="myChart"></div>
      </div>
    )
  }
})
