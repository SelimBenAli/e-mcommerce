import React, { Component, Fragment } from "react";
import withContext from "../withContext";
import { Link } from "react-router-dom";

class ProductListAdmin extends Component {
  deleteProduct = async (productId) => {
    console.log("delete", productId);
    // You can add the logic to delete the product here
  };

  render() {
    const { products } = this.props.context;

    return (
      <Fragment>
        <div className="hero qss">
          <div className="hero-body container">
            {/* <p className="t"></p> */}
          </div>
        </div>
        <br />
        <div className="container">
          <div className="card">
            <div className="card-content">
              <table className="table is-striped is-fullwidth ">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prix</th>
                    <th>Stock</th>
                    <th>Supprimer</th>
                    <th>Modifier</th>
                    {/* <th>Type</th> */}
                  </tr>
                </thead>
                <tbody>
                  {products && products.length ? (
                    products.map((product, index) => (
                      <tr key={index}>
                        <td>{product.IDInstrument}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td>
                          <button
                            className="button is-danger"
                            onClick={() =>
                              this.deleteProduct(product.IDInstrument)
                            }
                          >
                            Supprimer
                          </button>
                        </td>
                        <td>
                          <Link
                            to={`/updateInstrumentPage/${product.IDInstrument}`}
                            className="button is-success"
                          >
                            Modifier
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">
                        <div className="column">
                          <span className="title has-text-grey-light">
                            No product found!
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withContext(ProductListAdmin);
