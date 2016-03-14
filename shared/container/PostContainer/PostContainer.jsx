import React, { PropTypes, Component } from 'react';
import PostListView from '../PostListView/PostListView';
import PostCreateView from '../../components/PostCreateView/PostCreateView';
import Header from '../../components/Header/Header';
import LeaderboardContainer from '../Leaderboard/LeaderboardContainer';
import Footer from '../../components/Footer/Footer';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

class PostContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    if(!this.props.gitStats) {
      this.props.dispatch(Actions.fetchGitStatsClient());
    }
  }

  render() {
    return (
      <div>
        <Header />
        <LeaderboardContainer />
        <Footer />
      </div>
    );
  }
}

//<Profile gitStats={this.props.gitStats} person="codyss"/>
// <PostListView posts={this.props.posts}/>
//weeklyTotals={this.props.weeklyTotals} gitStats={this.props.gitStats}

PostContainer.need = [() => { return Actions.fetchGitStatsClient(); }];
PostContainer.contextTypes = {
  router: React.PropTypes.object,
};

function mapStateToProps(store) {
  return {
    posts: store.posts,
    gitStats: store.gitStats,
    weeklyTotals: store.weeklyTotals
  };
}




export default connect(mapStateToProps)(PostContainer);
