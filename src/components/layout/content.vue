<template>
  <v-main>
    <router-view/>
    <v-container v-show="false" v-if="errorModal">
      <ErrorModal/>
    </v-container>
    <LoadingOverlay/>
  </v-main>
</template>
<script>
import {mapGetters} from "vuex";
import ErrorModal from "../error/modal";
import LoadingOverlay from '../loading';

export default {
  name: "MainContent",
  components: {ErrorModal, LoadingOverlay},
  computed: {
    ...mapGetters(["errorModal"]),
  },
};
</script>

<style scoped>
</style>