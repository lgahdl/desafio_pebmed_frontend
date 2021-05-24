<template>
  <v-app id="inspire">
    <nav-drawer/>
    <Content></Content>
  </v-app>
</template>

<script>
import NavDrawer from "./nav-drawer";
import Content from "./content";

export default {
  name: "Layout",
  components: {Content, NavDrawer}
}
</script>

<style scoped>

</style>