<template>
  <div class="movie-add-form">
    <h3>Yangi kino qo'shish</h3>

    <form class="d-flex add-form" @submit.prevent>
      <Input
        class="new-movie-label"
        placeholder="Qanday kino?"
        v-model="name"
      />

      <Input
        class="new-movie-label"
        placeholder="Nechchi marotaa ko'rilgan?"
        type="number"
        min="0"
        v-model="viewers"
      />

      <PrimaryButton
        type="submit"
        class="btn btn-outline-dark"
        @click="addMovie"
      >
        Qo'shish
      </PrimaryButton>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      viewers: "",
    };
  },

  methods: {
    addMovie() {
      if (!this.name || !this.viewers) {
        return alert("Name and viewers are required!!!");
      }

      const newMovie = {
        id: Date.now(),
        name: this.name,
        viewers: this.viewers || 0,
        favourite: false,
        like: false,
      };

      this.$emit("createMovie", newMovie);
      this.name = "";
      this.viewers = "";
    },
  },
};
</script>

<style scoped>
.movie-add-form {
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 4px;
  background-color: #fcfaf5;
  box-shadow: 15px 15px 15px rgba(15, 15, 15, 0.15);
}
</style>
