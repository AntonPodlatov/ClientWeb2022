<template>
  <v-container>

    <v-row class="justify-center mt-1">
      <span v-if="movies.length === 0" class="white--text text-h5">Nothing found</span>
      <span v-else class="white--text text-h5">Results for  "{{ searchFieldValue }}":</span>
    </v-row>

    <v-row class="justify-center">
      <v-col v-for="movie in movies"
             cols="6"
             md="3"
             :key="movie.id">
        <movie-card :movie-url="'movie/'" :movie="movie" :api-images-url="apiImagesUrl"></movie-card>
      </v-col>
    </v-row>

    <div class="text-center mt-12">
      <v-pagination
          dark
          color="black"
          :length="pagesCount"
          total-visible="7"
          v-model="currentPageNumber">
      </v-pagination>
    </div>

  </v-container>
</template>

<script>
import MovieCard from "@/components/MovieCard";
import {propertyOf} from "underscore";

export default {
  name: "SearchingResults",

  components: {
    MovieCard
  },

  data() {
    return {
      movies: [],
      pagesCount: 0,
      currentPageNumber: Number(this.$route.params.pageNumber || 1)
    };
  },

  created() {
    this.search(this.currentPageNumber);

    this.$store.watch(
        (state) => {
          return state.searchFieldValue;
        },
        () => {
          this.searchFieldValue = this.$store.state.searchFieldValue;
          this.search(1);
        }
    );
  },

  methods: {
    search(pageNumber) {
      this.service.search(pageNumber, this.searchFieldValue).then(res => {
        this.movies = res.data.results;

        this.pagesCount = res.data.total_pages;
        this.currentPageNumber = res.data.page;

        this.movies.forEach(movie => movie.genres = this.getMovieGenresNames(movie.genre_ids));
      }).catch(error => {
        alert("Can`t load data.");
        console.log(error);
      });

      setTimeout(this.scrollToTop, 500);
    },

    getMovieGenresNames(idS) {
      return idS.map(genreID => propertyOf(this.$store.state.genresIdToGenresNames)(genreID));
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    },
  },

  watch: {
    currentPageNumber() {
      this.$router.push({path: "/results/" + this.currentPageNumber});
      this.search(Number(this.$route.params.pageNumber), this.searchFieldValue);
    }
  },

  computed: {
    service() {
      return this.$store.state.service;
    },

    apiImagesUrl() {
      return String(this.$store.state.service.smallImagesUrl);
    },

    searchFieldValue: {
      get() {
        return this.$store.state.searchFieldValue;
      },

      set() {
        this.$store.commit("setSearchFieldValue", this.searchFieldValue);
      }
    }
  }
};
</script>
