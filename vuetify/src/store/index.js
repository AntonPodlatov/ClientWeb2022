import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        genresIdToGenresNames: {},
        searchFieldValue: "",
        movieTitle: "",
        lastMoviePath: ""
    },

    getters: {},

    mutations: {
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
    },

    actions: {},

    modules: {}
})
