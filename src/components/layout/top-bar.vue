<template>
  <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="#4db4c7"
      dark
  >
    <v-app-bar-nav-icon @click.stop="setDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title style="width: 300px; flex-direction: row; display:flex; align-items: center" class="ml-0 pl-2">
        <span class="hidden-sm-and-down">
          <v-img
              max-width="40px"
              contain
              :src="require('../../assets/logo.png')"
          ></v-img>
        </span>
      <span style="padding-left: 20px">
            CRMedic
         </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- <v-btn icon>
         <v-icon>mdi-apps</v-icon>
     </v-btn> -->
  </v-app-bar>
</template>

<script>

export default {
  props: {
    drawer: Boolean,
  },
  name: "TopBar.vue",
  methods: {
    setDrawer() {
      this.$emit("update:drawer", !this.drawer);
    }
  }
}
</script>

<style scoped>

</style>