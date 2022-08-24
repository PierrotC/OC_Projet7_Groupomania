const app = Vue.createApp({
    data() {
        return {
            posts: [],
            user: {}
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
            
        }
    }
})