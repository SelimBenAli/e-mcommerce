import React, { Fragment } from "react";
import ProductItem from "./ProductItem";
import withContext from "../withContext";
import "../index.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
  

const ProductList = props => {
  const { products } = props.context;
  return (
    <Fragment>
      <div className="hero qss" >
        <div className="hero-body container">
        <div className="field has-addons">
      <div className="control">
        <input className="input" type="text" placeholder="Search" />
      </div>
      {/* <div className="control">
        <button className="button is-info">Search</button>
      </div> */}
      </div>
        </div>        
      </div>
      <br />
      <div className="container">
        <div className="column columns is-multiline">
          {products && products.length ? (
            products.map((product, index) => (
              
                <ProductItem
                
                  product={product}
                  key={index}
                  addToCart={props.context.addToCart}
                />
              
            ))
          ) : (
            <div className="column">
              <span className="title has-text-grey-light">
                No product found!
              </span>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default withContext(ProductList);
