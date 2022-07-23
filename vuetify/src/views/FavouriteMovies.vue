<template>
  <v-parallax height=""
              class="fill-height"
              src="https://images.freeimages.com/images/large-previews/06a/cinema-1221624.jpg">
    <v-container>
      <v-row v-if="movies.length === 0">
        <v-col cols="12" class="text-center">
          <span class="text-h5">There's nothing here..</span>
        </v-col>
      </v-row>

      <v-row class="justify-center">
        <v-col v-for="movie in movies"
               cols="6"
               md="2"
               :key="movie.id">
          <movie-card :movie-url="'movie/'"
                      :movie="movie"
                      :api-images-url="service.smallImagesUrl"
          >
          </movie-card>
        </v-col>
      </v-row>
    </v-container>

  </v-parallax>

</template>
<script>
import storageService from "@/storageService";
import service from "@/service";
import MovieCard from "@/components/MovieCard";


export default {
  name: "FavouriteMovies",

  components: {
    MovieCard
  },

  data() {
    return {
      storageService: new storageService(),
      service: new service(),
      movies: []
    };
  },

  created() {
    this.createThis();
  },

  methods: {
    createThis() {
      this.movies = this.storageService.getFavourites();
    }
  }
}
</script>

<style scoped>

</style>