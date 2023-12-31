import React, { useState } from "react";
import MovieDataService from "../services/movies";
import { useNavigate, useParams, useLocation  } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Movie from "./Movie";

const AddReview = (user) => {
   
    
    const navigate = useNavigate();
    let params = useParams();
     //implementing edit review
    const location = useLocation();
    const editing = location.state && location.state.currentReview;
    const initialReviewState = editing ? location.state.currentReview.review : "";
    


    

    // let editing = false;
    // let initialReviewState = "";
    // initialReviewState will have a different value
    // if we are editing an exisiting review

    const [review, setReview] = useState(initialReviewState);
    
    const onChangeReview = e => {
        const review = e.target.value;
        setReview(review);
    };

    const saveReview = () => {
        var data = {
            review: review,
            name: user.user.name,
            user_id: user.user.googleId,
            movie_id: params.id // get movie id from url
        }
        
   

     
      


        if (editing){

            //TODO: handle case where an exisiting 
            // review is being updated
            MovieDataService.updateReview(location.state.currentReview._id, data)
            .then(response => {
                navigate("/movies/" + params.id);
            })    
        } else {
            MovieDataService.createReview(data)
            .then(response => {
                navigate("/movies/" + params.id);
                
            })
            .catch(e => {
        
                console.log(e);
            });
        };
    }
    
    return (
    <Container className="main-container">
        <Form>
        <Form.Group className="mb-3">
            <Form.Label>{ editing ? "Edit" : "Create" } Review</Form.Label>
            <Form.Control
                as="textarea"
                type="text"
                required
                review={review}
                onChange={onChangeReview}
                defaultValue={editing ? null : ""}
            />
        </Form.Group>
            <Button variant="primary" onClick={saveReview}>
                Submit
            </Button>
        </Form>
    </Container>
    );
};


export default AddReview;
