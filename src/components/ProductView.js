import React, { Component } from "react";
import { useProductView } from "./useProductView";
import RatingStars from './RatingStars';


import {
  Row,
  Col,
  Card,
  Label,
  Input,
  Button,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  FormGroup,
  CardSubtitle,
} from "reactstrap";

const initState = {
  instrumentId: 0,
  instNom: "",
  instStock: 0,
  instPrix: 0.0,
  instDesc: "",
  instShortDesc: "",
  reviews: [],
  clientID: 0
};

class ProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initState,
      newReview: {
        rating: 0,
        comment: "",
        clientID: 0,
      },
    };
  }

  componentDidMount() {
    // Access the product from the location state
    const { state } = this.props.location;
    console.log('##', state.clientID)
    this.setState({
      instrumentId: state.IDInstrument,
      instNom: state.Nom,
      instStock: state.Stock,
      instPrix: state.Prix,
      instDesc: state.Desc,
      instShortDesc: state.shortDesc,
      clientID: state.clientID
    });
    console.log(state.instrumentId);

    this.getReviewsAPI(state.IDInstrument);
  }

  getReviewsAPI = (x) => {
  const { instrumentId } = this.state;
  const apiUrl = "http://127.0.0.1:8086/api/get-reviews";
  fetch(apiUrl, {
       method: "POST",
      headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ IDInstrument: x }),
     })
       .then(response => response.json())
       .then(data => {
         console.log("API Response:", data);
         this.setState({
           reviews: data.liste
         })
       })
       .catch(error => {
         console.error("API Error:", error);
       });
   };

  renderStarRating(rating) {
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i}>&#9733;</span>); // Full star unicode character
    }

    if (halfStar) {
      stars.push(<span key="half">&#9734;&#9733;</span>); // Half star unicode characters
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`}>&#9734;</span>); // Empty star unicode character
    }

    return stars;
  }

  renderReviews() {
    const { reviews } = this.state;

    if (!reviews || reviews.length === 0) {
      return null; // No reviews to display
    }

    return reviews.map((review, index) => (
      <div key={index}>
        <hr /> {/* Add a horizontal line to separate reviews */}

        <CardSubtitle>
          <strong>Rating: {this.renderStarRating(review[0])}</strong>
        </CardSubtitle>
        <CardText>{review[1]}</CardText>
        <CardSubtitle>
          <em>{new Date(review[2]).toUTCString()}</em>
        </CardSubtitle>
        <CardSubtitle>
          <strong>Client: {review[3]}</strong>
        </CardSubtitle>
      </div>
    ));
  }

  // Handle input changes in the review form
  handleReviewChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      newReview: {
        ...prevState.newReview,
        [name]: value,
      },
    }));
  };

  // Handle form 
  handleReviewSubmit = (e) => {
    e.preventDefault();
    // You can add additional validation here if needed
    const { newReview } = this.state;
    const { instrumentId } = this.props.location.state;

    // Make an API call to submit the review
    // You might want to extract this logic into a separate function
    // and handle the API call in a more modular way
    fetch("http://127.0.0.1:8086/api/submit-review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        IDInstrument: instrumentId,
        rating: newReview.rating,
        comment: newReview.comment,
        clientName: newReview.clientName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Review submitted successfully:", data);
        // You might want to update the state to refresh the reviews
        // this.getReviewsAPI(instrumentId); // Commented out the API call since you requested it without the review API
        // Optionally, you can reset the form
        this.setState({
          newReview: {
            rating: 0,
            comment: "",
            clientName: "",
          },
        });
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
        // Handle errors
      });
  };

  render() {
    const { instrumentId, instNom, instStock, instPrix, instDesc, instShortDesc, reviews, newReview, clientID  } = this.state;
    return (
      <table className="table">
        <Card className="product-details">
          <Row>
            <tr>
              <td>
                <Col sm="12" md="4">
                  <CardImg
                    left="true"
                    width="30%"
                    src={`http://127.0.0.1:8086/static/${instrumentId}.png`}
                    alt=""
                  />
                </Col>
              </td>
              <td>
                <Col sm="12" md="8">
                  <CardBody>
                    <CardTitle>{instNom}</CardTitle>
                    <CardText>{instShortDesc}</CardText>
                    <CardText>{instDesc}</CardText>
                    <CardSubtitle>
                      <strong>Price: {instPrix}</strong>
                    </CardSubtitle>
                    <CardSubtitle>
                      <strong>stock: {instStock}</strong>
                    </CardSubtitle>
                    <Button className="button is-primary is-outlined">Add to card</Button>
                  </CardBody>
                </Col>
              </td>
            </tr>
            <tr>
              <td colSpan="">
                
              <RatingStars onRatingChange={(newRating) => console.log('New Rating:', newRating)} clientId={{clientID}} instId={instrumentId}/>


                  
              </td>
              <td>{this.renderReviews()}
            <hr /></td>
            </tr>
            
          </Row>
        </Card>
      </table>
    );
  }
}

export default ProductView;
