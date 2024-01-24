import React, { Fragment, Component } from "react"; 
import withContext from "../withContext";
import "../index.css";
import { Link } from "react-router-dom";

class CategoryListAdmin extends Component { 
  deleteCategory = async (categoryId) => { 
    console.log("delete", categoryId);
    try {
      const response = await fetch("http://192.168.1.13:8086/api/delete-categorie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryId,
        }),
      });

      if (response.ok) {
        await this.props.context.AddCategorie({
          categoryId,
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
    const { categories } = this.props.context; 

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
              <table className="table is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Supprimer</th>
                    <th>Modifier</th>
                  </tr>
                </thead>
                <tbody>
                  {categories && categories.length ? (
                    categories.map((category, index) => (
                      <tr key={index}>
                        <td>{category.IDCategorie}</td>
                        <td>{category.Nom}</td>
                        <td>{category.Description}</td>
                        <td>
                          <button
                            className="button is-danger"
                            onClick={() => this.deleteCategory(category.IDCategorie)} // Add 'this.' to reference class method
                          >
                            Supprimer
                          </button>
                        </td>
                        <td>
                        <Link
                          to={{
                            pathname: '/modifierCategorie',
                            state: { CatId: category.IDCategorie,instNom:category.Nom,instDesc:category.Description}
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
                            No category found!
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

export default withContext(CategoryListAdmin);
