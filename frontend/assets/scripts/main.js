const app = Vue.createApp({
    data() {
        return {

        }
    },
    methods: {
        toSignup() {
            window.location.href = './pages/signup.html'
        },
        toHome() {
            window.location.href = '../index.html'
        }
    }
})