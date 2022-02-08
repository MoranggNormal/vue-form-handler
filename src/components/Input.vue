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

    <label :for="id"> {{ placeholder }} </label>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    type: String,
    id: String,
    placeholder: String,
    htmlClass: String,
    value: Object,
  },

  methods: {
    handleChange: function (e) {
      console.log(e.target);
    },
  },
};
</script>

<style >
</style>
