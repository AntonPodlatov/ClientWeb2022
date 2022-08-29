<template>
  <div>
    <v-alert
        dismissible
        elevation="2"
        text
        type="error"
        :value="cantLoadData"
    >
      can't load data
    </v-alert>
    <v-img v-if="!cantLoadData"
           height="100%"
           :src="apiImagesUrl+ filmData.backdrop_path"
           transition="scale-transition"
           eager
           :key="filmData.id"
    >
      <div class="backdrop_image pt-13 pb-1 px-2">
        <v-row>
          <v-col class="col-12 col-md-5">
            <film-card v-if="!isUndefined(filmData.id)"
                       :classNames="'mx-sm-16'"
                       :movie="filmData"
                       :api-images-url="apiImagesUrl"
                       :is-only-poster="true"
                       :absolute-prop-for-snackbar="true"
            >
            </film-card>
          </v-col>

          <v-col v-if="!isUndefined(filmData.title)" dark class="col-12 col-md-5">
            <h1 class="white--text mb-2">{{ titleAndYear }}</h1>
            <h3 class="white--text mb-5">{{ filmData.tagline }}</h3>
            <p class="white--text">{{ filmData.overview }}</p>
            <p class="white--text">{{ "Release date: " + filmData.release_date }}</p>
            <p class="white--text">
              Production:<br>
              <span v-for="company in filmData.production_companies"
                    :key="company.id">
              {{ company.name }}<br>
            </span>
            </p>
            <p class="white--text">TMDB rating: {{ filmData.vote_average }}</p>
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
            <div v-if="!isUndefined(filmData.id)">
              <p v-if="recommendations.length === 0" class="white--text text-h5 ms-sm-13">
                There are no recommendations for this movie.</p>
              <div v-else>
                <p class="text-h5 ms-sm-13  white--text">Recommendations</p>
                <v-slide-group ref="SlideGroup" class="align-self-center" dark show-arrows>
                  <v-slide-item v-for="rec in recommendations" :key="rec.id">

                    <film-card class="mx-4"
                               :width="200"
                               :absolute-prop-for-snackbar="true"
                               :movie="rec"
                               :api-images-url="apiSmallImagesUrl"
                               :movie-url="'/movie/'">
                    </film-card>
                  </v-slide-item>
                </v-slide-group>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-img>
  </div>
</template>

<script>
import FilmCard from "@/components/MovieCard";
import {propertyOf} from "underscore/underscore-node";

export default {
  name: "movie",

  components: {
    FilmCard
  },

  data() {
    return {
      filmData: {},
      dateString: "",
      recommendations: [],
      cantLoadData: false
    };
  },

  created() {
    this.createThis();
  },

  methods: {
    async createThis() {
      this.service.createMoviePage(this.$route.params.id).then(response => {
        if (response.status === 200) {
          this.cantLoadData = false;
        }

        this.filmData = response.data;
        this.dateString = this.filmData.release_date.substring(0, 4);
      }).catch((err) => {
        if (err.code === "ERR_NETWORK") {
          this.cantLoadData = true;
          return;
        }

        this.$router.push({path: "/not-found"});
      });

      this.service.getRecommendations(this.$route.params.id).then(response => {
        this.recommendations = response.data.results;
        this.recommendations
            .forEach(recommendation => recommendation.genres = this.getMovieGenresNames(recommendation.genre_ids));
      });
      setTimeout(this.scrollToTop, 400);
    },

    getMovieGenresNames(idS) {
      return idS.map(genreID => propertyOf(this.$store.state.genresIdToGenresNames)(genreID));
    },

    isUndefined(obj) {
      return obj === void 0;
    },

    scrollToTop() {
      window.scrollTo({top: 0, left: 0, behavior: "smooth"});
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
    },

    service() {
      return this.$store.state.service;
    },

    apiImagesUrl() {
      return this.$store.state.service.imagesSourceUrl;
    },

    apiSmallImagesUrl() {
      return this.$store.state.service.smallImagesUrl;
    }
  }
};
/*
<v-img height="100%"
       :src="apiImagesUrl+ filmData.backdrop_path"
       transition="scale-transition"
>
  </v-img>

*/
</script>

<style>
.v-parallax__image-container {
  filter: brightness(35%);
}
</style>

<style lang="sass">
.backdrop_image
  backdrop-filter: brightness(27%)
</style>
