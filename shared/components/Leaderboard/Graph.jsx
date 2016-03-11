import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {BarChart} from 'react-easy-chart';
import * as Actions from '../../redux/actions/actions';


class WeeklyLeaderGraph extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log(e);
    this.props.dispatch(Actions.showPerson(e))
  }

  render() {
    let gitDataSorted = this.props.gitStats.sort((a,b) => {
      return b.lastWeekCommits-a.lastWeekCommits;
    })
    let gitData = gitDataSorted.map(person => {
      return {
        x: person.fullName ? person.fullName.split(' ')[0] : person.gitName,
        y: parseInt(person.lastWeekCommits)
      }
    })
    return (
       <div className="mainChart">
          <BarChart height={550} width={900} barWidth={5} colorBars data={gitData} axes clickHandler={this.handleClick} />
       </div>
     )
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

// WeeklyLeaderGraph.propTypes = {
// };

export default connect(mapStateToProps)(WeeklyLeaderGraph);
