<template>
  <v-hover
      v-slot="{ hover }"
      close-delay="100">
    <v-card :width="width"
            :height="height"
            dark
            :elevation="hover ? 14 : 1"
            :class="[{ 'on-hover': hover}, classNames]"
            @click="goToDetailedMoviePage()">

      <v-img :src="imagePath">

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
                   :content="movie.vote_average || 'no data'"></v-badge>
          <v-checkbox class="pt-0 mt-2"
                      @click.stop
                      color="red"
                      v-if="hover || isCheckBoxChecked"
                      v-model="isCheckBoxChecked"
                      @change="toggle()"
                      off-icon="mdi-check"
                      on-icon="mdi-check-outline"></v-checkbox>
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
import storageService from "@/storageService";

const StorageService = new storageService();

export default {
  name: "FilmCard",

  props: {
    movie: {
      type: Object,
      required: true
    },

    apiImagesUrl: {
      type: String,
      required: false
    },

    movieUrl: {
      type: String,
      required: false
    },

    width: {
      type: Number,
      required: false
    },

    height: {
      type: Number,
      required: false
    },

    classNames: {
      type: String,
      required: false
    },

    isOnlyPoster: {
      type: Boolean,
      required: false
    }
  },

  data() {
    return {
      isCheckBoxChecked: StorageService.moviesIds.indexOf(this.movie.id) !== -1,
    }
  },

  methods: {
    toggle() {
      StorageService.add(this.movie);
      console.log(StorageService.getFavourites())
    },

    goToDetailedMoviePage() {
      if (this.isOnlyPoster) {
        return;
      }

      this.$router.push({path: this.movieUrl + this.movie.id})
    }
  },

  computed: {
    imagePath() {
      return this.apiImagesUrl + this.movie.poster_path;
    }
  }
}
</script>