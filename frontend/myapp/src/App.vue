<template>
  <div id="main">
   
  <header  class="header">

    <div class="logo">
      <img src="./assets/logo/rsz_icon-left-font.png" alt="Logo de l'entreprise Groupomania" />
    </div>

    <h1>Le réseau social de votre entreprise</h1>

    <div class="header-buttons">
        <button class="header-buttons__account button" id="signup-page-btn" >S'inscrire</button>
    </div>

    <nav>
      <router-link to="/" class="">Home</router-link>
      <router-link to="/login">Se connecter</router-link>
      <router-link to="/signup">Créer un compte</router-link>
      <router-link to="/account">Compte</router-link>
    </nav>
  </header>
    

  <div class="container">
      <router-view/>
  </div>

  </div>
</template>