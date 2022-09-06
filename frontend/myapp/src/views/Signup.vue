<template>
    <div id="component_main">

        <h1>Créez un compte</h1>

        <form class="auth-form flex-column" @submit.prevent="signup">

            <label for="userName">Nom d'utilisateur</label>
            <input type="text" id="userName" v-model="signupForm.userName" required />

            <label for="email">E-mail</label>
            <input type="email" id="email" v-model="signupForm.email" required />

            <label for="password">Mot de passe</label>
            <input type="password" id="password" v-model="signupForm.password" required />

            <input type="submit" class="button self-center" value="Valider" />

        </form>

    </div>
</template>

<script>

export default ({
    data() {
        return {
            signupForm: {
                email: '',
                password: '',
                userName: ''
            }
        }
    },
    methods: {
        signup() {
            fetch('http://localhost:3000/api/auth/signup', {
                method: "POST",
                headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json' 
                },
                body: JSON.stringify(this.signupForm)
            })
            .then(res => {
                if(res.ok) { return res.json() }
                else {
                    return Promise.reject(error);
                }
            })
            .then(() => {
                window.alert('Votre compte a bien été créé ! Veuillez vous connecter.')
                this.$router.push('/');
            })
            .catch((error) => { console.error('Erreur' + error) });
        }
    }
})
</script>
