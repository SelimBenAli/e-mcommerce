import React from "react";
import { Link } from "react-router-dom";

const ProductItem = props => {
  const { product, user } = props;
  console.log('/////////', user)
  return (

    <Link to={{ pathname: "/product-details", state: {IDInstrument: product.IDInstrument, Nom: product.name, Stock: product.stock, Prix: product.price, Desc: product.description, shortDesc: product.shortDesc, clientID: user.usersid}}} className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img
                src={`http://127.0.0.1:8086/static/${product.IDInstrument}.png`}
                alt="product"
              />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              {product.name}{" "}
              <span className="tag is-primary">${product.price}</span>
            </b>
            <div>{product.shortDesc}</div>

            {product.stock > 0 ? (
              <small>{product.stock + " Available"}</small>
            ) : (
              <small className="has-text-danger">Out Of Stock</small>
            )}
            <div className="is-clearfix">
              <button
                className="button is-small is-outlined is-primary   is-pulled-right"
                onClick={() =>
                  props.addToCart({
                    id: product.IDInstrument,
                    uid: user.usersid,
                    amount: 1
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
