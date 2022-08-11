const express = require('express');
const postCtrler = require('../controllers/posts');
const router = express.Router();
const multer = require('../middleware/multer-config');

router.get('/', postCtrler.getAllPosts);
router.get('/:id', postCtrler.getOnePost);
router.post('/', multer, postCtrler.newPost);
router.put('/:id', multer, postCtrler.updatePost);
router.delete('/:id', postCtrler.deletePost);
router.post('/:id/like', postCtrler.likePost);

module.exports = router;