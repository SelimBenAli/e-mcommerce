import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import ProductListAdmin from "./components/ProductListAdmin";
import AddProduct from "./components/AddProduct";
import AddCategorie from "./components/AddCategorie";
import Cart from "./components/Cart";
import {data, fetchData} from "./Data";
import Context from "./Context";
import "./index.css";
import Signup from "./components/signup";
import UpdateInstrumentPage from "./components/UpDateIns/UpdateInstrumentPage";
import CategoryListAdmin from "./components/CategoryListAdmin";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: {},
      products: [],
      categories: []
    };

    this.routerRef = React.createRef();
  }
  login = (usn, pwd) => {
    let user = data.users[0].users.find(u => u.username === usn && u.password === pwd);
    if (user) {
      this.setState({ user });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    }
    return false;
  };
  signup = (firstName, lastName, email, password) => {
    
    const newUser = {
      firstName,
      lastName,
      email,
      password, 
      accessLevel: 0, 
    };
  
    this.setState({ user: newUser });
  
    localStorage.setItem("user", JSON.stringify(newUser));
  
    return true; 
  };
  
  logout = e => {
    e.preventDefault();
    this.setState({ user: null });
    localStorage.removeItem("user");
  };

  addProduct = (product, callback) => {
    let products = this.state.products.slice();
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    this.setState({ products }, () => callback && callback());
  };

  addToCart = cartItem => {
    let cart = this.state.cart;
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].product.stock;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  checkout = () => {
    if (!this.state.user) {
      this.routerRef.current.history.push("/login");
      return;
    }
    const cart = this.state.cart;
    const products = this.state.products.map(p => {
      if (cart[p.name]) {
        p.stock = p.stock - cart[p.name].amount;
      }
      return p;
    });
    this.setState({ products });
    this.clearCart();
  };

  removeFromCart = cartItemId => {
    let cart = this.state.cart;
    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  clearCart = () => {
    let cart = {};
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  async componentDidMount() {
    try 
    { 
        await fetchData();
        let products = localStorage.getItem("products");
        let cart = localStorage.getItem("cart");
        let user = localStorage.getItem("user");
        let categories = localStorage.getItem("categories")
        console.log(data)
        console.log('*', data.initProducts[0].initProducts)
        products = products ? JSON.parse(products) : data.initProducts[0].initProducts;
        products = data.initProducts[0].initProducts;
        categories = data.categories[0].cats;
        console.log(categories)
        cart = cart ? JSON.parse(cart) : {};
        user = user ? JSON.parse(user) : null;
        this.setState({ categories, products, user, cart });
    }
    catch (error) {
      console.error('Error during component mount:', error);
    }
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          signup:this.signup,
          addProduct: this.addProduct,
          addCategorie :this.addCategorie,
          clearCart: this.clearCart,
          checkout: this.checkout
        }}
      >
        <Router ref={this.routerRef}>
          <div className="App">
            <nav
              className="navbar container"
              role="navigation"
              aria-label="main navigation"
            >
              <div className="navbar-brand">
                <b className="navbar-item is-size-4 ">E-Commerce</b>

                <a
                  href="/"
                  role="button"
                  className="navbar-burger burger"
                  aria-label="menu"
                  aria-expanded="false"
                  data-target="navbarBasicExample"
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ showMenu: !this.state.showMenu });
                  }}
                >
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>
              </div>
              <div
                className={`navbar-menu ${
                  this.state.showMenu ? "is-active" : ""
                }`}
              >
                <div className="navbar-item has-dropdown is-hoverable">
                  <p  className="navbar-link">  Instruments </p>
                  <div className="navbar-dropdown">
                    <Link to="/products" className="navbar-item">
                      Liste Instruments
                    </Link>
                    
                    {this.state.user && this.state.user.accessLevel < 1 && (
                      <Link to="/add-product" className="navbar-item">
                        Add Instrument
                      </Link>
                    )}
                    </div>
                  </div>

                  {this.state.user && this.state.user.accessLevel <1  && (
                  <div className="navbar-item has-dropdown is-hoverable">
                  <p  className="navbar-link">  Categories </p>
                  <div className="navbar-dropdown">
                  
                    <Link to="/categorieListAdmin" className="navbar-item">
                      Liste Categories
                    </Link>
                  <Link to="/add-categorie" className="navbar-item">
                    Add Categorie
                  </Link>
                </div>
                </div>
                )}
                 {this.state.user && this.state.user.accessLevel > 0 && (
                <Link to="/cart" className="navbar-item">
                  Cart
                  <span
                    className="tag is-primary"
                    style={{ marginLeft: "5px" }}
                  >
                    {Object.keys(this.state.cart).length}
                  </span>
                </Link>)}
                {!this.state.user ? (
                  <Link to="/login" className="navbar-item">
                    Login
                  </Link>
                ) : (
                  <a href="/" className="navbar-item" onClick={this.logout}>
                    Logout
                  </a>
                )}
                <Link to="/signup" className="navbar-item">
                  Signup
                  </Link>
              </div>
            </nav>
            <Switch>
            {this.state.user && this.state.user.accessLevel > 0 && (
              <Route exact path="/" component={ProductList} />)}
              {this.state.user && this.state.user.accessLevel <= 0 && (
              <Route exact path="/" component={ProductListAdmin} />)}
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} /> 
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/add-product" component={AddProduct} />
              <Route path="/" exact component={ProductListAdmin} />
              <Route path="/updateIns/:IDInstrument" component={UpdateInstrumentPage} />
              <Route exact path="/add-categorie" component={AddCategorie} />
              {this.state.user && this.state.user.accessLevel > 0 && (
              <Route exact path="/products" component={ProductList} />)}
              {this.state.user && this.state.user.accessLevel <= 0  && (
              <Route exact path="/products" component={ProductListAdmin} />)}
                <Route path="/categorieListAdmin" component={CategoryListAdmin} />
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}
