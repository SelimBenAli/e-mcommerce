import React from "react";
import UpdateInstrumentForm from "./UpdateInstrumentForm";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const UpdateInstrumentPage = (props) => {
  return (
    <div>
      <div className="header">
        <h2>Modifier un instrument</h2>
        <Link to="/" className="button is-info">
          Retour à la liste
        </Link>
      </div>
      <UpdateInstrumentForm {...props} />
    </div>
  );
};

export default UpdateInstrumentPage;
