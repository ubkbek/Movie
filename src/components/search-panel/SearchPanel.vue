<template>
  <input
    class="search-input form-control"
    type="text"
    placeholder="kinolarni qidirish..."
    @input="inputHandler"
  />
</template>
<script>
export default {
  props: {
    updateTermHandler: {
      type: Function,
      required: true,
    },

    data() {
      return {
        term: "",
      };
    },
  },

  methods: {
    inputHandler(e) {
      this.term = e.target.value;
      this.updateTermHandler(this.term);
    },
  },
};
</script>

<style scoped>
.search-input {
  padding: 1.5rem;
  background-color: #fcfaf5;
  border-radius: 4px;
  box-shadow: 15px 15px 15px rgba(15, 15, 15, 0.15);
  margin-bottom: 1rem;
}
</style>
