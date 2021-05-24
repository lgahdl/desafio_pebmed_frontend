<template>
  <v-container class="lighten-5" fluid>
    <v-sheet v-if="!patients">
      <v-skeleton-loader class="mx-auto mt-10" type="table"></v-skeleton-loader>
    </v-sheet>
    <v-card v-else>
      <v-toolbar dark color="#4db4c7" rounded>
        <v-toolbar-title class="pt-10 pr-10 pb-10 pl-1">
          <div class="text-wrap" style="min-width: 250px">
            Pacientes
          </div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-data-table
          :headers="headers"
          :items="patients"
          :search="search"
          sort-by="name"
          class="pt-5"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Pesquisar"
                single-line
                hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="#2DB4C5" dark fab class="mb-2" @click="newPatient">
              <v-icon>mdi-plus</v-icon>
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </v-toolbar>
          <PatientModal :showModal.sync="showModal"/>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editPatient(item)"> mdi-pencil</v-icon>
          <v-icon small @click="deletePatient(item)"> mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import Swal from "sweetalert2";
import PatientModal from '../../components/patients/modal';

export default {
  name: "patients.vue",
  components: {PatientModal},
  data: () => ({
    showModal: false,
    search: "",
    headers: [
      {
        text: "Nº",
        align: "start",
        sortable: true,
        value: "patient_id"
      },
      {
        text: "Nome",
        align: "start",
        sortable: true,
        value: "name",
      },
      {
        text: "Gênero",
        align: "start",
        sortable: true,
        value: "gender",
      },
      {
        text: "Altura",
        align: "start",
        sortable: true,
        value: "height"
      },
      {
        text: "Peso",
        align: "start",
        sortable: true,
        value: "weight"
      },
      {
        text: "Data de Nascimento",
        align: "start",
        sortable: true,
        value: "birthday",
      },
      {
        text: "Ações",
        align: "start",
        sortable: false,
        value: "actions"
      }
    ]
  }),
  beforeMount() {
    this.$store.dispatch("findAllPatients");
    this.setSelectedPatient({});
  },
  computed: {
    ...mapGetters(["patients"])
  },
  methods: {
    ...mapActions(["findAllPatients", "findPatientById", "savePatient", "editPatient", "deletePatientById", "setSelectedPatient"]),
    deletePatient(item) {
      Swal.fire({
        icon: "warning",
        title: "Aviso",
        text: "Você deseja excluir este Paciente?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.value) {
          this.deletePatientById(item.patient_id);
          Swal.fire("Sucesso!", "Paciente deletado!", "success");
        }
      });
    },
    editPatient(patient) {
      this.findPatientById(patient.patient_id);
      this.showModal = true;
    },
    newPatient() {
      this.setSelectedPatient({});
      this.showModal = true;
    }
  }

}
</script>

<style scoped>

</style>