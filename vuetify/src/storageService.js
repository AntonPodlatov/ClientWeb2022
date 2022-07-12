export default class {
    constructor() {
        this.moviesIds = [];
        this.movies = this.getFavourites();
    }

    add(movie) {
        const movieIndex = this.movies.findIndex(movieFromStorage => movieFromStorage["id"] === movie["id"]);

        if (movieIndex !== -1) {
            this.movies.splice(movieIndex, 1);
        } else {
            this.movies.push({
                id: movie["id"],
                title: movie["title"],
                poster_path: movie["poster_path"],
                vote_average: movie["vote_average"]
            });
        }

        localStorage.setItem("favoriteMovies", JSON.stringify(this.movies));
    }

    getFavourites() {
        const favoritesJsonString = localStorage.getItem("favoriteMovies");

        if (favoritesJsonString === null) {
            return [];
        }

        const favoritesArray = JSON.parse(favoritesJsonString);

        favoritesArray.forEach(fav => {
            this.moviesIds.push(fav.id);
        });

        return favoritesArray;
    }
}