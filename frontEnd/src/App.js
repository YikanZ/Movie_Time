import { useState, useCallback, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { Navbar, Nav } from "react-bootstrap";

import Login from "./components/Login.js";
import Logout from "./components/Logout.js";

import MoviesList from "./components/MoviesList.js";
import Movie from "./components/Movie.js";
import AddReview from "./components/AddReview.js";
import './App.css';
import FavoriteDataService from "./services/favorites.js";
import Favorite from "./components/Favorite.js";

const ClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {

  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  

  const fetchFavorites = useCallback((userId) => {
    FavoriteDataService.getFavorites(userId)
        .then(response => {
            setFavorites(response.data.favorites);
        })
        .catch(e => {
            console.log(e);
        });
  }, []);
  
  // useEffect to send favorite to backend
  const updateFavorites = useCallback(async (userId, favoritesList) => {
    console.log("favList",favoritesList)
    return await FavoriteDataService.updateFavorite(userId, favoritesList);

  }, []);


  const addFavorite = async (movieId) => {
    const result = await updateFavorites(user.googleId, [...favorites, movieId]);
    if (result.data.status === "success"){
      setFavorites([...favorites, movieId]);
    } else {
      alert("Error adding favorite"); // modified on professor's initial code. Error handling
    }
  };

  const deleteFavorite = async (movieId) => {
    const result = await updateFavorites(user.googleId, favorites.filter((f) => f !== movieId));
    if (result.data.status === "success"){
      setFavorites(favorites.filter((f) => f !== movieId));
  } else {
    alert("Error deleting favorite"); // modified on professor's initial code. Error handling 
  }
  };



  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
     
    if (loginData) {
      let loginExp = loginData.exp;
      let now = new Date()/1000;
      if (now < loginExp) {
        // Not expired
        user === null && setUser(loginData);
        fetchFavorites(loginData.googleId);
      } else {
        // Expired
        localStorage.setItem("login", null);
      }
    }
  }, [fetchFavorites, user]);


  // added favorites link for easy access line95
  return (
    <GoogleOAuthProvider clientId = {ClientId}>
    <div className="App">
      <Navbar bg="primary" expand="lg" sticky="top" variant="dark">
        <Container className="containenr-fluid">
          <Navbar.Brand href="/">
            <img src="/images/movies-logo.png" alt="movies logo" className="moviesLogo"/>
            MOVIE TIME
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/movies">
                Movies
              </Nav.Link>
              { user &&
              <Nav.Link as={Link} to={`/movies/${user.googleId}/favorites`}> 
                Favorites
              </Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
          {user ? (
            <Logout setUser={setUser} clientId={ClientId} />  
          ) : (
            <Login setUser={setUser} /> 
          )}
        </Container>
      </Navbar>

      <Routes>
        <Route exact path="/" element={
          <MoviesList 
          user ={ user }
          addFavorite = { addFavorite }
          deleteFavorite = { deleteFavorite }
          favorites = { favorites }
          />} 
          />
        <Route exact path="/movies" element={
          <MoviesList 
          user = { user }
          addFavorite = { addFavorite }
          deleteFavorite = { deleteFavorite }
          favorites = { favorites }
           />}
          />  
        <Route path="/movies/:id" element={
          <Movie user={ user }/>}
          />
        <Route path="movies/:id/review" element={
          <AddReview user={ user }/>}
          />
        <Route path="movies/:id/favorites" element={
          <Favorite
           user = { user }
          />}  
          />
      </Routes>
    </div>
    </GoogleOAuthProvider>
        );
}

export default App;
