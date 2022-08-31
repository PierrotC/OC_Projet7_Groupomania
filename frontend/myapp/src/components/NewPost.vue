<template>
    <form class="newPost flex-column flex-center" @submit.prevent="onNewPost()">
        <label for="postContent">Nouvelle publication</label>
        <textarea name="postContent" id="postContent" cols="150" rows="10" placeholder="Ecrivez votre texte ici" v-model="newPost.post.content" ></textarea>

        <label for="file">Ajouter une image (png, jpg, jpeg)</label>
        <input type="file" accept=".png, .jpg, .jpeg" id="file" name="image" @change="upload($event)" ref="fileupload" />

        <input type="submit" class="button" value="Publier">
    </form>
</template>

<script>

export default ({
    data() {
        return {
            userAuth: {},
            newPost: {
                post: {
                    content: '',
                    userName: '',
                    createdAt: ''
                }
            },
            file: {},
        }
    },
    methods: {
        upload(event) {
            this.file = event.target.files[0];
        },
        onNewPost() {
            const url = `http://localhost:3000/api/posts/`;

            this.newPost.post.createdAt = '';

            let formData = new FormData();

            formData.append("post", JSON.stringify(this.newPost.post));
            formData.append("image", this.file);

            fetch(url, {
                method: 'POST',
                headers: { 
                    'Accept': 'multipart/form-data',
                    'authorization': `Bearer ${this.userAuth.token}`
                    },
                body: formData
            })
            .then(res => {if(res.ok) {
                // update DOM
                this.$emit('post-added');

                // reset data
                this.newPost.post.content = '';
                this.file = '';
                this.$refs.fileupload.value=null;

                return res.json();
            } else {
                return Promise.reject(error);
            }
            })
            .catch((error) => { console.error('Error ' + error) });
      }
    },
    created() {
        this.userAuth = JSON.parse(localStorage.getItem("userAuth"));
        this.newPost.post.userName = this.userAuth.userName;
    }
})
</script>
