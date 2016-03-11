import React, { PropTypes, Component } from 'react';
import LeaderboardItem from '../../components/Leaderboard/Leaderboard';
import WeeklyLeaderGraph from '../../components/Leaderboard/Graph'
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
      <div className="LeaderboardConatiner">
        <h2 id="leadHeader"> 1601 had {this.props.weeklyTotals.totalWeekCommits} contributions with {this.props.weeklyTotals.totalWeekPulls} Pull Requests </h2>
         <div className="row">
          <div className="col-md-8">
            <WeeklyLeaderGraph gitStats={this.props.gitStats} />
          </div>
          <div className="col-md-4">
            <ProfileContainer />
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
