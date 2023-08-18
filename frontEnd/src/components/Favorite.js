import React from "react";  
import FavoriteDataService from "../services/favorites";
import { useEffect, useCallback, useState } from "react";
import Card from 'react-bootstrap/Card';
import { Container } from "react-bootstrap";
import "./Favorite.css"
import "./MoviesList.css";

import { DnDCard } from "./DnDFavorites";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'




function Favorite( { user } ){

    

    const [favorites, setFavorites] = useState([]);
    console.log("favorites",favorites)

    const retrieveFavorites = useCallback(() => {
       if (user) {
        FavoriteDataService.getMyFavorites(user.googleId)
            .then(response => {
                console.log("data" ,response.data);
                setFavorites(response.data);
                
            })
        .catch(e => {
            console.log(e);
        });}
    }, [user]);


    // favorites[] dragIndex hoverIndex
    const moveCard = useCallback((dragIndex, hoverIndex) => {

        setFavorites((prevCards) => {
            console.log("prev",prevCards);
            const result = update(prevCards, {
              $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, prevCards[dragIndex]]
              ]
            });
    
            FavoriteDataService.updateFavorite(user.googleId, result.map((f) => f._id));
            return result;
          });
          
      }, [user])



      const renderCard = useCallback((card, index) => {
        return (
        <div className = "dragdiv">
          <DnDCard
            key={card.id}
            poster = {card.poster}
            index={index}
            id={card.id}
            title={card.title}
            moveCard={moveCard}
          />      
          </div>
        )
      }, [moveCard]);
 

    useEffect(() => {
        retrieveFavorites()
    }, [retrieveFavorites]);
    return (
       
        <Container className="favoritesContainer">
            <div className = "favoritesPanel">
                Drag your favorites to rank them
            </div>
            <div>
                <DndProvider backend={HTML5Backend}>
                    {favorites.map((card, i) => renderCard(card, i))}
                </DndProvider>
            </div>
        </Container>
      
    )
}

export default Favorite;