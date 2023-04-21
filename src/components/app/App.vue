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

      <Box v-if="!movies.length && !isLoading" class="text-danger fs-4">
        Kinolar yo'q...
      </Box>

      <Box v-else-if="isLoading" class="text-center"> <Loader /></Box>

      <MovieList
        v-else
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

import axios from "axios";
import Loader from "../ui-components/Loader.vue";

export default {
  components: {
    AppInfo,
    SearchPanel,
    AppFilter,
    MovieList,
    MovieAddForm,
    Loader,
  },
  data() {
    return {
      movies: [],
      term: "",
      filter: "all",
      isLoading: false,
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

    async fetchMovie() {
      try {
        this.isLoading = true;

        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?__limit=10"
        );

        const newArr = data.map((item) => ({
          id: item.id,
          name: item.title,
          favourite: false,
          like: false,
          viewers: item.id * 121,
        }));

        this.movies = newArr;
      } catch (error) {
        alert(error.message);
      } finally {
        this.isLoading = false;
      }
    },
  },

  mounted() {
    this.fetchMovie();
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
