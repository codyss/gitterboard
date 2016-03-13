import React, { PropTypes, Component } from 'react';
import LeaderboardItem from '../../components/Leaderboard/Leaderboard';
import Graph from '../../components/Leaderboard/Graph';
import GraphViewToggle from '../../components/Leaderboard/GraphView';
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
    this.showGraphTitle = this.showGraphTitle.bind(this);
  }

  handleClick(e) {
    this.setState({
      showProfile: !this.state.showProfile,
    });

    e.preventDefault();
  }

  showGraphTitle() {
    switch(this.props.graph) {
      case "lastWeekCommits":
        return "Last Week Commits";
      case "lastWeekPulls":
        return "Last Week Pull Requests";
      case "totalCommits":
        return "Total Commits";
      case "currentStreak":
        return "Current Streak";
      case "longestStreak":
        return "Longest Streak";
      default:
        return "Last Week Commits";
    }
  }

  render() {
    return (
      <div className="LeaderboardContainer">
        <div className="row">
          <div className="col-md-8">
              <div className="row">
                <div className="col-md-2">
                  <GraphViewToggle />
                </div>
                <div className="col-md-10">
                  <h3 className="chartTitle">{this.showGraphTitle()}</h3>
                </div>
              </div>
            <Graph sort={this.props.graph || "lastWeekCommits"}/>
          </div>
          <div className="col-md-4">
            <ProfileContainer />
          </div>
        </div>
      </div>
    );
  }
}



function mapStateToProps(store) {
  return {
    gitStats: store.gitStats,
    weeklyTotals: store.weeklyTotals,
    graph: store.graph
  };
}

export default connect(mapStateToProps)(LeaderboardContainer);
