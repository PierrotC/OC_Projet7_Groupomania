<template>
  <div id="component_main">

  <h1>Accueil</h1>

    <NewPost />

    <article v-for="post in posts" class="post" :key="post._id">

      <div class="modifyPop" v-if="this.modifying">
        <form class="modifyPost flex-column flex-center">
            <label for="postContent">Modifier la publication</label>
            <textarea name="postContent" id="postContent" cols="150" rows="10" placeholder="Ecrivez votre texte ici"></textarea>
            <input type="submit" class="button" value="Publier">
        </form>
      </div>

      <p class="content" v-else>
          {{ post.content }}
      </p>

      <div class="image" v-show="post.imageUrl">
        <img :src="post.imageUrl" alt="" />
      </div>

      <div class="buttons flex-row flex-center">
        <button
          v-if="userLikes.includes(post._id)"
          class="button"
          @click="onLikePost(post._id, -1)"
        >
          Je n'aime plus
        </button>

      <button
        v-else
        class="button text"
        @click="onLikePost(post._id, 1)"
      >
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
        @click="onDelete(post._id)"
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
          <p>Posté par : {{ post.userId }}</p>
          <router-link :to="{ name: 'account', params: { id: post.userId }}" class="button">Accéder au compte</router-link>
      </div>
      <!-- <ModifyPop v-show="modifyPop" /> -->
      <!--    <div class="dev">
          {{ 'Identifié : ' + this.userAuth.userId + ' propriétaire : ' + post.userId }} <br />
          {{ 'Token : ' + this.userAuth.token }}
      </div> -->
    </article>

  </div>  
</template>

<script>
  import NewPost from '../components/NewPost.vue'
  // import ModifyPop from '../component/ModifyPop.vue'
  // import PostService from '../PostService'

  export default {
    data() {
      return {
        posts: [],
        userLikes: [],
        userAuth: [],
        error: '',
        modifying: false
      }
    },
    components: {
      NewPost,
      // ModifyPop
    },
    methods: {
      onLikePost(id, likeValue) {
        const url = `http://localhost:3000/api/posts/${id}/like`;
        const likeObject = {
            userId: this.userAuth.userId,
            like: likeValue
        };

        fetch(url, {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': `Bearer ${this.userAuth.token}`
                },
            body: JSON.stringify(likeObject)
        })
        .then((res) => {
          if(res.ok) {
              if (likeValue === -1) {
                  this.userLikes.splice(this.userLikes.indexOf(id), 1);
              } else if(likeValue === 1) {
                  this.userLikes.push(id);
              }
              // update value in DOM
              let index = this.posts.findIndex(elt => elt._id === id)
              this.posts[index].likes += likeValue;

              return res.json();
          } else {
              return Promise.reject(error);
          }
        })
        .catch((error) => { console.error('Error ! ' + error) });
      },

      onDelete(id) {
          const url = `http://localhost:3000/api/posts/${id}/`;
          fetch(url, {
              method: 'DELETE',
              headers: { 
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'authorization': `Bearer ${this.userAuth.token}`
                  }
          })
          .then(res => {if(res.ok) {
              // update DOM
              let index = this.posts.findIndex(elt => elt._id === id)
              this.posts.splice(index, 1);
              return res.json();
          } else {
              return Promise.reject(error);
          }
          })
          .catch((error) => { console.error('Error ' + error) });
      },
      onmodifyPost() {
        this.modifying = true;
      }
    },
    mounted() {
      this.userAuth = JSON.parse(localStorage.getItem("userAuth"));

      fetch('http://localhost:3000/api/posts', {
            method: 'GET',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': `Bearer ${this.userAuth.token}`
                }
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            } else {
                return Promise.reject(error);
            }
        })
        .then((data) => {
            this.posts = data;
            for(let post of data) {
                if(post.usersLiked.includes(this.userAuth.userId)) {
                    this.userLikes.push(post._id);
                }
            }
        })
        .catch((error) => { console.error('Error ' + error) });
    }
  }
</script>