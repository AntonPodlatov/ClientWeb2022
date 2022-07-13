<template>
  <v-parallax id="background" class="fill-height" width="" height="" :src="apiImagesUrl + filmData.backdrop_path">
    <v-row class="mt-16 mt-md-12 mb-0">

      <v-col class="pa-0 col-12 col-md-5">

        <film-card :is-only-poster="true"
                   :classNames="'mx-sm-16'"
                   :movie="filmData"
                   :api-images-url="apiImagesUrl">
        </film-card>
      </v-col>

      <v-col v-if="!isUndefined(filmData.title)" dark class="col-12 col-md-5">
        <h1 class="mb-2">{{ titleAndYear }}</h1>
        <h3 class="mb-5">{{ filmData.tagline }}</h3>
        <p>{{ filmData.overview }}</p>
        <p>{{ "Release date: " + filmData.release_date }}</p>
        <p>
          Production:<br>
          <span v-for="company in filmData.production_companies"
                :key="company.id">
              {{ company.name }}<br>
            </span>
        </p>
        <p>TMDB rating: {{ filmData.vote_average }}</p>
        <v-btn target="_blank" text :href="'https://www.imdb.com/title/' + filmData.imdb_id" color="white"
               class="pa-0">
          IMBD page
        </v-btn>
        <br>
        <v-btn target="_blank" text :href="filmData.homepage" color="white" class="pa-0">Homepage</v-btn>
      </v-col>

      <div class="ms-sm-16" v-else>
        <v-row
            class="fill-height  ma-0"
            align="center"
            justify="center">
          <v-progress-circular
              class=""
              indeterminate
              color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </div>

      <v-col class="col-12 mt-12 fill-height">
        <p v-if="recommendations.length===0" class="text-h5 ms-sm-13">There are no recommendations for this movie.</p>

        <div v-else>
          <p class="text-h5 ms-sm-13">Recommendations</p>
          <v-slide-group ref="SlideGroup" class="align-self-center" dark show-arrows>
            <v-slide-item v-for="rec in recommendations" :key="rec.id">

              <film-card class="mx-4" :width="200" :movie="rec" :api-images-url="apiSmallImagesUrl"
                         :movie-url="'/movie/'">
              </film-card>
            </v-slide-item>
          </v-slide-group>
        </div>

      </v-col>
    </v-row>
  </v-parallax>
</template>

<script>
import ApiService from "@/service";
import FilmCard from "@/components/MovieCard";
import {propertyOf} from "underscore/underscore-node";

const service = new ApiService();

export default {
  name: "movie",

  components: {
    FilmCard
  },

  data() {
    return {
      service: service,
      apiImagesUrl: service.imagesSourceUrl,
      apiSmallImagesUrl: service.smallImagesUrl,
      filmData: {},
      dateString: "",
      recommendations: [],
    }
  },

  created() {
    this.createThis();
  },

  methods: {
    createThis() {
      this.service.createMoviePage(this.$route.params.id).then(response => {
        this.filmData = response.data;
        this.dateString = this.filmData.release_date.substring(0, 4);
      });

      this.service.getRecommendations(this.$route.params.id).then(response => {
        this.recommendations = response.data.results;
        this.recommendations.forEach(recommendation => recommendation["genres"] = this.getMovieGenresNames(recommendation.genre_ids));
      });

      this.scrollToTop();
    },

    getMovieGenresNames(idS) {
      const genres = [];
      idS.forEach(id => genres.push(propertyOf(this.$store.state.genresIdToGenresNames)(id)));

      return genres;
    },

    isUndefined(obj) {
      return obj === void 0;
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });

      const slideGroup = this.$refs.SlideGroup;
      slideGroup.scrollTo("prev");
    }
  },

  watch: {
    $route() {
      this.createThis();
    }
  },

  computed: {
    titleAndYear() {
      return this.filmData.title + "  (" + this.dateString + ")";
    }
  }
}
</script>

<style>
.v-parallax__image-container {
  filter: brightness(30%);
}
</style>