<template>

<header class="header">

    <div class="logo">
      <img src="../../public/images/rsz_icon-left-font.png" alt="Logo de l'entreprise Groupomania" />
    </div>

    <h1>Le réseau social de votre entreprise</h1>

    <nav class="header-buttons">
      <router-link to="/home" class="button" v-show="userAuth.token">Accueil</router-link>
      <router-link to="/" class="button" v-show="!userAuth.token">Se connecter</router-link>
      <router-link to="/signup" class="button" v-show="!userAuth.token">Créer un compte</router-link>
      
      <router-link :to="{ name: 'account', params: { id: userAuth.userId }}" class="button" v-show="userAuth.token">Compte</router-link>

      <router-link to="/" class="button" @click="logout" v-show="userAuth.token">Se déconnecter</router-link>
    </nav>
  </header>

</template>

<script>

export default ({
  data() {
    return {
      userAuth: {userId: '/'},
      location: ''
    }
  },
  created() {
    if(localStorage.length) {
      this.userAuth = JSON.parse(localStorage.getItem("userAuth"));
    }
    const loc = window.location.href.split('/');
    this.location = loc[loc.length - 1];
    // let test = this.location;
    // console.log(test);

  },
  methods: {
    logout() {
      localStorage.clear();
    }
  }
})
</script>

