import React, { Component, Fragment } from "react";
import withContext from "../withContext";
import CartItem from "./CartItem";
import "../index.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: 0,
      cart: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchCartData();

    // Add event listener for page reload
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  }

  componentWillUnmount() {
    // Remove event listener when component is unmounted
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  }

  handleBeforeUnload = () => {
    // Clear any specific data or perform cleanup if needed before page reload
  };

  fetchCartData = async () => {
    let cu; // Declare cu here
  
    // Check if userId is stored in sessionStorage
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId !== null) {
      cu = storedUserId;
    } else {
      const { user } = this.props.context;
      cu = user.usersi
  
      // Store userId in sessionStorage
      sessionStorage.setItem('userId', cu);
    }
    console.log(cu)
  
    try {
      const response = await fetch("http://127.0.0.1:8086/api/read-panier", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: cu,
        }),
      });
  
      if (response.ok) {
        const cartData = await response.json();
        console.log(cartData);
        this.setState({ cart: cartData.basketProd, isLoading: false, userid: cu });
      } else {
        console.error("Failed to fetch cart data");
        this.setState({ isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { cart } = this.state;
    const { isLoading } = this.state;
    const { userid } = this.state; 

    return (
      <Fragment>
        <div className="hero qss">
          <div className="hero-body container">
            <h4 className="title">My Cart</h4>
          </div>
        </div>
        <br />
        {isLoading ? (
          <div className="container">Loading...</div>
        ) : (
          <div className="container">
            {cart.length ? (
              <div className="column columns is-multiline">
                {cart.map((cartItem, index) => (
                  <CartItem
                    cartKey={index.toString()}
                    key={index}
                    cartItem={cartItem}
                    product={cartItem}
                    userId={userid}
                    removeFromCart={this.props.context.removeFromCart}
                  />
                ))}
                <div className="column is-12 is-clearfix">
                  <br />
                  <div className="is-pulled-right">
                    <button
                      onClick={() => this.props.context.clearCart(userid)}
                      className="button is-warning"
                    >
                      Clear cart
                    </button>{" "}
                    <button
                      className="button is-success"
                      onClick={this.props.context.checkout}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="column">
                <div className="title has-text-grey-light">No item in cart!</div>
              </div>
            )}
          </div>
        )}
      </Fragment>
    );
  }
}

export default withContext(Cart);
