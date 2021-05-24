<template>
  <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <ValidationProvider :name="name" :rules="rules" v-slot="{ errors }">
        <v-text-field
            v-model="value"
            :label="label"
            :name="name"
            :hint="hint"
            :error-messages="errors"
            :prepend-inner-icon="icon"
            color="#4db4c7"
            :disabled="disabled"
            :placeholder="placeholder"
            outlined
            persistent-hint
            v-on="on"
        ></v-text-field>
      </ValidationProvider>
    </template>
    <v-date-picker
        v-model="date"
        :first-day-of-week="1"
        color="#4db4c7"
        @input="onChange"
        locale="pt-br"
    ></v-date-picker>
  </v-menu>
</template>

<script>

export default {
  name: "FormDatePicker",
  props: {
    value: {
      type: undefined,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    hint: {
      type: String,
    },
    errorMessage: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    rules: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
  },
  data: (vm) => {
    return {
      date: vm.value
          ? vm.value
          : null,
      menu: false,
    };
  },
  methods: {
    onChange(e) {
      this.menu = false;
      console.log(e);
      console.log(new Date(e));
      console.log(new Date(e).toLocaleDateString("pt-BR", {timeZone: "UTC"}));
      this.$emit("input", new Date(e).toLocaleDateString("pt-BR", {timeZone: "UTC"}));
      this.handleChange && this.handleChange(e);
    },
  },
};
</script>

<style scoped>
</style>