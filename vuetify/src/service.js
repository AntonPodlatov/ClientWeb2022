import axios from "axios";

export default class {
    constructor() {
        this.baseUrl = "https://api.themoviedb.org/3";
        this.getPopularUrl = this.baseUrl + "/movie/popular";
        this.searchUrl = this.baseUrl + "/search/movie";
        this.movieUrl = this.baseUrl + "/movie";
        this.smallImagesUrl = "https://image.tmdb.org/t/p/w500";
        this.imagesSourceUrl = "https://image.tmdb.org/t/p/original";
        this.apiKey = "53dbb72040b28f7874369f2bf926d1e1";
    }

    get(url, query) {
        return axios.get(url, {params: query});
    }

    getGenres() {
        return this.get(this.baseUrl + "/genre/movie/list", {api_key: this.apiKey});
    }

    getPopularMovies(pageNumber) {
        if (isNaN(pageNumber)) {
            pageNumber = 1;
        }

        return this.get(this.getPopularUrl, {
            page: pageNumber,
            api_key: this.apiKey
        });
    }

    search(pageNumber, searchFieldValue) {
        return this.get(
            this.searchUrl, {
                api_key: this.apiKey,
                query: searchFieldValue,
                page: pageNumber
            });
    }

    createMoviePage(id) {
        return this.get(this.movieUrl + "/" + id, {
            api_key: this.apiKey,
        });
    }

    getRecommendations(id) {
        return this.get(this.movieUrl + "/" + id + "/recommendations", {
            api_key: this.apiKey
        });
    }
}