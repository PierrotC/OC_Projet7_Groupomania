<template>
  <div id="main">

    <nav>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Se connecter</router-link>
        <router-link to="/signup">Créer un compte</router-link>
        <router-link to="/account">Compte</router-link>
        <router-link to="/editpost">Créer une publication</router-link>
      </div>
    </nav>

    <div class="container">
        <router-view/>
    </div>

  </div>
</template>