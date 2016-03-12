import React, { PropTypes, Component } from 'react';
import LeaderboardItem from '../../components/Leaderboard/Leaderboard';
import Graph from '../../components/Leaderboard/Graph'
import ProfileContainer from '../Profile/ProfileContainer';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';


class LeaderboardContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showProfile: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      showProfile: !this.state.showProfile,
    });

    e.preventDefault();
  }

  render() {
    return (
      <div className="LeaderboardContainer">
        <div className="row">
          <div className="col-md-8">
            <h2 id="leadHeader"> 1601 had {this.props.weeklyTotals.totalWeekCommits} contributions with {this.props.weeklyTotals.totalWeekPulls} Pull Requests </h2>
            <Graph sort="lastWeekCommits"/>
          </div>
          <div className="col-md-4">
            <ProfileContainer />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Graph sort="totalCommits" width="500" />
          </div>
          <div className="col-md-6">
            <Graph sort="currentStreak" width="500"  />
          </div>
        </div>
      </div>
    )
  }
}



function mapStateToProps(store) {
  return {
    gitStats: store.gitStats,
    weeklyTotals: store.weeklyTotals
  };
}

export default connect(mapStateToProps)(LeaderboardContainer);
