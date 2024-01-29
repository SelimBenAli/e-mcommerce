import React, { Component, Fragment } from "react";
import withContext from "../withContext";
import { Redirect } from "react-router-dom";

const initState = {
    IDInstrument:"",
  name: "",
  price: "",
  stock: "",
  shortDesc: "",
  description: "",
  categorie: "",
  Image: "",
  categories: [],
  instrumentId: null, // Initialize instrumentId in state
  instName: "",
  instPrice: 0, // or initialize with the appropriate default value
  instStock: 0,
};

const Url = "http://192.168.1.13:8086";

class ModifierInstrument extends Component {
    
    constructor(props) {
        super(props);
        const { categories } = props.context;
        console.log(categories);
        this.state = {
          ...initState,
          categories: categories,
          instrumentId: null, // Initialize instrumentId in state
        };
      }

      componentDidMount() {
        // Access the instrumentId from the location state
        const { state } = this.props.location;
        console.log(state.instrumentId, state.instName)
        this.setState({
            IDInstrument: state.instrumentId,
            name: state.instName || "", 
            price: state.instPrice || 0,
            stock: state.instStock || 0,
            shortDesc : state.intshortDesc,
            description:state.description,
          });
      }
    
      
  save = async (e) => {
    e.preventDefault();
    const { IDInstrument,name, price, stock, shortDesc, description, categorie } = this.state;

    if (name && price) {
      try {
        const response = await fetch(Url + "/api/update-instrument", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            IDInstrument,
            name,
            price,
            shortDesc,
            description,
            categorie,
            stock: stock || 0
          })
        });

        if (response.ok) {
          // Product added successfully, you can handle the response as needed
          console.log("Product modified successfully");
          this.setState(initState);
        } else {
          // Handle errors
          console.error("Failed to modify product");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      this.setState({ error: "Please Enter name and price" });
    }
  };

  handleChange = (e) =>
    this.setState({ [e.target.name]: e.target.value, error: "" });

  render() {
    const {name, price, stock, shortDesc, description, categorie, Image } = this.state;
    const { user } = this.props.context;

    if (!(user && user.accessLevel < 1)) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Modifier Instrument </h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.save}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">Product Name: </label>
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Price: </label>
                <input
                  className="input"
                  type="number"
                  name="price"
                  value={price}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Available in Stock: </label>
                <input
                  className="input"
                  type="number"
                  name="stock"
                  value={stock}
                  onChange={this.handleChange}
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
                        <option key={category} value={category.IDCategorie}>
                          {category.Nom}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
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
                  Modifier
                </button>
              </div>
            </div>
          </div>
        </form>
      </Fragment>
    )
  }
}

export default withContext(ModifierInstrument);