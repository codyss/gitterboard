import * as ActionTypes from '../constants/constants';

const initialState = { posts: [], gitStats: [], selectedPost: null };

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_POST :
      return {
        posts: [{
          name: action.name,
          title: action.title,
          content: action.content,
          slug: action.slug,
          cuid: action.cuid,
          _id: action._id,
        }, ...state.posts],
        post: state.post };

    case ActionTypes.CHANGE_SELECTED_POST :
      return {
        posts: state.posts,
        post: action.slug,
      };

    case ActionTypes.ADD_POSTS :
      return {
        posts: action.posts,
        post: state.post,
      };

    case ActionTypes.ADD_SELECTED_POST :
      return {
        post: action.post,
        posts: state.posts,
      };

    case ActionTypes.DELETE_POST :
      return {
        posts: state.posts.filter((post) => post._id !== action.post._id),
      };

    case ActionTypes.ADD_STATS :
      return {
        gitStats: action.gitStats,
        weeklyTotals: action.weeklyTotals,
        ranks: action.ranks
      };

    case ActionTypes.SHOW_PERSON :
      let personToShow = state.gitStats.filter(person => {
        if (person.gitName === action.person) return person;
      })[0];
      personToShow.badges = [];
      for (let metric in state.ranks) {
        state.ranks[metric].forEach((person, i, arr) => {
          if (person === personToShow.gitName) personToShow.badges.push({metric, place:i+1});
        });
      }
      return Object.assign({}, state, {personToShow});

    case ActionTypes.CHANGE_GRAPH :
      return Object.assign({}, state, {graph: action.graph});

    default:
      return state;
  }
};

export default postReducer;
