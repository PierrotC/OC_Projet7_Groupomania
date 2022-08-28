<template>
    <div id="component_main">
        <h1>Connectez-vous</h1>

        <!-- <form class="auth-form flex-column" @submit.prevent="onSubmit">
            <label for="email">E-mail</label>
            <input type="email" id="email" v-model="email" />

            <label for="password">Mot de passe</label>
            <input type="password" id="password" v-model="password" />

            <input type="submit" class="button self-center" value="Valider" />
        </form> -->


        <form class="auth-form flex-column" @submit.prevent="login()">
            <label for="email">E-mail</label>
            <input type="email" id="email" v-model="authForm.email"/>

            <label for="password">Mot de passe</label>
            <input type="password" id="password" v-model="authForm.password" />

            <input type="submit" class="button self-center" value="Valider" />
        </form>

    </div>
</template>

<script>

export default ({
    data() {
        return {
            authForm: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            fetch(`http://localhost:3000/api/auth/login`, {
                method: "POST",
                headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(this.authForm)
            })
            .then((res) => {
                if(res.ok) {
                    return res.json()
                } else {
                    return Promise.reject(error);
                }})
            .then((userData) => {
                console.log('Login userData :')
                console.log(userData);
                const user = {
                    ...userData
                }
                localStorage.setItem("userAuth", JSON.stringify(user));
                this.$router.push('home');
            })
            .catch((error) => {
                alert('Identifiants incorrects !');
            })
            }
    },
})
</script>
