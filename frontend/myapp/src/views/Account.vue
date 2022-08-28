<template>
    <div id="component_main">

        <h1>Votre compte : {{ account._id }}</h1>

        <div class="admin flex-row" v-show="userAuth.isAdmin">
            <p>Admin :</p> <br />
            Compte de {{ $route.params.id }}
        </div>

        <div class="modifyAccount flex-column flex-center">
            <h2>Modifier votre compte</h2>
            <form class="auth-form flex-column flex-center">
                <label for="email">E-mail</label>
                <input type="email" id="email" :value="`${account.email}`" />

                <label for="password">Mot de passe</label>
                <input type="password" id="password" />

                <input type="submit" class="button" value="Valider" />
            </form>
        </div>
        <div class="separator"></div>
        <div class="deleteAccount flex-center flex-column">
            <h2>Supprimer votre compte</h2>
            <button class="button">Supprimer</button>
        </div>

    </div>
</template>

<script>
import sourceData from '../../sourceData.json'

export default ({
    data() {
      return {
        userAuth: {
          userId: '62fe4d06170575b06e088753',
          isAdmin: true,
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmZlNGQwNjE3MDU3NWIwNmUwODg3NTMiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NjE0NTE4MzksImV4cCI6MTY2MTQ5NTAzOX0.71udKuajaWufjvbqhDhv9EaC1ZoaswwEB_6yHqkuz3o'
        }
      }
    },
    computed: {
        accountId() {
            return this.$route.params.id;
        },
        account() {
            console.log(sourceData.users.find(acc => acc._id === this.accountId)._id);
            return sourceData.users.find(acc => acc._id === this.accountId);
        }
    }
})
</script>
