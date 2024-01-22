import React, { useState, useEffect } from "react";

const UpdateInstrumentForm = (props) => {
  const [formData, setFormData] = useState({
    // Initialisez les champs du formulaire avec les valeurs actuelles de l'instrument
    name: "",
    price: "",
    stock: "",
    // Ajoutez d'autres champs selon vos besoins
  });

  useEffect(() => {
    // Chargez les données de l'instrument à modifier ici
    const IDInstrument = props.match.params.idInstrument;
    // Utilisez une fonction pour récupérer les détails de l'instrument par son ID
    // Exemple: fetchInstrumentDetails(instrumentId).then((data) => setFormData(data));
  }, [props.match.params.idInstrument]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoyez les données du formulaire pour mettre à jour l'instrument
    // Exemple: updateInstrument(formData).then(() => redirect to instrument list);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nom</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />

      <label>Prix</label>
      <input
        type="text"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
      />

      <label>Stock</label>
      <input
        type="text"
        name="stock"
        value={formData.stock}
        onChange={handleInputChange}
      />
    
      {/* Ajoutez d'autres champs selon vos besoins */}

      <button type="submit">Modifier</button>
    </form>
  );
};

export default UpdateInstrumentForm;
