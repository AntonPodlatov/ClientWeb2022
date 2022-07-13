<template>
  <v-app>
    <v-app-bar app dark color="black" hide-on-scroll>

      <v-btn v-if="isMoviePage()"
             small
             fab
             dark
             color="black"
             @click="$router.back()">
        <v-icon color="white">mdi-chevron-left</v-icon>
      </v-btn>


      <v-tabs class="px-sm-3">
        <v-tab @change="goMain()" dark class="text">
          Popular movies
        </v-tab>

        <v-tab @change="goToFavourites()" class="text" dark>
          Favourite movies
        </v-tab>

        <v-spacer></v-spacer>

        <v-tab>
          <v-text-field dark
                        label="Search"
                        v-model="searchFieldValue"
                        hide-details="auto"
                        @input="search()">
          </v-text-field>
        </v-tab>
      </v-tabs>

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
      if (this.$route.path !== "/favourites") {
        this.$router.push({path: "/favourites"});
      }
    },

    goMain() {
      if (this.$route.path !== "/") {
        this.$router.push({path: "/"});
      }
    },

    isMoviePage() {
      return /^\/results\/movie\d+$|^\/movie\/\d+/.test(this.$route.path);
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