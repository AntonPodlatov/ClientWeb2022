<template>
    <v-container>
      <v-alert
          dismissible
          elevation="2"
          text
          type="error"
          :value="cantLoadData"
      >can't load data
      </v-alert>
      <v-row class="mt-4 main__movies-content justify-center">
        <v-col v-for="movie in movies"
               cols="6"
               md="3"
               :key="movie.id">
          <movie-card :movie-url="'movie/'"
                      :movie="movie"
                      :api-images-url="$store.state.service.smallImagesUrl"
          ></movie-card>
        </v-col>
      </v-row>

      <div class="text-center mt-12">
        <v-pagination
            v-if="!cantLoadData"
            dark
            color="black"
            :length="pagesCount"
            total-visible="7"
            v-model="currentPageNumber"
            @input="goToPage()"
        >
        </v-pagination>
      </div>
    </v-container>
</template>

<script>
import {propertyOf} from "underscore";
import MovieCard from "@/components/MovieCard";

export default {
  name: "Main",

  components: {
    MovieCard
  },

  data() {
    return {
      cantLoadData: false,
      movies: [],
      pagesCount: 500,
      currentPageNumber: Number(this.$route.params.pageNumber || 1),
      backgroundSrc: "https://images.freeimages.com/images/large-previews/06a/cinema-1221624.jpg"
    };
  },

  created() {
    this.getPopularMovies(this.currentPageNumber);
  },

  methods: {
    getPopularMovies(pageNumber) {
      this.$store.state.service.getPopularMovies(pageNumber).then(response => {
        if (response.status === 200) {
          this.cantLoadData = false;
        }

        this.movies = response.data.results;
        this.movies.forEach(movie => movie.genres = this.getMovieGenresNames(movie.genre_ids));
      }).catch(error => {
        this.cantLoadData = true;
        console.log(error);
      });

      setTimeout(this.scrollToTop, 500);
    },

    async scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    },

    getMovieGenresNames(idS) {
      return idS.map(genreID => propertyOf(this.$store.state.genresIdToGenresNames)(genreID));
    },

    goToPage() {
      this.$router.push({path: "/page/" + this.currentPageNumber});
      this.currentPageNumber = Number(this.$route.params.pageNumber);
      this.getPopularMovies(Number(this.$route.params.pageNumber));
    }
  }
};
</script>