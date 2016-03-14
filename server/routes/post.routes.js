import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
import axios from 'axios';
const router = new Router();

// Get all Posts
router.route('/getPosts').get(PostController.getPosts);

// Get one post by title
router.route('/getPost').get(PostController.getPost);

// Add a new Post
router.route('/addPost').post(PostController.addPost);

// Delete a Post
router.route('/deletePost').post(PostController.deletePost);

router.get('/gitStats', function(req, res, next) {
  axios("https://kimonocrawlsapi123.firebaseio.com/kimono/api/6fxd7h0e/latest.json")
  .then(data => {
    let dataArray = data.data.results.collection1;
    let ranks = {
      lastWeekCommits:[],
      lastWeekPulls:[],
      currentStreak:[],
      totalCommits:[],
      longestStreak:[]
    };
    let result = {};
    for (let metric in ranks) {
      result[metric] = dataArray.slice().sort((a,b) => {
        return parseInt(b[metric].split(" ")[0])-parseInt(a[metric].split(" ")[0]);
      });
      result[metric] = result[metric].slice(0,3).map(person => person.gitName);
    }
    console.log(result);
    let dataToSend = {};
    dataToSend.data = dataArray;
    dataToSend.ranks = result;
    res.json(dataToSend);
  })
  .then(null, next);
});

export default router;
