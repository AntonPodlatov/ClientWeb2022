import Vue from "vue";
import Vuex from "vuex";
import storageService from "@/storageService";
import service from "@/service";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        genresIdToGenresNames: {},
        searchFieldValue: "",
        movieTitle: "",
        lastMoviePath: "",
        lastMovieId: null,
        menuHeaderText: "Popular Movies",
        storageService: new storageService(),
        service: new service()
    },

    getters: {},

    mutations: {
        setMenuHeaderText(state, text) {
            state.menuHeaderText = text;
        },

        setGenres(state, genresNamesIdMap) {
            state.genresIdToGenresNames = genresNamesIdMap;
        },

        setSearchFieldValue(state, value) {
            state.searchFieldValue = value;
        },

        setMovieTitle(state, title) {
            state.movieTitle = title;
        },

        setLastMoviePath(state, path) {
            state.lastMoviePath = path;
        },

        setLastMovieId(state, id) {
            state.lastMovieId = id;
        },
    },

    actions: {},

    modules: {}
});
