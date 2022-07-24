import Vue from 'vue'
import Vuex from 'vuex'
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
        isMobile: window.innerWidth < 750,
        storageService: new storageService(),
        service: new service()
    },

    getters: {},

    mutations: {
        setIsMobile(state, isMobile) {
            state.isMobile = isMobile;
        },

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
})
