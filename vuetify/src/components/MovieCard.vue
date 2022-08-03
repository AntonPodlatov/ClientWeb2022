<template>
  <v-hover
      v-slot="{ hover }"
      close-delay="100">
    <v-card :width="width"
            :height="height"
            dark
            :elevation="hover ? 14 : 1"
            :class="[{ 'on-hover': hover}, classNames]"
            @click="goToDetailedMoviePage">

      <v-snackbar v-model="snackbar"
                  timeout="1300"
                  color="red"
                  tag="'v-img'"
                  centered
                  :absolute="true"
                  content-class="d-flex  px-0 justify-center"
      >
        <span v-if="isCheckBoxChecked" class="text-center">
          Added to favourites.
        </span>
        <span v-else>
          Removed from favourites.
        </span>
      </v-snackbar>

      <v-img :src="imagePath" aspect-ratio="0.675">
        <template v-slot:placeholder>
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
        </template>
        <div class="d-flex justify-space-between align-start">
          <v-badge color="black"
                   class="mt-2 subtitle-2"
                   inline
                   tile
                   :content="movie.vote_average || 'no data'">
          </v-badge>
          <v-checkbox class="pt-0 mt-2"
                      @click.stop
                      color="red"
                      v-if="hover || isCheckBoxChecked || $store.state.isMobile"
                      v-model="isCheckBoxChecked"
                      @change="toggle"
                      off-icon="mdi-heart-outline"
                      on-icon="mdi-heart-outline">
          </v-checkbox>
        </div>
      </v-img>

      <div v-if="!isOnlyPoster">
        <v-card-title class="ps-2 pb-1 pt-2 pe-1 justify-md-space-between">
          <span class="text-truncate text-body-1 font-weight-medium">{{ movie.title }}</span>
        </v-card-title>

        <v-card-text>
          <v-chip-group column class="ps-0">
            <v-chip label
                    x-small
                    v-for="genre in movie.genres"
                    :key="genre">
              {{ genre }}
            </v-chip>
          </v-chip-group>
        </v-card-text>
      </div>

    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "FilmCard",

  props: {
    movie: {
      type: Object,
      required: true
    },

    apiImagesUrl: {
      type: String
    },

    movieUrl: {
      type: String
    },

    width: {
      type: Number
    },

    height: {
      type: Number
    },

    classNames: {
      type: String
    },

    isOnlyPoster: {
      type: Boolean
    },

    id: {
      type: Number
    },

    absolutePropForSnackbar: {
      type: Boolean,
      default: false
    }

  },

  data() {
    return {
      snackbar: false,
      isCheckBoxChecked: this.$store.state.storageService
          .getFavouritesIds()
          .indexOf(Number(this.movie.id)) !== -1
    };
  },

  methods: {
    toggle() {
      if (this.snackbar === true) {
        this.snackbar = true;
      } else {
        this.snackbar = !this.snackbar;
      }

      this.$store.state.storageService.add(this.movie);
    },

    goToDetailedMoviePage() {
      if (this.isOnlyPoster) {
        this.toggle();
        this.isCheckBoxChecked = !this.isCheckBoxChecked;
        return;
      }

      this.$store.commit("setLastMovieId", this.movie.id);
      this.$store.commit("setMovieTitle", this.movie.title);
      this.$store.commit("setMenuHeaderText", this.movie.title);
      this.$store.commit("setLastMoviePath", "/movie/" + this.movie.id);

      this.$router.push({path: this.movieUrl + this.movie.id});
    }
  },

  computed: {
    imagePath() {
      return this.apiImagesUrl + this.movie.poster_path;
    }
  },

  watch: {
    $route() {
      if (this.isOnlyPoster) {
        this.isCheckBoxChecked = this.$store.state.storageService
            .getFavouritesIds()
            .indexOf(Number(this.$route.params.id)) !== -1;
      }
    }
  }
};
</script>

<style scoped lang="sass">
::v-deep .v-snack__wrapper
  min-width: 95%
  padding-left: 10px
  padding-right: 5px
</style>