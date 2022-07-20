<template>
  <v-parallax height=""
              src="https://images.freeimages.com/images/large-previews/06a/cinema-1221624.jpg">
    <v-container>

      <v-row class="mt-4 main__movies-content justify-center">
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
            v-model="currentPageNumber"
            @input="goToPage()"
        >
        </v-pagination>
      </div>
    </v-container>
  </v-parallax>
</template>

<script>
import {propertyOf} from "underscore"
import ApiService from "@/service";
import MovieCard from "@/components/MovieCard";

const service = new ApiService();

export default {
  name: "Main",

  components: {
    MovieCard
  },

  data() {
    return {
      service: service,
      apiImagesUrl: service.smallImagesUrl,
      movies: [],
      pagesCount: 500,
      currentPageNumber: Number(this.$route.params.pageNumber || 1)
    }
  },

  created() {
    this.getPopularMovies(this.currentPageNumber);
  },


  methods: {
    getPopularMovies(pageNumber) {
      this.service.getPopularMovies(pageNumber).then(response => {
        this.movies = response.data.results;
        this.movies.forEach(movie => movie["genres"] = this.getMovieGenresNames(movie.genre_ids));
      }).catch(error => {
        alert("Can`t load data.");
        console.log(error);
      });

      setTimeout(this.scrollToTop,500);

    },

    async scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    },

    getMovieGenresNames(idS) {
      const genres = [];
      idS.forEach(id => genres.push(propertyOf(this.$store.state.genresIdToGenresNames)(id)));
      return genres;
    },

    goToPage() {
      this.$router.push({path: '/page/' + this.currentPageNumber});
      this.currentPageNumber = Number(this.$route.params.pageNumber);
      this.getPopularMovies(Number(this.$route.params.pageNumber));
    }
  }
}
</script>