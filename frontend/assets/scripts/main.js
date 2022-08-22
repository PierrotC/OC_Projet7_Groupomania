const app = Vue.createApp({
    data() {
        return {

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
        }
    }
})