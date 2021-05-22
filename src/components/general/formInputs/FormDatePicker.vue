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
          v-model="inputValue"
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
          @blur="onBlur"
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
    handleChange: {
      type: Function,
    },
    handleBlur: {
      type: Function,
    },
  },
  data: (vm) => {
    return {
      date: vm.value
        ? vm.parseDate(vm.value)
        : null,
      menu: false,
    };
  },
  computed: {
    inputValue: {
      get: function () {
        return this.formatDate(this.value);
      },
      set: function (newValue) {
        newValue = newValue.replace(/[a-zA-Z]*/g, "");
        this.$emit("update:value", newValue);
      },
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      date = date.replace(/[a-zA-Z]*/g, "");
      const [year, month, day] = date.split("-");
      return `${day}/${month.padStart(2, "0")}/${year.padStart(2, "0")}`;
    },

    parseDate(date) {
      if (!date) return null;
      date = date.replace(/[a-zA-Z]*/g, "");
      const [year, month, day] = date.split("-");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },

    parseDateAlt(date){
      if(!date) return null
      date = date.replace(/(\/)*(-)*[a-zA-Z]*/g, "")
      let [day, month, year] = [date.substr(0,2).padStart(2,"0"), date.substr(2,2).padStart(2,"0"), date.substr(4).padStart(4,"0")];
      if(parseInt(month)<=0 || parseInt(month)>12){
        month = "01";
      }
      if(parseInt(day)<=0 || parseInt(day)>31){
        day="01";
      }
      return `${year}-${month}-${day}`;
    },

    onChange(e) {
      this.menu = false;
      this.$emit("input", e);
      this.handleChange && this.handleChange(e);
    },

    onBlur(event) {
      let value = event.target.value;
      value = this.parseDateAlt(value);   
      this.$emit("input", value);
      this.date = value;
      this.handleBlur && this.handleBlur(value);
    },
  },
};
</script>

<style scoped>
</style>