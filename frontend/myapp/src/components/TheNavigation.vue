<template>

<header class="header">

    <div class="logo">
      <img src="../../public/images/rsz_icon-left-font.png" alt="Logo de l'entreprise Groupomania" />
    </div>

    <h1>Le réseau social de votre entreprise</h1>

    <!-- <div class="header-buttons">
        <button class="header-buttons__account button" id="signup-page-btn" >S'inscrire</button>
    </div> -->

    <nav class="header-buttons">
      <router-link to="/home" class="button">Accueil</router-link>
      <router-link to="/" class="button">Se connecter</router-link>
      <router-link to="/signup" class="button">Créer un compte</router-link>
      <router-link to="/account" class="button">Compte</router-link>
      <router-link to="/" class="button">Se déconnecter</router-link>
    </nav>
  </header>

</template>
