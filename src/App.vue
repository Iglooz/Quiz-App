<template>
  <v-app>
    <v-app-bar
    app
    color="darkgrey"
    dark>
    <router-link v-bind:to="'/'">Home</router-link>
    </v-app-bar>
    <v-main class="main">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style>
.main {
  background-color: bisque;
}
</style>