<template>
  <div :class="htmlClass">
    <input
      class="form-control"
      :type="type"
      :id="id"
      :placeholder="placeholder"
      v-model="value.name"
      @change="handleChange"
      required
    />
    <div class="invalid-feedback">{{ errorMessage }}</div>
    <label :for="id"> {{ placeholder }} </label>
  </div>
</template>

<script>
import handleForm from "../utils/handleForm";

export default {
  name: "Input",
  props: {
    type: String,
    id: String,
    placeholder: String,
    errorMessage: String,
    htmlClass: String,
    value: Object,
  },
  methods: {
    handleChange: function ({ target }) {
      // Verify if provided date has any value
      if (target.id === "birthDate") {
        if (!target.value.length) {
          target.classList.remove("is-valid");
          target.classList.add("is-invalid");
        } else {
          target.classList.remove("is-invalid");
          target.classList.add("is-valid");
        }
      }

      // Verify if provided name length is less than 3
      if (target.id === "name") {
        if (target.value.length < 3) {
          target.classList.remove("is-valid");
          target.classList.add("is-invalid");
        } else {
          target.classList.remove("is-invalid");
          target.classList.add("is-valid");
        }
      }

      // Verify if provided value matches the pattern
      if (
        target.id === "phone" ||
        target.id === "email" ||
        target.id === "password" ||
        target.id === "confirm-password" ||
        target.id === "cpf"
      ) {
        handleForm(target.id, target.value, target);
      }
    },
  },
};
</script>

<style >
</style>
