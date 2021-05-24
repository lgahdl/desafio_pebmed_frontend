<template>
  <v-container class="lighten-5" fluid>
    <v-sheet v-if="!appointments">
      <v-skeleton-loader class="mx-auto mt-10" type="table"></v-skeleton-loader>
    </v-sheet>
    <v-card v-else>
      <v-toolbar dark color="#4db4c7" rounded>
        <v-toolbar-title class="pt-10 pr-10 pb-10 pl-1">
          <div class="text-wrap" style="min-width: 250px">
            Consultas
          </div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-data-table
          :headers="headers"
          :items="appointments"
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
            <v-btn color="#2DB4C5" dark fab class="mb-2" @click="newAppointment">
              <v-icon>mdi-plus</v-icon>
              <v-icon>mdi-calendar</v-icon>
            </v-btn>
          </v-toolbar>
          <AppointmentModal :showModal.sync="showModal"/>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editAppointment(item)"> mdi-pencil</v-icon>
          <v-icon small @click="deleteAppointment(item)"> mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import Swal from "sweetalert2";
import AppointmentModal from '../../components/appointments/modal';

export default {
  name: "appointments.vue",
  components: {AppointmentModal},
  data: () => ({
    showModal: false,
    search: "",
    headers: [
      {
        text: "Nº",
        align: "start",
        sortable: true,
        value: "appointment_id"
      },
      {
        text: "Nome do Paciente",
        align: "start",
        sortable: true,
        value: "patient.name",
      },
      {
        text: "Data da Consulta",
        align: "start",
        sortable: true,
        value: "date",
      },
      {
        text: "Hora da Consulta",
        align: "start",
        sortable: true,
        value: "time",
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
    this.$store.dispatch("findAllAppointments");
    this.$store.dispatch("findAllPatients");
    this.setSelectedAppointment({});
  },
  computed: {
    ...mapGetters(["appointments"])
  },
  methods: {
    ...mapActions(["findAllAppointments", "findAppointmentById", "saveAppointment", "editAppointment", "deleteAppointmentById", "setSelectedAppointment"]),
    deleteAppointment(item) {
      Swal.fire({
        icon: "warning",
        title: "Aviso",
        text: "Você deseja excluir esta Consulta?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.value) {
          this.deleteAppointmentById(item.appointment_id);
          Swal.fire("Sucesso!", "Consulta deletada!", "success");
        }
      });
    },
    editAppointment(appointment) {
      this.findAppointmentById(appointment.appointment_id);
      this.showModal = true;
    },
    newAppointment() {
      this.setSelectedAppointment({});
      this.showModal = true;
    }
  }

}
</script>

<style scoped>

</style>