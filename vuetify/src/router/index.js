import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Main from "@/views/Main.vue";
import Movie from "@/views/MovieDetailed.vue";
import SearchResults from "@/views/SearchResults.vue";
import FavouriteMovies from "@/views/FavouriteMovies";
import PageNotFound from "@/views/PageNotFound";

const routes = [
    {
        path: "/",
        name: "Root",
        component: Main
    },
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
        path: "/page/movie/:id",
        redirect: "/movie/:id"
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
        path: "/page/:pageNumber",
        name: "Main",
        component: Main
    },
    {
        path: "/not-found",
        component: PageNotFound
    },
    {
        path: "*",
        redirect: "/not-found"
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;