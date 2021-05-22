<template>
  <div/>
</template>
<script>
import {mapGetters} from "vuex";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  name: "geral",

  data: () => ({}),
  mounted() {
    if (this.$store.getters.errorModal) {
      Swal.fire({
        icon: "error",
        title: "Ocorreu um Erro!",
        text: this.$store.getters.errorMessage ? this.$store.getters.errorMessage : this.$store.getters.error.errorMessage,
        showCancelButton: false,
        showCloseButton: !!this.$store.getters.error,
        closeButtonHtml: '<span style="color:#F6F6F6; cursor: default; width:100%;">?</span>',
        confirmButtonColor: "#FC696C",
        confirmButtonText: "Ok",
      })
    }
  },
  computed: {
    ...mapGetters(["errorModal", "errorMessage"]),
  },
};
</script>