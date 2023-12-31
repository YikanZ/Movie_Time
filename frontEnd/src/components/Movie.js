import React, { useState, useEffect, useCallback } from  'react';
import MovieDataService from  '../services/movies';
import { Link, useParams} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import moment from "moment";



const Movie = ({ user }) => {
    let params =  useParams();

    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated: "",
        reviews: [],
        poster: "",
    });
    
   

    const fetchMovie = useCallback((id) => {
        MovieDataService.getMovie(id)
            .then(response => {
                setMovie({
                    id: response.data._id,
                    title: response.data.title,
                    rated: response.data.rated,
                    reviews: response.data.reviews ?? [],
                    poster: response.data.poster,
                });
            })
            .catch(e => {
                console.log(e);
            });
    }, []);
    
    useEffect(() => {
        fetchMovie(params.id);
    }, [params.id, fetchMovie]);

    const handleImageError = e => {
        e.target.src = "../images/NoPosterAvailable-crop.jpg";
    };

    // implememnt delete review
    const handleDeleteReview = (reviewId, index) => {
        // console.log(reviewId)
        MovieDataService.deleteReview(reviewId)
          .then(() => {
            setMovie(prevState => {
              const updatedReviews = [...prevState.reviews];
              updatedReviews.splice(index, 1);
              
              return {
                ...prevState,
                reviews: updatedReviews
              };
            });
            console.log('Review deleted successfully.');
          })
          .catch(error => {
            console.error('Failed to delete review:', error);
          });
      };





            
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                    <div className="poster">
                        <Image
                        className = "bigPicture"
                        src={movie.poster+"/100px250"}
                        onError={handleImageError}
                        fluid />
                    </div>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{movie.title}</Card.Header>
                        <Card.Body>
                            <Card.Text> 
                                {movie.plot}
                            </Card.Text>
                            { user && 
                                <Link to={"/movies/" + params.id+"/review"}>    
                                Add review
                                </Link> }
                        </Card.Body>
                        </Card>
                        <h2>Reviews</h2>
                        <br></br>
                        { movie.reviews.map((review, index) => {
                            return (
                                <div className="d-flex" key={index}>
                                    <div className="flex-shrink-0 reviewsText">
                                        <h5> {review.name + " reviewed on "} { moment(review.date).format("Do MMMM YYYY") }</h5>
                                        
                                        <p className="review">{review.review}</p>
                                        { user && user.googleId === review.user_id &&
                                         <Row>
                                            <Col>
                                                <Link to={{
                                                    pathname: "/movies/" + params.id + "/review/"
                                                }}
                                                state = {{
                                                    currentReview: review

                                                }} >
                                                    Edit
                                                </Link>
                                            </Col>
                                            <Col>
                                                <Button variant="link" onClick={() => {
                                                    // TODO 
                                                    handleDeleteReview(review._id, index)
                                                     
                                                }}>             
                                                    Delete
                                                </Button>
                                            </Col>

                                            </Row>}
                                    </div>
                                </div>
                            )
                        })}

                    </Col>
                </Row>
            </Container>
        </div>
    )
}


export default Movie;