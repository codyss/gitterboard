import * as ActionTypes from '../constants/constants';
import fetch from 'isomorphic-fetch';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${(process.env.PORT || 8000)}`) : '';

export function addPost(post) {
  return {
    type: ActionTypes.ADD_POST,
    name: post.name,
    title: post.title,
    content: post.content,
    slug: post.slug,
    cuid: post.cuid,
    _id: post._id,
  };
}

export function changeSelectedPost(slug) {
  return {
    type: ActionTypes.CHANGE_SELECTED_POST,
    slug,
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    fetch(`${baseURL}/api/addPost`, {
      method: 'post',
      body: JSON.stringify({
        post: {
          name: post.name,
          title: post.title,
          content: post.content,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json()).then(res => dispatch(addPost(res.post)));
  };
}

export function addSelectedPost(post) {
  return {
    type: ActionTypes.ADD_SELECTED_POST,
    post,
  };
}

export function getPostRequest(post) {
  return (dispatch) => {
    return fetch(`${baseURL}/api/getPost?slug=${post}`, {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((response) => response.json()).then(res => dispatch(addSelectedPost(res.post)));
  };
}

export function deletePost(post) {
  return {
    type: ActionTypes.DELETE_POST,
    post,
  };
}

export function addPosts(posts) {
  return {
    type: ActionTypes.ADD_POSTS,
    posts,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    return fetch(`${baseURL}/api/getPosts`).
      then((response) => response.json()).
      then((response) => dispatch(addPosts(response.posts)));
  };
}

export function deletePostRequest(post) {
  return (dispatch) => {
    fetch(`${baseURL}/api/deletePost`, {
      method: 'post',
      body: JSON.stringify({
        postId: post._id,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(() => dispatch(deletePost(post)));
  };
}


function getTotals(data) {
  let newData = data.slice();
  return newData.reduce((accum, student) => {
    if(student.lastWeekCommits) accum.totalWeekCommits += parseInt(student.lastWeekCommits);
    if(student.lastWeekPulls) accum.totalWeekPulls += parseInt(student.lastWeekPulls);
    return accum;
  }, {totalWeekCommits: 0, totalWeekPulls: 0});
}

export function fetchGitStats() {
  return (dispatch) => {
    return fetch('/api/gitStats')
      .then(res => res.json())
      .then(res => {
        console.log(res);
        let data = res.data;
        return {gitStats: data, weeklyTotals: getTotals(data), ranks:res.ranks};
      })
      .then(obj => dispatch(addGitStats(obj)));
  };
}

export function fetchGitStatsClient() {
  return (dispatch) => {
    return fetch('https://kimonocrawlsapi123.firebaseio.com/kimono/api/6fxd7h0e/latest.json')
      .then(res => res.json())
      .then(data => {
        let dataArray = data.results.collection1;
        let ranks = {
          lastWeekCommits:[],
          lastWeekPulls:[],
          currentStreak:[],
          totalCommits:[],
          longestStreak:[]
        };
        let result = {};
        for (let metric in ranks) {
          result[metric] = dataArray.sort((a,b) => {
            return parseInt(b[metric].split(" ")[0])-parseInt(a[metric].split(" ")[0]);
          });
          result[metric] = result[metric].slice(0,3).map(person => person.gitName);
        }
        return {gitStats: dataArray, weeklyTotals: getTotals(dataArray), ranks:result};
      })
      .then(obj => dispatch(addGitStats(obj)));
  };
}

export function addGitStats(obj) {
  return {
    type: ActionTypes.ADD_STATS,
    gitStats: obj.gitStats,
    weeklyTotals: obj.weeklyTotals,
    ranks: obj.ranks
  };
}


export function showPerson(obj) {
  return {
    type: ActionTypes.SHOW_PERSON,
    person: obj.gitName
  };
}

export function changeGraph(key) {
  return {
    type: ActionTypes.CHANGE_GRAPH,
    graph: key
  };
}
