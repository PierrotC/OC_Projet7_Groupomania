<template>
    <form class="newPost flex-column flex-center" @submit.prevent="onNewPost">
        <label for="postContent">Nouvelle publication</label>
        <textarea name="postContent" id="postContent" cols="150" rows="10" placeholder="Ecrivez votre texte ici" v-model="newPost.content"></textarea>
        <input type="submit" class="button" value="Publier">
    </form>
</template>

<script>

export default ({
    data() {
        return {
            newPost: {
                content: ''
            },
            userAuth: {}
        }
    },
    methods: {
        onNewPost() {
            this.userAuth = JSON.parse(localStorage.getItem("userAuth"));
            const url = `http://localhost:3000/api/posts/`;
            const newP = JSON.stringify(this.newPost);
            console.log(newP);
            fetch(url, {
                method: 'POST',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${this.userAuth.token}`
                    },
                body: newP
            })
            .then(res => {if(res.ok) {
                // update DOM
                //   this.$emit('post-added');
                console.log('ok')
                return res.json();
            } else {
                return Promise.reject(error);
            }
            })
            .catch((error) => { console.error('Error ' + error) });
      }
    }
})
</script>
