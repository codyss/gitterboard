import React, { PropTypes, Component } from 'react';
import PostListView from '../PostListView/PostListView';
import PostCreateView from '../../components/PostCreateView/PostCreateView';
import Header from '../../components/Header/Header';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import Footer from '../../components/Footer/Footer';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

class PostContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showAddPost: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.add = this.add.bind(this);
  }

  handleClick(e) {
    this.setState({
      showAddPost: !this.state.showAddPost,
    });

    e.preventDefault();
  }

  add(name, title, content) {
    this.props.dispatch(Actions.addPostRequest({ name, title, content }));
    this.setState({
      showAddPost: false,
    });
  }

  componentDidMount() {
    if(this.props.gitStats.length === 0) {
      this.props.dispatch(Actions.fetchGitStats());
    }
  }

  render() {
    return (
      <div>
        <Header onClick={this.handleClick} />
        <Leaderboard gitStats={this.props.gitStats}/>
        <div className="container">
          <PostCreateView addPost={this.add}
            showAddPost={this.state.showAddPost}/>
        </div>
        <Footer />
      </div>
    );
  }
}

// <PostListView posts={this.props.posts}/>

PostContainer.need = [() => { return Actions.fetchGitStats(); }];
PostContainer.contextTypes = {
  router: React.PropTypes.object,
};

function mapStateToProps(store) {
  return {
    posts: store.posts,
    gitStats: store.gitStats
  };
}



// PostContainer.propTypes = {
//   // gitStats: PropTypes.array,
//   // posts: PropTypes.arrayOf(PropTypes.shape({
//   //   name: PropTypes.string.isRequired,
//   //   title: PropTypes.string.isRequired,
//   //   content: PropTypes.string.isRequired,
//   // })).isRequired,
//   // dispatch: PropTypes.func.isRequired,
// };

export default connect(mapStateToProps)(PostContainer);
