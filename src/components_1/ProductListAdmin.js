import React, { Component, Fragment } from "react";
import withContext from "../withContext";
import { Link } from "react-router-dom";

class ProductListAdmin extends Component {
  deleteProduct = async (productId) => {
    console.log("delete", productId);
      try {
        const response = await fetch("http://192.168.1.13:8086/api/delete-instrument", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
          }),
        });

        if (response.ok) {
          await this.props.context.AddCategorie({
            productId,
          });
        } else {
          console.error("Failed to save:", response.statusText);
        }
      } catch (error) {
        console.error("Error during save:", error.message);
      }
     
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value, error: "" });

  
  render() {
    const { products } = this.props.context;

    return (
      <Fragment>
        <div className="hero qss">
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
                          to={{
                            pathname: '/ModifierInstrument',
                            state: { instrumentId: product.IDInstrument,instName:product.name,instPrice:product.price,instStock:product.stock,intshortDesc:product.shortDesc,intDesc:product.description}
                          }}
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
