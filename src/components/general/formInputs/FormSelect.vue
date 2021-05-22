<template>
  <ValidationProvider :name="name" :rules="rules" v-slot="{ errors }">
    <v-select
        outlined
        color="#2DB4C5"
        :prepend-inner-icon="icon"
        v-model="inputValue"
        :style="styleSelect"
        :items="items"
        :item-text="itemText"
        :item-value="itemValue"
        :error-messages="errors"
        :label="label"
        :name="name"
        :hint="hint"
        :disabled="disabled"
        :placeholder="placeholder"
        persistent-hint
        :return-object="itemValue ? returnObject : true"
        data-vv-name="select"
        @input="onChange"
        @blur="onBlur"
    ></v-select>
  </ValidationProvider>
</template>
<script>
export default {
  name: "FormSelect",
  props: {
    value: {
      type: undefined,
    },
    icon: {
      type: String,
    },
    styleSelect: {
      type: String
    },
    items: {
      type: Array,
      required: true,
    },
    itemText: {
      type: String,
      required: true,
    },
    itemValue: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
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
    returnObject: {
      type: Boolean,
      default: true,
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
  computed: {
    inputValue: {
      get: function () {
        if (this.value && this.value.__ob__ && !this.value[this.itemValue]) {
          return null
        }
        return this.value
      },
      set: function (value) {
        this.$emit("input", value)
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