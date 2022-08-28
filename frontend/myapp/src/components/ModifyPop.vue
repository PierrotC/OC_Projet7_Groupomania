<template>
    <div class="modifyPop">
        <form class="modifyPost flex-column flex-center">
            <label for="postContent">Modifier la publication</label>
            <textarea name="postContent" id="postContent" cols="150" rows="10" placeholder="Ecrivez votre texte ici"></textarea>
            <input type="submit" class="button" value="Publier">
        </form>
    </div>
</template>

<script>

export default ({
    props: {
        posts: {
            type: Array,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    methods: {

    }
})
</script>
