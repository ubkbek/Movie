<template>
  <ul class="list-group movie-list">
    <MovieListItem
      v-for="movie in movies"
      :movie="movie"
      :key="movie.id"
      @onToggle="$emit('onToggle', $event)"
      @onRemove="$emit('onRemove', $event)"
    />
  </ul>
</template>
<script>
import MovieListItem from "../movie-list-item/MovieListItem.vue";

export default {
  components: { MovieListItem },
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },

  methods: {
    onLike(item) {
      this.$emit("onLike", item);
    },
  },
};
</script>

<style scoped>
.movie-list {
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 4px;
  background-color: #fcfaf5;
  box-shadow: 15px 15px 15px rgba(15, 15, 15, 0.15);
}
</style>
