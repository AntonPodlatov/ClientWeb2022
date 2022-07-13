import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        genresIdToGenresNames: {},
        searchFieldValue: ""
    },

    getters: {},

    mutations: {
        setGenres(state, genresNamesIdMap) {
            state.genresIdToGenresNames = genresNamesIdMap;
        },

        setSearchFieldValue(state, value) {
            state.searchFieldValue = value;
        },
    },

    actions: {},

    modules: {}
})
