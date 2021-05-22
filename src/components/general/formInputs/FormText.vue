<template>
  <ValidationProvider :name="name" :rules="rules" v-slot="{ errors }">
    <v-text-field
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
        v-mask="mask"
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
    ></v-text-field>
  </ValidationProvider>
</template>
<script>
import {VueMaskFilter} from "v-mask";

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
    mask: {
      type: String,
    },
    type: {
      type: String,
      required: false,
      default: "text"
    }
  },
  data: () => ({
    //DADOS USADOS PARA O AJUSTE DO CURSOR DE TEXTO(CARET)
    //TODO: NOVA MÁSCARA DE TEXTO, PARA NÃO PRECISAR DESSE AJUSTE
    caret: {
      position: 0,
      canChangePosition: false,
      specialCharactersPosArray: [],
    },
  }),
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
    },

    //FUNÇÃO PARA SETAR A POSIÇÃO EM QUE O CURSOR DE TEXTO(CARET) SERÁ COLOCADO DEPOIS DA APLICAÇÃO DA MÁSCARA
    setCaretPosition() {
      if (
          this.caret.position >= this.mask.length &&
          this.$refs.inputText.$refs.input.selectionStart < this.caret.position
      ) {
        this.caret.position = this.$refs.inputText.$refs.input.selectionStart;
      }
      if (
          this.$refs.inputText.$refs.input.selectionStart !== this.mask.length &&
          this.caret.position <= this.mask.length - 1
      ) {
        if (
            !this.caret.specialCharactersPosArray.includes(
                this.$refs.inputText.$refs.input.selectionStart
            )
        ) {
          this.caret.position = this.$refs.inputText.$refs.input.selectionStart;
        } else {
          this.caret.position =
              this.$refs.inputText.$refs.input.selectionStart + 1;
        }
      }
      if (
          this.caret.position >= this.mask.length - 1 &&
          this.$refs.inputText.$refs.input.selectionStart === this.mask.length
      ) {
        if (this.caret.canChangePosition) {
          this.caret.position = this.mask.length;
          this.caret.canChangePosition = false;
        }
        if (
            !this.caret.canChangePosition &&
            this.caret.position !== this.mask.length
        ) {
          this.caret.canChangePosition = true;
        }
      }
    },
  },
  watch: {
    inputValue: function () {
      if (this.mask && this.inputValue) {
        let maskCharArray = this.mask.split("");
        let maskSpecialCharacters = maskCharArray.filter((char, idx) => {
          if (
              char === "#" ||
              char === "A" ||
              char === "X" ||
              char === "N" ||
              char === "?"
          ) {
            return false;
          }
          if (!this.caret.specialCharactersPosArray.includes(idx)) {
            this.caret.specialCharactersPosArray.push(idx);
          }
          return true;
        });
        const maskedValue = VueMaskFilter(this.inputValue, this.mask);
        const maskedValueArray = maskedValue.split("");
        const lastValue = maskedValueArray[maskedValue.length - 1];

        //Função para setar o valor em que o cursor de texto será posicionado após a aplicação da máscara
        this.setCaretPosition();

        if (maskSpecialCharacters.indexOf(lastValue) >= 0) {
          return;
        }
        this.$nextTick(
            () => (this.inputValue = VueMaskFilter(this.inputValue, this.mask))
        );
        if (this.caret.position < this.mask.length || this.caret.canChangePosition) {
          //NESSA LINHA ONDE EFETIVAMENTE O CURSOR DE TEXTO É COLOCADO NA POSIÇÃO CORRETA
          this.$refs.inputText.$refs.input.setSelectionRange(
              this.caret.position,
              this.caret.position
          );
        }
      }
    },
  },
};
</script>

<style scoped></style>
