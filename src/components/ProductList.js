import React, { Fragment, useState } from "react";
import ProductItem from "./ProductItem";
import withContext from "../withContext";
import "../index.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ProductList = (props) => {
  const { products, user } = props.context;
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts =
    searchQuery === ""
      ? products
      : products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <Fragment>
      <div className="hero qss">
        <div className="hero-body container">
          <div className="field has-addons">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="column columns is-multiline">
          {filteredProducts && filteredProducts.length ? (
            filteredProducts.map((product, index) => (
              <ProductItem
                user={user}
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
