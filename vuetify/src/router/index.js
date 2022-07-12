import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Main from "@/views/Main.vue";
import Movie from "@/views/MovieDetailed.vue";
import SearchResults from "@/views/SearchResults.vue";
import FavouriteMovies from "@/views/FavouriteMovies";

const routes = [
    {
        path: "/favourites",
        name: "FavouriteMovies",
        component: FavouriteMovies
    },
    {
        path: "/movie/:id",
        name: "Movie",
        component: Movie
    },
    {
        path: "/results/movie/:id",
        name: "MovieFromSearchingResults",
        component: Movie
    },
    {
        path: "/results/:pageNumber",
        name: "SearchResults",
        component: SearchResults
    },
    {
        path: "/:pageNumber",
        name: "Main",
        component: Main
    },
    {
        path: "/",
        name: "Root",
        component: Main
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;