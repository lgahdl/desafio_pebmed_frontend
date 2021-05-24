<template>
  <v-main>
    <router-view/>
    <v-container v-show="false" v-if="errorModal">
      <ErrorModal/>
    </v-container>
  </v-main>
</template>
<script>
import {mapGetters} from "vuex";
import ErrorModal from "../error/modal";

export default {
  name: "MainContent",
  components: {ErrorModal},
  computed: {
    ...mapGetters(["errorModal"]),
  },
};
</script>

<style scoped>
</style>