<template>

    <!-- <form class="auth-form flex-column" @submit.prevent="onSubmit">
        <label for="email">E-mail</label>
        <input type="email" id="email" v-model="email" />

        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="password" />

        <input type="submit" class="button self-center" value="Valider" />
    </form> -->

    <div id="main">
        <form class="auth-form flex-column">
            <label for="email">E-mail</label>
            <input type="email" id="email"/>

            <label for="password">Mot de passe</label>
            <input type="password" id="password"/>

            <input type="submit" class="button self-center" value="Valider" />
        </form>
    </div>
</template>