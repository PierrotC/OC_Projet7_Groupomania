app.component('account', {
    template:
    /* html */
    `
    <div class="delete-account">
        <h2>Supprimez votre compte</h2>
        <button class="button" @click="deleteAccount(userAuth.userId)">Supprimer le compte</button>
    </div>
    
    <div class="modify-account"></div>
        <h2>Modifiez vos informations</h2>
        <form class="auth-form flex-column" @submit.prevent="modifyAccount(userAuth.userId)">
            <label for="email">E-mail</label>
            <input type="email" id="email" v-model="email" />

            <label for="password">Mot de passe</label>
            <input type="password" id="password" v-model="password" />

            <input type="submit" class="button self-center" value="Valider" />
        </form>
    </div>
    `,
    methods: {
        modifyAccount(id) {
            fetch(`localhost:3000/api/users/${id}/like`, {
            method: 'PUT',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': `Bearer ${this.userAuth.token}`
                },
            body: {
                email: this.userAuth.userId,
                password: likeValue
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
        },
        deleteAccount(id) {
            fetch(`localhost:3000/api/users/${id}`, {
                method: 'DELETE',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${this.userAuth.token}`
                    }
            })
        }
    },
    mounted() {
        const userAuth = JSON.parse(localStorage.getItem("userAuth"));
        return userAuth;
    }
})