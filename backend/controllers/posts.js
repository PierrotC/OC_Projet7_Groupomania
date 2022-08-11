const Post = require('../models/post');
const fs = require('fs');
const { rejects } = require('assert');

exports.getAllPostss = (req, res, next) => {
    Post.find()
        .then(posts => res.status(200).json( posts ))
        .catch(error => res.status(404).json({ error }));
};

// exports.getOnePost = (req, res, next) => {
//     Post.findOne({ _id: req.params.id })
//         .then(post => res.status(200).json( post ))
//         .catch(error => res.status(404).json({ error }));
// };

exports.newPost = (req, res, next) => {
    const objectPost = JSON.parse(req.body.post);

    delete objectPost._id;
    delete objectPost._userId;

    const post = new Post({
        ...objectPost,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });

    post.save()
        .then(() => res.status(201).json({ message: 'New post has been added'}))
        .catch(error => res.status(400).json({ error }));
};

exports.updatePost = (req, res, next) => {
    const objectPost = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete objectPost._userId;


    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if(post.userId != req.auth.userId) {
                res.status(401).json({ message: 'Unauthorized' });
            } else {
                if(req.file) {
                    const imgName = post.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${ imgName }`, () => {
                        Post.updateOne({ _id: req.params.id }, { ...objectPost, _id: req.params.id})
                        .then(() => res.status(200).json({ message: 'Post updated with image' }))
                        .catch(error => res.status(400).json({ error }));
                    })
                } else {
                    Post.updateOne({ _id: req.params.id }, { ...objectPost, _id: req.params.id})
                        .then(() => res.status(200).json({ message: 'Post updated' }))
                        .catch(error => res.status(400).json({ error }));
                }
            }
        })
        .catch(error => res.status(404).json({ error }));
};

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if(post.userId != req.auth.userId) {
                res.status(401).json({ message: 'Unauthorized' });
            } else {
                const imgName = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${ imgName }`, () => {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Post deleted' }))
                        .catch(error => res.status(400).json({ error }));
                });
            }
        })
        .catch(error => res.status(404).json({ error }));

};

exports.likePost = (req, res, next) => {
    const likeValue = req.body.like;
    const userId = req.body.userId;

    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if(likeValue == 0) {
                if(post.usersLiked.includes(userId)) {
                    post.usersLiked.splice(post.usersLiked.indexOf(userId), 1);
                    post.likes--;
                } else if(post.usersDisliked.includes(userId)) {
                    post.usersDisliked.splice(post.usersDisliked.indexOf(userId), 1);
                    post.dislikes--;
                }
                post.save()
                    .then(() => res.status(200).json({ message: 'Like/dislike removed' }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                if (post.usersLiked.includes(userId) || post.usersDisliked.includes(userId)) {
                    res.status(401).json({message: 'You already did that'});
                } else {
                    if(likeValue == 1) {
                        post.likes++;
                        post.usersLiked.push(userId);
                    } else if(likeValue == -1) {
                        post.dislikes++;
                        post.usersDisliked.push(userId);
                    }
            
                post.save()
                    .then(() => res.status(200).json({ message: 'Like/dislike saved' }))
                    .catch(error => res.status(400).json({ error }));
                }
            }
        })
        .catch(error => res.status(404).json({ error }));
};