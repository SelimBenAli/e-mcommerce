import React, { Component, Fragment } from "react";
import withContext from "../withContext";
import { Redirect } from "react-router-dom";

const initState = {
  nom: "",
  shortDesc: "",
  description:"",
  Prix: "",
  categorie :"",
  Stock: "",
  Image: "" ,

  categories: ["Category1", "Category2", "Category3"]
};



class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  save = e => {
    e.preventDefault();
    const { nom, shortDesc, description, Prix, categorie,Stock,Image } = this.state;
    if (nom && Prix) {
      this.props.context.addProduct(
        {
          nom,
          shortDesc,
          description,
          Prix,
          categorie,
          Stock: Stock || 0,
          Image

        },
        () => this.setState(initState)
      );
    } else {
      this.setState({ error: "Please Enter name and price" });
    }
  };
  
  handleChange = e =>/* {
  const { name, value } = e.target;
  let numericValue = value;

  // Si le champ est Prix ou Stock, assurez-vous que la valeur est numérique et supérieure ou égale à zéro
  if (name === "price" || name === "stock") {
    numericValue = parseFloat(value);
    if (isNaN(numericValue) || numericValue < 0) {
      this.setState({ error: "Veuillez entrer une valeur numérique supérieure ou égale à zéro." });
      return;
    }
  }

  this.setState({ [name]: numericValue, error: "" }); */
    this.setState({ [e.target.name]: e.target.value, error: "" });

  render() {
    const { nom, shortDesc, description, Prix, categorie,Stock,Image } = this.state;
    const { user } = this.props.context;
    return !(user && user.accessLevel < 1) ? (
      <Redirect to="/" />
    ) : (
      <Fragment>
        <div className="hero is-primary ">
          <div className="hero-body container">
            {/* <h4 className="title">Login</h4> */}
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.save}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">nom de l'instrument : </label>
                <input
                  className="input"
                  type="text"
                  name="nom"
                  value={nom}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Short Description: </label>
                <input
                  className="input"
                  type="text"
                  name="shortDesc"
                  value={shortDesc}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Description: </label>
                <textarea
                  className="textarea"
                  type="text"
                  rows="2"
                  style={{ resize: "none" }}
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">prix: </label>
                <input
                  className="input"
                  type="number"
                  name="Prix"
                  value={Prix}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Categorie: </label>
                <div className="control">
                  <div className="select">
                    <select
                      name="categorie"
                      value={categorie}
                      onChange={this.handleChange}
                      required
                    >
                      <option value="" disabled>
                        Sélectionnez une catégorie
                      </option>
                      {this.state.categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Stock: </label>
                <input
                  className="input"
                  type="number"
                  name="Stock"
                  value={Stock}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">image: </label>
                <input
                  className="input"
                  type="file"
                  name="Image"
                  value={Image}
                  onChange={this.handleChange}
                  required
                />
              </div>
             
              {this.state.error && (
                <div className="error">{this.state.error}</div>
              )}
              <div className="field is-clearfix">
                <button
                  className="button is-primary is-outlined is-pulled-right"
                  type="submit"
                  onClick={this.save}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default withContext(AddProduct);
