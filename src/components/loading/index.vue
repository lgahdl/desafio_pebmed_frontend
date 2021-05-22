<template>
  <div>
    <loading
      :active="loading"
      :can-cancel="false"
      :is-full-page="true"
    ></loading>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import {mapGetters} from 'vuex';


export default {
    components: {
        Loading
    },
    computed:{
      ...mapGetters(["loading", "tasksList"])
    }

}
</script>
