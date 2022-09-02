<template>
  <div id="component_main">

  <p>Bonjour {{ userAuth.userName }} !</p>

  <h1>Accueil</h1>

    <NewPost @post-added="updatePosts" />

    <div class="wrapper-posts flex-column flex-center" v-if="posts.length > 0">
      <article v-for="post in posts" class="post" :key="post._id" >

        <div class="postInfo flex-row">
          <h3 v-show="post.userName">{{ post.userName }} a posté :</h3>
          <p class="creation-date">
            {{
              `le ${ post.createdAt.getDate() }/${ post.createdAt.getMonth() + 1 }/${ post.createdAt.getFullYear() }
                à ${ post.createdAt.getHours() }h${ post.createdAt.getMinutes() }`
            }}
          </p>
        </div>

        <div class="editPost" v-if="post.editing">
          <form class="flex-column flex-center" @submit.prevent="onEditPost(post._id)">
            <label for="postContent">Modifier la publication</label>
            <textarea name="postContent" id="postContent" cols="150" rows="10" v-model="editedPost.post.content"></textarea>
            <input type="file" accept=".png, .jpg, .jpeg" id="file" name="image" @change="upload($event)" ref="fileupload" />
            <input type="submit" class="button" value="Publier">
            <button class="button" @click="post.editing = false">Annuler</button>
          </form>
        </div>

        <p class="content" v-else>
            {{ post.content }}
        </p>

        <div class="image" v-show="post.imageUrl">
          <img :src="post.imageUrl" alt="" />
        </div>

        <div class="buttons flex-row flex-center" v-if="!post.editing">
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
          @click="post.editing = true; this.editedPost.post = post"
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
            <p>Posté par : {{ post.userName + ' ( ' + post.userId + ' )' }}</p>
            <router-link :to="{ name: 'account', params: { id: post.userId }}" class="button">Accéder au compte</router-link>
        </div>
      </article>
    </div>
    <div v-else>Rien à afficher ! Soyez le.a premier.e à publier !</div>
  </div>  
</template>

<script>
  import NewPost from '../components/NewPost.vue'

  export default {
    data() {
      return {
        posts: [],
        userLikes: [],
        userAuth: [],
        error: '',
        editedPost: { post: {} }
      }
    },
    components: {
      NewPost,
      // ModifyPop
    },
    methods: {
       upload(event) {
            this.file = event.target.files[0];
        },
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
      updatePosts() {
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
            
            data.reverse();
            this.posts = data.map(post => ({
              ...post,
              createdAt: new Date(post.createdAt),
              editing: false
            }));
          
            for(let post of data) {
                if(post.usersLiked.includes(this.userAuth.userId)) {
                    this.userLikes.push(post._id);
                }
            }
        })
        .catch((error) => { console.error('Error ' + error) });
      },
      onEditPost(id) {

        // if ther's an image, create a formData, else a simple object
        // if (this.file) {
          let formData = new FormData();

          formData.append("post", JSON.stringify(this.editedPost.post));
          formData.append("image", this.file);

          fetch(`http://localhost:3000/api/posts/${id}`, {
            method: 'PUT',
            headers: { 
              'Accept': 'multipart/form-data',
              'authorization': `Bearer ${this.userAuth.token}`
              },
            body: formData
        })
        .then((res) => {
            if(res.ok) {
              this.updatePosts();
              this.editedPost = { post: {} };

              return res.json();
            } else {
              return Promise.reject(error);
            }
        })
        .catch((error) => { console.error('Error ' + error) });
      }
    },
    mounted() {
      this.userAuth = JSON.parse(localStorage.getItem("userAuth"));
      this.updatePosts()
    }
  }
</script>