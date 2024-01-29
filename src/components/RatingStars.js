import React, { useState } from 'react';
import './RatingStars.css'; // You can style your stars in a separate CSS file

import {
  Label,
  Input,
  Button,
  FormGroup,
} from "reactstrap";

const RatingStars = ({ onRatingChange, clientId, instId }) => {
  const [rating, setRating] = useState(0); // Initial rating is 0
  const [comment, setComment] = useState('');

  const handleStarClick = (starValue) => {
    setRating(starValue);
    onRatingChange(starValue, clientId, instId); // Notify parent component of the rating change along with clientId
  };

  const handleReviewChange = (event) => {
    const { value } = event.target;
    setComment(value);
  };

  const handleReviewSubmit = () => {
    // Call a function to handle review submission and pass necessary parameters
    submitReview(comment, rating, clientId, instId);
  };

  const submitReview = (comment, rating, clientId, instId) => {
    const client = clientId.clientID;
    
    const data = {
      comment: comment,
      rating: rating,
      clientId: client,
      instId: instId
    };
  
    fetch('http://127.0.0.1:8086/api/send-reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
      return response.json();
    })
    .then(result => {
      console.log('Review submitted successfully:', result);
    })
    .catch(error => {
      console.error('Error submitting review:', error);
    });
  };
  

  return (


    <form onSubmit={(event) => { event.preventDefault(); handleReviewSubmit(); }} className="form">
      <FormGroup>
        <Label for="rating">Rating:</Label>
        <div className="rating-stars">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <button
                key={index}
                className={starValue <= rating ? "star-filled" : "star-empty"}
                onClick={() => handleStarClick(starValue)}
              >
                ★
              </button>
            );
          })}
        </div>
      </FormGroup>
      <FormGroup>
        
        <Input
          placeholder='Commentaire...'
          type="textarea"
          name="comment"
          id="comment"
          value={comment}
          onChange={handleReviewChange}
          required
        />
      </FormGroup>
      <Button className="button is-primary is-outlined" type="submit">
        Submit your Review
      </Button>
    </form>
  );
};

export default RatingStars;
