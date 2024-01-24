import React, { Component } from "react";
import { useProductView } from "./useProductView";
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
  reviews: []
};

class ProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {
          ...initState
    };
  }

  componentDidMount() {
    // Access the product from the location state
    const { state } = this.props.location;
    console.log('##', state.IDInstrument)
    this.setState({
      instrumentId: state.IDInstrument,
      instNom: state.Nom,
      instStock: state.Stock,
      instPrix: state.Prix,
      instDesc: state.Desc,
      instShortDesc: state.shortDesc
    });
    console.log(state.instrumentId); 

    this.getReviewsAPI(state.IDInstrument);

  }

  getReviewsAPI = (x) => {
    const { instrumentId } = this.state;

    // Your API endpoint URL
    const apiUrl = "http://192.168.1.13:8086/api/get-reviews";

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
        // Handle errors
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



  render() {
    const { instrumentId, instNom, instStock, instPrix, instDesc, instShortDesc, reviews } = this.state;
    return (
    <Card className="product-details">
      <Row>
        <Col sm="12" md="4">
          <CardImg
            left="true"
            width="30%"
            src={`http://192.168.1.13:8086/static/${instrumentId}.png`}
            alt=""
          />
        </Col>
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

            {this.renderReviews()}
            <hr />
            
            
            
            <Button color="primary">Add to basket</Button>
          </CardBody>
        </Col>
      </Row>
    </Card>
  );}
};

export default ProductView;
