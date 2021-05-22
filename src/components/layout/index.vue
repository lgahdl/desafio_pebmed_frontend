<template>
  <v-app id="inspire">
    <v-app id="inspire">
      <nav-drawer></nav-drawer>
      <content></content>
    </v-app>
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