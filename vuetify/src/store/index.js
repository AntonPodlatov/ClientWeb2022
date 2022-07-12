import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        genresIdToGenresNames: {},
        searchFieldValue: "",
        isSearchFieldEmpty: false
    },

    getters: {},

    mutations: {
        setGenres(state, genresNamesIdMap) {
            state.genresIdToGenresNames = genresNamesIdMap;
        },

        setSearchFieldValue(state, value) {
            state.searchFieldValue = value;
        },

        toggleFieldIsEmptyProperty(state) {
            state.isSearchFieldEmpty = !state.isSearchFieldEmpty;
        }
    },

    actions: {
        toggleFieldIsEmptyProperty(context) {
            context.commit("toggleFieldIsEmptyProperty");
        }
    },

    modules: {}
})
