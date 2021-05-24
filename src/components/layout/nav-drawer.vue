<template>
  <section>
    <TopBar :drawer.sync="drawer"/>
    <v-navigation-drawer
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
    >
      <v-list>
        <template v-for="item in items">
          <v-list-item v-bind:key="item.description" link :to="item.route">
            <v-list-item-action
                style="margin-right: 8px !important"
                v-if="item.icon"
            >
              <v-icon style="padding-right:40px">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title>{{ item.description }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </section>
</template>
<script>
import TopBar from "./top-bar.vue";
import {mapGetters} from 'vuex';

export default {
  components: {TopBar},
  data: () => ({
    drawer: false,
    items: [{
      description: "Pacientes",
      icon: "mdi-account-multiple",
      route: "/patients",
    }, {
      description: "Consultas",
      icon: "mdi-calendar",
      route: "/appointments",
    }]
  }),
  computed: {
    ...mapGetters(["menu"])
  },
}
</script>
<style scoped>
</style>