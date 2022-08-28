const url = 'http://localhost:3000/api/'

class PostService {
    // Modify PUT user

    // Delete DELETE user

    // All posts GET posts
    static getPosts(auth) {
        fetch('http://localhost:3000/api/posts', {
            method: 'GET',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': `Bearer ${auth.token}`
                }
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            } else {
                return Promise.reject(error);
            }
        })
        .then((data) => {
            this.posts = data;
            console.log('this.posts :')
            console.log(this.posts);
            for(let post of data) {
                if(post.usersLiked.includes(auth.userId)) {
                    this.userLikes.push(post._id);
                }
            }
        })
        .catch((error) => { console.error('Error ' + error) });
    }
    

    // Create POST posts

    // Modify PUT posts

    // Delete DELETE posts

    // Like POST posts
}

export default PostService;