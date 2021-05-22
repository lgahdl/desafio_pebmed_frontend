<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="time"
    width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <ValidationProvider :name="name" :rules="rules" v-slot="{ errors }">
        <v-text-field
          v-model="inputValue"
          color="#2DB4C5"
          :name="name"
          :label="label"
          :hint="hint"
          :disabled="disabled"
          :placeholder="placeholder"
          :prepend-inner-icon="icon"
          :outlined="true"
          v-bind="attrs"
          v-on="on"
        />
        <span v-if="errors && errors[0]" class="form__error">{{
          errorMessage ? errorMessage : errors[0]
        }}</span>
      </ValidationProvider>
    </template>
    <v-time-picker
      v-model="time"
      v-if="modal"
      format="24hr"
      @input="onChange"
      full-width
    >
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="$refs.dialog.save(time)"> OK </v-btn>
    </v-time-picker>
  </v-dialog>
</template>
<script>
export default {
  name: "FormTimePicker",
  props: {
    value: {
      type: undefined,
      required: true,
    },
    name: {
      type: String,
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
      time: vm.value,
      modal: false,
    };
  },
  computed: {
    inputValue: {
      get: function () {
        return this.value;
      },
      set: function () {
        return this.value;
      },
    },
  },
  methods: {
    onChange(e) {
      this.$emit("input", e);
      this.handleChange && this.handleChange(e);
    },

    onBlur(value) {
      this.time = value;
      this.handleBlur && this.handleBlur(value);
    },
  },
};
</script>
<style scoped>
</style>