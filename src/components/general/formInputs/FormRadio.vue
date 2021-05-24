<template>
  <ValidationProvider :name="name" :rules="rules" v-slot="{ errors }" >
    <v-radio-group v-model="inputValue" :row="row" :error-messages="errors">
      <v-radio
        outlined        
        color="#2DB4C5"
        :style="styleFormRadio"        
        v-for="item in items"
        :key="item.value"        
        :items="items"        
        :label="item.descricao"
        :value="item.value"
        :name="name"        
        :disabled="disabled"               
        @input="onChange"
        @blur="onBlur"        
      ></v-radio>
    </v-radio-group>
  </ValidationProvider>
</template>
<script>

export default {
  name: "FormCheckbox",
  props: {
    value:{
      type: undefined,
    },
    styleFormRadio: {
      type: String
    },
    name: {
      type: String,
    },
    radioValue: {
      type: Number
    },
    items: {
      type: Array
    },
    row: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
    },
    errorMessage: {
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
    handleAppendIcon: {
      type: Function,
    },
  },
  computed: {
    inputValue: {
      get: function () {
        return this.value;
      },
      set: function (value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    onChange(e) {
      this.$emit("input", e);
      this.handleChange && this.handleChange(e);
    },
    onBlur() {
      this.handleBlur && this.handleBlur();
    },
  },
};
</script>

<style scoped>

</style>