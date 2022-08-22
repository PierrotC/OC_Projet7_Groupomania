const url = 'http://localhost:3000/api/posts/'

class postRequests {
    // Get all
    static getPosts() {
        return new Promise(async (resolve, reject) => {
            fetch('localhost:3000/api/posts', {
                method: 'GET',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    }
            })
            .then((res) => { if(res.ok) { return res.json() }})
            .then((data) => {
                return data.map(post => ({
                    ...post
                    // createdAt: new Date(post.createdAt)
                }))
            })
            .catch((error) => {
                console.error('Error ' + error);
                return error;
            });
        })
    }

    // Modify

    // Create
    
    // Like

    // Delete
}