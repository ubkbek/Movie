<template>
  <div class="app font-monospace">
    <div class="content">
      <AppInfo
        :allMoviesCount="movies.length"
        :favouriteMoviesCount="movies.filter((e) => e.favourite).length"
      />

      <div class="search-panel">
        <SearchPanel :updateTermHandler="updateTermHandler" />
        <AppFilter :updateFilterHandler="updateFilterHandler" />
      </div>

      <MovieList
        :movies="onFilterHandler(onSeaechHandler(movies, term), filter)"
        @onToggle="onToggleHandler"
        @onRemove="onRemoveHandler"
      />
      <MovieAddForm @createMovie="createMovie" />
    </div>
  </div>
</template>

<script>
import SearchPanel from "../search-panel/SearchPanel.vue";
import AppInfo from "../app-info/AppInfo.vue";
import AppFilter from "../app-filter/AppFilter.vue";
import MovieList from "../movie-list/MovieList.vue";
import MovieAddForm from "../movie-add-form/MovieAddForm.vue";

export default {
  components: { AppInfo, SearchPanel, AppFilter, MovieList, MovieAddForm },
  data() {
    return {
      movies: [
        { id: 1, name: "Omar", viewers: 911, favourite: false, like: true },
        { id: 2, name: "Ertugrul", viewers: 766, favourite: true, like: true },
        { id: 4, name: "Troya", viewers: 201, favourite: false, like: true },
        {
          id: 3,
          name: "Empire of osman",
          viewers: 411,
          favourite: false,
          like: false,
        },
      ],
      term: "",
      filter: "all",
    };
  },

  methods: {
    createMovie(item) {
      this.movies.push(item);
    },

    onToggleHandler({ id, prop }) {
      const foundMovie = this.movies.find((e) => e.id === id);
      foundMovie[prop] = !foundMovie[prop];
    },

    onRemoveHandler(id) {
      this.movies = this.movies.filter((e) => e.id !== id);
    },

    onSeaechHandler(arr, term) {
      if (!arr.length) {
        return arr;
      }

      return this.movies.filter((e) => e.name.toLowerCase().includes(term));
    },

    updateTermHandler(term) {
      this.term = term;
    },

    onFilterHandler(arr, filter) {
      if (filter === "mostViewers") {
        return arr.filter((e) => e.viewers > 500);
      }

      if (filter === "popular") {
        return arr.filter((e) => e.like == true);
      }

      return arr;
    },

    updateFilterHandler(filter) {
      this.filter = filter;
    },
  },
};
</script>

<style>
.app {
  height: 100vh;
  color: #000;
}

.content {
  width: 1000px;
  min-height: 700px;
  background-color: #fff;
  margin: 0 auto;
  padding: 5rem 0;
}

.search-panel {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #fcfaf5;
  border-radius: 4px;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
  margin-bottom: 1.5rem;
}
</style>
