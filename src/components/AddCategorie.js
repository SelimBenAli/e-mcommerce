import React, { Component, Fragment } from "react";
import withContext from "../withContext";
import { Redirect } from "react-router-dom";

const initState = {
  nom: "",
  description: "",
};

class AddCategorie extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  save = async (e) => {
    e.preventDefault();
    const { nom, description } = this.state;
    if (nom && description) {
      try {
        const response = await fetch("http://127.0.0.1:8086/api/create-categorie", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom,
            description,
          }),
        });

        if (response.ok) {
          // Assuming AddCategorie is an asynchronous function, use it here
          await this.props.context.AddCategorie({
            nom,
            description,
          });
          this.setState(initState);
        } else {
          console.error("Failed to save:", response.statusText);
        }
      } catch (error) {
        console.error("Error during save:", error.message);
      }
    } else {
      this.setState({ error: "Please Enter name and description" });
    }
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value, error: "" });

  render() {
    const { nom, description } = this.state;
    const { user } = this.props.context;

    return !(user && user.accessLevel < 1) ? (
      <Redirect to="/" />
    ) : (
      <Fragment>
        <div className="hero is-primary ">
          <div className="hero-body container">
          <h4 className="title">Add Categorie </h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.save}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">Nom du categorie: </label>
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
              {this.state.error && <div className="error">{this.state.error}</div>}
              <div className="field is-clearfix">
                <button
                  className="button is-primary is-outlined is-pulled-right"
                  type="submit"
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

export default withContext(AddCategorie);
