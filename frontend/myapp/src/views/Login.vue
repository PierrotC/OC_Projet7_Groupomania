<template>
    <div id="component_main">
        <h1>Connectez-vous</h1>

        <!-- <form class="auth-form flex-column" @submit.prevent="onSubmit">
            <label for="email">E-mail</label>
            <input type="email" id="email" v-model="email" />

            <label for="password">Mot de passe</label>
            <input type="password" id="password" v-model="password" />

            <input type="submit" class="button self-center" value="Valider" />
        </form> -->


        <form class="auth-form flex-column">
            <label for="email">E-mail</label>
            <input type="email" id="email"/>

            <label for="password">Mot de passe</label>
            <input type="password" id="password"/>

            <input type="submit" class="button self-center" value="Valider" />
        </form>

    </div>
</template>