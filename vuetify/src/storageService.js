export default class {
    constructor() {
        this.movies = this.getFavourites();
    }

    add(movie) {
        const movieIndex = this.movies.findIndex(movieFromStorage => movieFromStorage.id === movie.id);

        if (movieIndex !== -1) {
            this.movies.splice(movieIndex, 1);
        } else {
            this.movies.push({
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                vote_average: movie.vote_average
            });
        }

        localStorage.setItem("favoriteMovies", JSON.stringify(this.movies));
    }

    getFavourites() {
        const favoritesJsonString = localStorage.getItem("favoriteMovies");

        if (favoritesJsonString === null) {
            return [];
        }

        return JSON.parse(favoritesJsonString);
    }

    getFavouritesIds() {
        return this.getFavourites().map(fav => {
            return fav.id;
        });
    }
}