<template>
  <v-app v-resize="onResize">
    <v-app-bar v-if="windowWidth >= 790" app dark color="black" hide-on-scroll>
      <v-tabs v-model="tab" class="px-sm-3">
        <v-tab @change="goMain" dark class="text">
          Popular movies
        </v-tab>
        <v-tab @change="goToFavourites" class="text" dark>
          Favourite movies
        </v-tab>
        <v-tab v-show="$store.state.lastMoviePath"
               @change="goToDetailedMoviePage"
               class="text"
               dark>
          {{ $store.state.movieTitle }}
        </v-tab>
        <v-spacer></v-spacer>
        <v-tab>
          <v-text-field dark
                        label="Search"
                        v-model="searchFieldValue"
                        hide-details="auto"
                        @input="search">
          </v-text-field>
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-expansion-panels v-else dark tile>
      <v-expansion-panel class="pb-2">
        <v-expansion-panel-header class="mt-1">{{ $store.state.menuHeaderText }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row class="d-flex mt-1">
            <v-btn class="col-12 flex-grow-1 mb-1"
                   @click="goMain"
                   dark>
              Popular movies
            </v-btn>
            <v-btn class="col-12 flex-grow-1 mb-1"
                   @click="goToFavourites"
                   dark>
              Favourite movies
            </v-btn>
            <v-btn class="text-truncate col-12 flex-grow-1 mb-2"
                   v-show="$store.state.lastMoviePath"
                   @click="goToDetailedMoviePage"
                   dark>
              Last visited: {{ $store.state.movieTitle }}
            </v-btn>
            <v-text-field dark
                          label="Search"
                          v-model="searchFieldValue"
                          hide-details="auto"
                          @input="search">
            </v-text-field>
          </v-row>

        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      tab: null,
      searchFieldValue: "",
      currentMoviePath: "",
      windowWidth: window.innerWidth
    };
  },

  created() {
    this.getGenresNames();
  },

  methods: {
    goToFavourites() {
      if (this.$route.path !== "/favourites") {
        this.$store.commit("setMenuHeaderText", "Favourite movies");
        this.$router.push({path: "/favourites"});
      }
    },

    goMain() {
      if (this.$route.path !== "/") {
        this.$store.commit("setMenuHeaderText", "Popular movies");
        this.$router.push({path: "/"});
      }
    },

    isMoviePage() {
      return /^\/results\/movie\d+$|^\/movie\/\d+/.test(this.$route.path);
    },

    getGenresNames() {
      this.$store.state.service.getGenres().then(response => {
        const genresIdMap = {};
        response.data.genres.forEach(genre => {
          genresIdMap[genre.id] = genre.name;
        });

        this.$store.commit("setGenres", genresIdMap);
      }).catch(error => {
        console.log(error);
      });
    },

    goToDetailedMoviePage() {
      this.$store.commit("setMenuHeaderText", this.$store.state.movieTitle);

      if (!this.isMoviePage()) {
        this.$router.push({path: this.$store.state.lastMoviePath});
      }
    },

    search() {
      if (this.searchFieldValue.trim() === "") {
        this.menuHeaderText = "Search";
        this.$router.push({path: "/"});
        return;
      }

      this.$store.commit("setSearchFieldValue", this.searchFieldValue);

      //if not results page go to the results page
      if (!/^\/results\/\d+/.test(this.$route.path)) {
        this.$router.push({path: "/results/1"});
      }
    },

    onResize() {
      this.windowWidth = window.innerWidth;
    }
  },

  mounted() {
    this.onResize();
  },

  watch: {
    $route() {
      if (this.isMoviePage()) {
        this.tab = 2;
      }
    }
  }
};
</script>

<style>
#app {
  background: black;
}
</style>