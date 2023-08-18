import axios from 'axios';

class MovieDataService {
    getAll(page = 0) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies?page=${page}`);
}


find(query, by = "title", page = 0) {
    return axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/movies?${by}=${query}&page=${page}`
    );
}

getRatings() {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/ratings`);
}

getMovie(id) {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/id/${id}`);
}

createReview(data) {    
    return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/review`, data);
}

updateReview(id, data) {
    return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/review/${id}`, data);
}

deleteReview(id) {
    return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/review/${id}`);

}
}

export default new MovieDataService();