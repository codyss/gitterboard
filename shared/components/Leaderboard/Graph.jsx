import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs';
import * as Actions from '../../redux/actions/actions';


class Graph extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.bindClick = this.bindClick.bind(this);
  }

  bindClick(chartComponent) {
    if (chartComponent) {
      chartComponent.getCanvass().onclick = (event) => {
        let activePoints = chartComponent.getChart().getBarsAtEvent(event);
        if (activePoints && activePoints.length > 0) {
          let clickedLabel = activePoints[0].label;
          console.log(activePoints);
          this.props.dispatch(Actions.showPerson(clickedLabel));
        }
      };
    }
  }





  render() {
    let gitDataSorted = this.props.gitStats.slice().sort((a,b) => {
      return parseInt(b[this.props.sort].replace(/[^\d]+/, ""))-parseInt(a[this.props.sort].replace(/[^\d]+/, ""));
    });
    let nameOrGitName = gitDataSorted.map(person => person.fullName.split(' ').length > 1 ? person.fullName.split(' ')[0] + ' ' + person.fullName.split(' ')[1][0] + '.' : person.gitName);
    let gitName = gitDataSorted.map(person => person.gitName);
    let gitData = gitDataSorted.map(person => {
      return {
        lastWeekCommits: parseInt(person.lastWeekCommits),
        totalCommits: parseInt(person.totalCommits),
        currentStreak: parseInt(person.currentStreak.split(' ')[0]),
        name: gitDataSorted.map(person => person.fullName.split(' ').length > 1 ? person.fullName.split(' ')[0]: person.gitName),
        gitName: person.gitName
      };
    });
    let formatting = {
      label: "Last Week Commits",
      fillColor: "rgba(152, 68, 20,1)",
      strokeColor: "rgba(220,220,220,0.8)",
      highlightFill: "rgba(220,220,220,0.75)",
      highlightStroke: "rgba(220,220,220,1)",
      data: [65, 59, 80, 81, 56, 55, 40]
    };
      // graph2: Object.assign({}, formatting, {data: gitData.map(item => item.totalCommits), label: "Total Commits",yAxisID: "y-axis-2"}),
    let data = {
      labels: gitName,
      datasets: [Object.assign({}, formatting, {data: gitData.map(item => item.lastWeekCommits), yAxisID: "y-axis-1"})]
    };
    let options = {
      scaleUse2Y: true
    };
    return (
       <div className="mainChart">
         <Bar className="mainChartBox" ref={this.bindClick} data={data} options={options} width="700" height="500"/>
       </div>
     );
  }
}


function mapStateToProps(store) {
  return {
    gitStats: store.gitStats,
    weeklyTotals: store.weeklyTotals,
    personToShow: store.personToShow
  };
}



//need to send the personToShow to reducer

// Graph.propTypes = {
// };

export default connect(mapStateToProps)(Graph);
