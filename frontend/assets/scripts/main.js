const app = Vue.createApp({
    data() {
        return {
            posts: []
        }
    },
    methods: {
        toSignup() {
            window.location.href = './pages/signup.html'
        },
        toIndex() {
            window.location.href = '../index.html'
        },
        toCreate() {
            window.location.href = './newpost.html'
        },
        toHome() {
            window.location.href = './home.html'
        },
        getPosts() {
            fetch('localhost:3000/api/posts', {
                method: 'GET',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    }
            })
            .then((res) => { if(res.ok) { return res.json() }})
            .then((data) => {
                this.posts = data.total;
                console.log(this.posts);
            })
            .catch((error) => { console.error('Error ' + error) });
        }
    }
})