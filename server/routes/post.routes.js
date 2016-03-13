import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
import axios from 'axios';
import cheerio from 'cheerio'
import Xray from 'x-ray';
const xray = new Xray();
const router = new Router();

// Get all Posts
router.route('/getPosts').get(PostController.getPosts);

// Get one post by title
router.route('/getPost').get(PostController.getPost);

// Add a new Post
router.route('/addPost').post(PostController.addPost);

// Delete a Post
router.route('/deletePost').post(PostController.deletePost);

router.get('/test', function(req, res, next) {
  xray('https://github.com/codyss', 'span', [{
    '.contrib-number': ""
  }])(function(err, result) {
    res.send(result);
  });
});


router.get('/git', function(req, res, next) {

  axios('https://github.com/codyss')
  .then(html => {
    let $ = cheerio.load(html);
    let stats;
    $('.contrib-column-first table-column').filter(() => {
      let data = $(this);
      console.log(data);
      stats = data.children();
    });
    res.json(stats);
  });
});

export default router;
