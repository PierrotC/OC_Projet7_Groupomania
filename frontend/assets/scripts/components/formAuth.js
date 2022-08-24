app.component('auth-form', {
    template:
    /* html */
    `
    <form class="auth-form flex-column" @submit.prevent="onSubmit">
        <label for="email">E-mail</label>
        <input type="email" id="email" v-model="email" />

        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="password" />

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

            const pageURL = window.location.href.split('/');
            const loc = pageURL[pageURL.length - 1];
            
            if (loc === 'index.html') {
                fetch('http://localhost:3000/api/auth/login', {
                    method: "POST",
                    headers: { 
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(userAuth)
                })
                .then((res) => {
                    if(res.ok) {
                        return res.json()
                    } else {
                        return Promise.reject(error);
                    }})
                .then((userData) => {
                    window.location.href = './pages/home.html'
                    console.log('ok!');
                    const user = {
                        ...userData
                    }
                    localStorage.setItem("userAuth", JSON.stringify(user));
                    console.log(user);
                })
                .catch((error) => {
                    alert('Identifiants incorrects !');
                });
            } else if (loc === 'signup.html') {
                console.log('Signing up!');
                fetch('http://localhost:3000/api/auth/signup', {
                    method: "POST",
                    headers: { 
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(userAuth)
                })
                .then(res => {
                    if(res.ok) { return res.json() }
                    else {
                        return Promise.reject(error);
                    }
                })
                .then((userData) => {
                    window.location.href = './pages/home.html'
                    console.log('ok!');
                    const user = {
                        ...userData
                    };
                    localStorage.setItem("userAuth", JSON.stringify(user));
                })
                .catch((error) => { console.error('Erreur' + error) });
            }
            
            this.email = ''
            this.password = ''

        }
    }
}) 