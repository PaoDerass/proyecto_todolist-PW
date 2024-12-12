import React, { useState } from "react";

const Campo = ({ agregarTarea }) => {
  const [tituloTarea, setTituloTarea] = useState("");

  const manejarAgregar = () => {
    if (tituloTarea.trim()) {
      agregarTarea(tituloTarea);
      setTituloTarea("");
    } else {
      alert("Por favor, escribe una tarea.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Escribe una tarea..."
        value={tituloTarea}
        onChange={(e) => setTituloTarea(e.target.value)}
      />
      <button onClick={manejarAgregar}>Agregar Tarea</button>
    </div>
  );
};

export default Campo;