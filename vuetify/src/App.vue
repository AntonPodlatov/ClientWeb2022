<template>
  <v-app>
    <v-app-bar app color="black" hide-on-scroll>

      <v-btn v-show="!isMainPaginationOrSearchResultsPage()"
             small
             fab
             dark
             color="black"
             class="me-16"
             @click="$router.back()">
        <v-icon color="white">
          mdi-chevron-left
        </v-icon>
      </v-btn>

      <v-container>
        <v-row>
          <v-col class="col-sm-2">
            <v-btn href="/" dark class="text-h4" text>Moviefy</v-btn>
          </v-col>

          <v-col class="ms-1 col-sm-2">
            <v-btn v-show="!isFavourites()"
                   @click="goToFavourites()"
                   class="ms-2" dark text>Favourite Movies
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" class="col-sm-3">
            <v-text-field v-if="isMainPaginationOrSearchResultsPage()"
                          dark
                          label="Search"
                          v-model="searchFieldValue"
                          hide-details="auto"
                          @input="search()">
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>


    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
import service from "@/service";

const Service = new service();

export default {
  name: 'App',

  data() {
    return {
      searchFieldValue: ""
    }
  },

  created() {
    this.getGenresNames();
  },

  methods: {
    goToFavourites() {
      this.$router.push({path: '/favourites'});
    },

    isMainPaginationOrSearchResultsPage() {
      return /^\/$|^\/\d+$|^\/results\/\d+/.test(this.$route.path);
    },

    isFavourites() {
      return /^\/favourites$/.test(this.$route.path);
    },

    getGenresNames() {
      Service.getGenres().then(response => {
        const genresIdMap = {};
        response.data.genres.forEach(genre => {
          genresIdMap[genre.id] = genre.name;
        });
        this.$store.commit("setGenres", genresIdMap);
      }).catch(error => {
        console.log(error);
      });
    },

    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },

    search() {
      if (this.searchFieldValue.trim() === "") {
        this.$router.push({path: "/"});
        return;
      }

      this.$store.commit("setSearchFieldValue", this.searchFieldValue);

      //if not results page go to the results page
      if (!/^\/results\/\d+/.test(this.$route.path)) {
        this.$router.push({path: "/results/1"});
      }
    }
  }
}
</script>

<style>
#app {
  background: black;
}
</style>