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
      // Verify if provided value matches the pattern
      handleForm(target.id, target.value.trim(), target);
    },
  },
};
</script>

<style >
</style>
