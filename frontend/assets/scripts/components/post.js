app.component('post', {
    template:
    /* html */
    `
    <article v-for="post in posts" class="post" :key="post._id">
    <p class="content">
       {{ post.content }}
    </p>
    <div class="image" v-if="post.image">
    </div>
    <div class="buttons flex-row flex-center">
        <button
            v-if="userLikes.includes(post._id)"
            class="button"
            @click="likePost(post._id, -1)"
        >
            Je n'aime plus
        </button>
        <button
            v-else
            @click="likePost(post._id, 1)"
            class="button"
        >
            J'aime</button>
        <button class="button" v-show="this.userAuth.userId == post.userId || this.userAuth.isAdmin">Modifier</button>
        <button class="button" v-show="this.userAuth.userId == post.userId || this.userAuth.isAdmin">Supprimer</button>
        <div @likePost="" class="likes flex-row flex-center">
            <p class="youLike" v-if="userLikes.includes(post._id)">Vous aimez !</p>
            <p> {{ post.likes }} </p>
            <i class="fa-solid fa-thumbs-up"></i>
        </div>
        
    </div>
    <div class="admin flex-row">
        <h3>Admin</h3>
        <p>Posté par : </p>
        <a @click="toAccount(post.userId)">{{ post.userId }}</a>
    </div>
<!--    <div class="dev">
        {{ 'Identifié : ' + this.userAuth.userId + ' propriétaire : ' + post.userId }} <br />
        {{ 'Token : ' + this.userAuth.token }}
    </div> -->
</article>
    `,
    methods: {
        toAccount(id) {
            window.location.href = './account.html?id='.concat(id);
        },
        likePost(id, likeValue) {
            const url = `http://localhost:3000/api/posts/${id}/like`;
            const likeObject = {
                userId: this.userAuth.userId,
                like: likeValue
            };

            fetch(url, {
                method: 'POST',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${this.userAuth.token}`
                    },
                body: JSON.stringify(likeObject)
            })
            .then((res) => {
                if(res.ok) {
                    console.log('Like ok!');
                    if (likeValue === -1) {
                        this.userLikes.splice(this.userLikes.indexOf(id), 1);
                    } else if(likeValue === 1) {
                        this.userLikes.push(id);
                    }
                    // update value in DOM
                    let index = this.posts.findIndex(elt => elt._id === id)
                    this.posts[index].likes += likeValue;

                    return res.json();
                } else {
                    return Promise.reject(error);
                }
            })
            .catch((error) => { console.error('Error ! ' + error) });
        }
    },
    data() {
        return {
            posts: [],
            userLikes: [],
            userAuth: []
        }
    },
    computed: {
        // userAuth: JSON.parse(localStorage.getItem("userAuth"))
    },
    mounted() {
        let userAuth = JSON.parse(localStorage.getItem("userAuth"));

        fetch('http://localhost:3000/api/posts', {
            method: 'GET',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': `Bearer ${userAuth.token}`
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
            console.log('data');
            console.log(data);
            console.log(userAuth.userId);
            this.posts = data;
            for(post of data) {
                if(post.usersLiked.includes(userAuth.userId)) {
                    this.userLikes.push(post._id);
                }
            }
            this.userAuth = userAuth;
        })
        .catch((error) => { console.error('Error ' + error) });
    }
});