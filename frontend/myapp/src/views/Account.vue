<template>
    <div id="component_main">

        <h1>Votre compte : {{ account.userName }}</h1>

        <div class="admin flex-row" v-show="userAuth.isAdmin">
            <p>
                Admin : <br />
                Compte de {{ account.userName + ' ( ' + accountId + ' )' }}
            </p>
        </div>

        <div class="modifyAccount flex-column flex-center">
            <h2>Modifier votre compte</h2>

            <form class="auth-form flex-column flex-center" @submit.prevent="onModifyAccount">
                <label for="userName">Nom d'utilisateur</label>
                <input type="text" id="userName" v-model="account.userName" />

                <label for="email">E-mail</label>
                <input type="email" id="email" v-model="account.email" />

                <label for="password">Mot de passe</label>
                <input type="password" id="password" v-model="account.password" />

                <input type="submit" class="button" value="Valider" />
            </form>
        </div>

        <div class="separator"></div>

        <div class="deleteAccount flex-center flex-column">
            <h2>Supprimer votre compte</h2>
            <button class="button" @click="onDeleteAccount">Supprimer</button>
        </div>

    </div>
</template>

<script>

export default ({
    data() {
      return {
        userAuth: {},
        account: {
            password: ''
        }
      }
    },
    methods: {
        onDeleteAccount() {
            fetch(`http://localhost:3000/api/auth/${this.accountId}`, {
                method: "DELETE",
                headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json',
                'authorization': `Bearer ${this.userAuth.token}`
                }
            })
            .then(res => {
                if(res.ok) { return res.json() }
                else {
                    return Promise.reject(error);
                }
            })
            .then(() => {
                if(this.userAuth.isAdmin) {
                    this.$router.push('/home');
                } else {
                    this.$router.push('/');
                    localStorage.clear();
                }
            })
            .catch((error) => { console.error('Erreur' + error) });
        },
        onModifyAccount() {
            fetch(`http://localhost:3000/api/auth/${this.accountId}`, {
                method: "PUT",
                headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json',
                'authorization': `Bearer ${this.userAuth.token}`
                },
                body: JSON.stringify(this.account)
            })
            .then(res => {
                if(res.ok) {
                    this.userAuth.userName = this.account.userName;
                    localStorage.setItem('userAuth', JSON.stringify(this.userAuth));
                    window.alert('Votre compte a bien été modifié !')
                    return res.json()
                    }
                else {
                    return Promise.reject(error);
                }
            })
            .catch((error) => { console.error('Erreur' + error) });
        }
    },
    computed: {
        accountId() {
            return this.$route.params.id;
        },
        // account() {
        //     console.log(sourceData.users.find(acc => acc._id === this.accountId)._id);
        //     return sourceData.users.find(acc => acc._id === this.accountId);
        // }
    },
    created() {
        this.userAuth = JSON.parse(localStorage.getItem("userAuth"));
    },
    mounted() {
        fetch(`http://localhost:3000/api/auth/${this.accountId}`, {
                method: "GET",
                headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json',
                'authorization': `Bearer ${this.userAuth.token}`
                }
            })
            .then(res => {
                if(res.ok) { return res.json() }
                else if(res.status == 404) {
                    window.alert('Ce compte n\'existe pas ou plus !')
                    this.$router.push('/home');
                }
                else {
                    return Promise.reject(error);
                }
            })
            .then((user) => {
                this.account = {
                    userName: user.userName,
                    email: user.email,
                    userId: user._id
                };
            })
            .catch((error) => { console.error('Erreur' + error) });
    }
})
</script>
