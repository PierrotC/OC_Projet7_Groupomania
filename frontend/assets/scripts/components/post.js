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
            @click="likePost(post._id, 0)"
        >
            Je n'aime plus
        </button>
        <button
            v-else
            @click="likePost(post._id, 1)"
            class="button"
        >
            J'aime</button>
        <button class="button" v-show="this.userAuth.userId == post.userId">Modifier</button>
        <button class="button" v-show="this.userAuth.userId == post.userId">Supprimer</button>
        <div class="likes flex-row flex-center">
            <p class="youLike" v-if="userLikes.includes(post._id)">Vous aimez !</p>
            <p> {{ post.likes }} </p>
            <i class="fa-solid fa-thumbs-up"></i>
        </div>
        
    </div>
    <div class="dev">
        {{ 'Identifié : ' + this.userAuth.userId + ' propriétaire : ' + post.userId }} <br />
        {{ 'Token : ' + this.userAuth.token }}
    </div>
</article>
    `,
    methods: {
        likePost(id, likeValue) {
            console.log(id);
            const url = `http://localhost:3000/api/posts/${id}/like`;
            console.log(url);
            console.log(likeValue);
            fetch(`localhost:3000/api/posts/${id}/like`, {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': `Bearer ${this.userAuth.token}`
                },
            body: {
                userId: this.userAuth.userId,
                like: likeValue
            }
            })
            .then((res) => {
                if(res.ok) {
                    console.log('Like ok!');
                    this.userLikes.split(indexof(id), 1);
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