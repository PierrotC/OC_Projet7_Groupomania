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
            window.location.href = './editpost.html'
        },
        toAccount(id) {
            window.location.href = './account.html?id='.concat(id);
        },
        toHome() {
            window.location.href = './home.html'
        }
    }
})