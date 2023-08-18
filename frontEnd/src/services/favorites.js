import axios from "axios";


class FavoriteDataService {
    getFavorites(userId) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites/${userId}`);
    }

    updateFavorite(_id, favorites) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites`, 
        { _id, favorites });
    }

    getMyFavorites(userId) {
        console.log("route userID", userId);
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/${userId}/favorites`);
    }

}

export default new FavoriteDataService();