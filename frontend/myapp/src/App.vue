<template>

  <nav>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Se connecter</router-link>
    </div>
  </nav>

  <div class="container">
      <router-view/>
  </div>

</template>