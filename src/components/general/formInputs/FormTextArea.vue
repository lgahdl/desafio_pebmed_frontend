<template>
  <ValidationProvider :name="name" :rules="rules" v-slot="{ errors }">
    <v-textarea
        outlined
        ref="inputText"
        :type="type"
        :maxlength="limit"
        color="#2DB4C5"
        :toUpperCase="toUpperCase"
        :prepend-inner-icon="icon"
        :append-icon="appendIcon"
        :style="styleFormText"
        v-model="inputValue"
        :autocomplete="autocomplete"
        :error-messages="errors"
        :label="label"
        :name="name"
        :hint="hint"
        :disabled="disabled"
        :placeholder="placeholder"
        persistent-hint
        @click:append="onClickAppendIcon"
        @input="onChange"
        @blur="onBlur"
    ></v-textarea>
  </ValidationProvider>
</template>
<script>

export default {
  name: "FormText",
  props: {
    autocomplete: {
      type: String,
      required: false,
    },
    value: {
      type: undefined,
    },
    icon: {
      type: String,
    },
    appendIcon: {
      type: String,
    },
    limit: {
      type: Number,
    },
    styleFormText: {
      type: String,
    },
    toUpperCase: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
    },
    label: {
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
    handleAppendIcon: {
      type: Function,
    },
    type: {
      type: String,
      required: false,
      default: "text"
    }
  },
  computed: {
    inputValue: {
      get: function () {
        return this.toUpperCase ? this.value.toUpperCase() : this.value;
      },
      set: function (value) {
        let valueToSet = this.toUpperCase ? value.toUpperCase() : value;
        this.$emit("input", valueToSet);
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
    onClickAppendIcon() {
      if (this.handleAppendIcon) {
        this.handleAppendIcon(this.inputValue);
      }
    }
  } 
};
</script>

<style scoped></style>
