<template>
  <div id="component_main">

  <h1>Accueil</h1>

    <NewPost />

    <article v-for="post in posts" class="post" :key="post._id">
      <p class="content">
          {{ post.content }}
      </p>
      <div class="image" v-if="post.imageUrl">
        <img :src="post.imageUrl" alt="" />
      </div>
      <div class="buttons flex-row flex-center">
        <!-- <button
            v-if="userLikes.includes(post._id)"
            class="button"
            >
            Je n'aime plus
        </button> -->
        <button
        class="button text">
          <p>J'aime</p>
          <i class="fa-solid fa-thumbs-up"></i>
        </button>

        <button
        class="button"
        v-show="this.userAuth.userId == post.userId || this.userAuth.isAdmin"
        >
          <p>Modifier</p>
          <i class="fa-solid fa-pen-fancy"></i>
        </button>

        <button
        class="button"
        v-show="this.userAuth.userId == post.userId || this.userAuth.isAdmin"
        >
          <p>Supprimer</p>
          <i class="fa-solid fa-trash-can"></i>
        </button>

          <div class="likes flex-row flex-center">
              <p> {{ post.likes }} </p>
              <i class="fa-solid fa-thumbs-up"></i>
          </div>
          
      </div>
      <div class="admin flex-row" v-show="userAuth.isAdmin">
          <h3>Admin</h3>
          <p>Posté par : </p>
          <a>{{ post.userId }}</a>
      </div>
      <!--    <div class="dev">
          {{ 'Identifié : ' + this.userAuth.userId + ' propriétaire : ' + post.userId }} <br />
          {{ 'Token : ' + this.userAuth.token }}
      </div> -->
    </article>

  </div>  
</template>

<script>
  import NewPost from '../components/NewPost.vue'

  import sourceData from '../../sourceData.json'
  export default {
    data() {
      return {
        posts: sourceData,
        userAuth: {
          userId: '62fe4d06170575b06e088753',
          isAdmin: false,
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmZlNGQwNjE3MDU3NWIwNmUwODg3NTMiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NjE0NTE4MzksImV4cCI6MTY2MTQ5NTAzOX0.71udKuajaWufjvbqhDhv9EaC1ZoaswwEB_6yHqkuz3o'
          }
      }
    },
    components: {
      NewPost
    }
  }
</script>