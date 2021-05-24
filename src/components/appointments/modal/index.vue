<template>
  <v-dialog
      v-model="showModal"
      fullscreen
      @click:outside="close"
      transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="#4db4c7" flat>
        <v-toolbar-title color="#4db4c5">{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <ValidationObserver v-slot="{handleSubmit}">
        <v-container>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4" v-show="false">
                <FormText
                    v-model="selectedAppointment.appointment_id"
                    disabled
                    :label="'appointment_id'"
                    :name="'appointment_id'"
                ></FormText>
              </v-col>
              <v-col cols="12" md="4">
                <FormDatePicker
                    v-model="selectedAppointment.date"
                    label="Data da Consulta"
                    name="Data da Consulta"
                    rules="required"
                >
                </FormDatePicker>
              </v-col>
              <v-col cols="12" md="4">
                <FormTimePicker
                    v-model="selectedAppointment.time"
                    label="Hora da Consulta"
                    name="Hora da Consulta"
                    rules="required"
                >
                </FormTimePicker>
              </v-col>
              <v-col cols="12" md="4">
                <FormSelect
                    v-model="selectedAppointment.patient_id"
                    name="Paciente"
                    label="Paciente"
                    rules="required"
                    :items="patients"
                    item-value="patient_id"
                    item-text="name"
                    :return-object="false"
                ></FormSelect>
              </v-col>
              <v-col cols="12">
                <FormTextArea
                    v-model="selectedAppointment.annotations"
                    label="Anotações"
                    name="Anotações"
                ></FormTextArea>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#f16869" class="white--text" @click="close"
              >Cancelar
              </v-btn
              >
              <v-btn
                  color="#4db4c7"
                  class="white--text"
                  @click="handleSubmit(save)"
              >Salvar
              </v-btn
              >
            </v-card-actions>
          </v-card-text>
        </v-container>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script>
import Swal from "sweetalert2";
import {mapGetters, mapActions} from 'vuex';

export default {
  name: "index",
  props: {
    showModal: {
      default: false,
    }
  },
  computed: {
    ...mapGetters(['selectedAppointment', 'patients']),
    title() {
      return this.selectedAppointment.appointment_id ? "Editar Consulta" : "Nova Consulta";
    }
  },
  methods: {
    ...mapActions(['editAppointment', 'saveAppointment', 'setSelectedAppointment']),
    close() {
      this.$emit("update:showModal", false);
    },
    save() {
      if (this.selectedAppointment.appointment_id) {
        this.editAppointment({
          id: this.selectedAppointment.appointment_id,
          appointment: this.selectedAppointment
        }).then(() => {
          Swal.fire("Sucesso!", "Consulta alterada", "success");
          this.close()
        })
      } else {
        this.saveAppointment(this.selectedAppointment).then(() => {
          Swal.fire("Sucesso!", "Consulta criada", "success");
          this.close();
        })
      }
    }
  }
}
</script>

<style scoped>

</style>