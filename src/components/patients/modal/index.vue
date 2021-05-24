<template>
  <v-dialog
      v-model="showModal"
      fullscreen
      @click:outside="close"
      transition="dialog-bottom-transition"
  >
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
            <v-tabs align-with-title color="#4db4c7">
              <v-tab>
                Informações Gerais
              </v-tab>
              <v-tab>
                Consultas
              </v-tab>
              <v-tab-item>
                <v-card flat class="mt-5">
                  <v-container>
                    <!--                    Informações Gerais-->
                    <v-row>
                      <v-col cols="12" sm="6" md="4" v-show="false">
                        <FormText
                            v-model="selectedPatient.patient_id"
                            disabled
                            :label="'patient_id'"
                            :name="'patient_id'"
                        ></FormText>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <FormText
                            icon="mdi-account"
                            v-model="selectedPatient.name"
                            label="Nome"
                            type="text"
                            rules="required"
                            :name="'Nome do Paciente'"
                        >
                        </FormText>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <FormSelect
                            v-model="selectedPatient.gender"
                            :items="genders"
                            item-text="value"
                            item-value="value"
                            label="Gênero"
                            :return-object="false"
                            :name="'gender'"
                            :rules="'required'"
                        >
                        </FormSelect>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <FormText
                            v-model="selectedPatient.height"
                            type="number"
                            step=".01"
                            rules="required"
                            label="Altura"
                            :name="'Altura'"
                            :handle-blur="heightBlurHandler"
                        >
                        </FormText>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <FormText
                            v-model="selectedPatient.weight"
                            type="text"
                            rules="required"
                            label="Peso"
                            :handle-blur="weightBlurHandler"
                        >
                        </FormText>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <FormText
                            v-model="selectedPatient.phone_number"
                            name="Número de telefone"
                            mask="(##)##########"
                            type="text"
                            rules="required"
                            label="Número de telefone"
                        >
                        </FormText>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <FormDatePicker
                            icon="mdi-calendar-month"
                            v-model="selectedPatient.birthday"
                            rules="required"
                            label="Data de Nascimento"
                            name="Data de Nascimento"
                        >
                        </FormDatePicker>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat class="mt-5">
                  <v-card-text>
                    <v-data-table
                        :headers="appointmentsHeaders"
                        :items="selectedPatient.appointments"
                        :search="appointmentSearch"
                        sort-by="date"
                        class="pt-5"
                    >
                      <template v-slot:top>
                        <v-toolbar flat color="white">
                          <v-text-field
                              v-model="appointmentSearch"
                              append-icon="mdi-magnify"
                              label="Pesquisar"
                              single-line
                              hide-details
                          ></v-text-field>
                        </v-toolbar>
                      </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
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
  name: "index.vue",
  props: {
    showModal: {
      default: false,
    },
  },
  data: () => ({
    heightHandler: 0,
    weightHandler: 0,
    appointmentSearch: "",
    appointmentsHeaders: [
      {
        text: "Nº",
        align: "start",
        sortable: true,
        value: "appointment_id"
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
        value: "time"
      }
    ]
  }),
  computed: {
    ...mapGetters(["selectedPatient"]),
    title() {
      return !this.selectedPatient.patient_id ? "Novo Paciente" : "Editar Paciente"
    },
    genders() {
      return [
        {
          value: "Masculino"
        },
        {
          value: "Feminino"
        },
        {
          value: "Outros"
        }
      ]
    },
    height: {
      set: function (value) {
        value = Number(value).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        this.selectedPatient.height = value;
        this.setSelectedPatient(this.selectedPatient);
        this.heightHandler = value;
      },
      get: function () {
        return this.heightHandler;
      }
    },
    weight: {
      set: function (value) {
        value = Number(value).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        this.selectedPatient.weight = value;
        this.setSelectedPatient(this.selectedPatient);
        this.weightHandler = value;
      },
      get: function () {
        return this.weightHandler;
      }
    }
  },
  methods: {
    ...mapActions(["savePatient", "editPatient", "setSelectedPatient"]),
    heightBlurHandler(value) {
      this.selectedPatient.height = Number(value / 100).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    },
    weightBlurHandler(value) {
      this.selectedPatient.weight = Number(value / 10).toLocaleString("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      })
    },
    close() {
      this.$emit("update:showModal", false);
    },
    save() {
      if (this.selectedPatient.patient_id) {
        this.editPatient({id: this.selectedPatient.patient_id, patient: this.selectedPatient}).then(() => {
          Swal.fire("Sucesso!", "Paciente alterado", "success");
          this.close()
        })
      } else {
        this.savePatient(this.selectedPatient).then(() => {
          Swal.fire("Sucesso!", "Paciente criado", "success");
          this.close();
        })
      }
    }
  },
  watch: {
    selectedPatient: function (value) {
      console.log(value);
      this.heightHandler = Number(value.height).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      this.weightHandler = Number(value.weight).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
  }
}
</script>

<style scoped>

</style>