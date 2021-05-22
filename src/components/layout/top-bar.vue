<template>
  <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="#4db4c7"
      dark
  >
    <v-app-bar-nav-icon @click.stop="setDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title style="width: 300px" class="ml-0 pl-2">
        <span class="hidden-sm-and-down">
          <v-img
              max-width="140px"
              contain
              :src="require('../../../assets/logo.png')"
          ></v-img>
        </span>
    </v-toolbar-title>
    <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Procurar"
        class="hidden-sm-and-down"
    ></v-text-field>
    <v-spacer></v-spacer>
    <!-- <v-btn icon>
         <v-icon>mdi-apps</v-icon>
     </v-btn> -->
    <v-btn icon>
      <v-badge color="error" overlap content="6">
        <v-icon>mdi-bell</v-icon>
      </v-badge>
    </v-btn>
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