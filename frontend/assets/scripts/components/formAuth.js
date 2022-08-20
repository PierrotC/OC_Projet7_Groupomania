app.component('auth-form', {
    template:
    /* html */
    `
    <form class="auth-form flex-column" @submit.prevent="onSubmit">
        <label for="email">E-mail</label>
        <input id="email" v-model="email" />

        <label for="password">Mot de passe</label>
        <input id="password" v-model="password" />

        <input type="submit" class="button self-center" value="Valider" />
    </form>
    `,
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        onSubmit() {
            let userAuth = {
                email: this.email,
                password: this.password
            }
        }
    }
}) 