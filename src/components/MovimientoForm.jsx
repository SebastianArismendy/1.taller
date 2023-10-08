import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function MovimientoForm({
  agregarMovimiento,
  movimientoEditado,
  actualizarMovimiento,
}) {
  const [tipoMovimiento, setTipoMovimiento] = useState("Ingreso");
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");

  useEffect(() => {
    if (movimientoEditado) {
      setTipoMovimiento(movimientoEditado.tipoMovimiento);
      setNombre(movimientoEditado.nombre);
      setCantidad(movimientoEditado.cantidad.toString());
    }
  }, [movimientoEditado]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() === "" || isNaN(cantidad) || Number(cantidad) <= 0) {
      return;
    }
    const nuevoMovimiento = {
      id: movimientoEditado ? movimientoEditado.id : uuidv4(),
      tipoMovimiento,
      nombre,
      cantidad: Number(cantidad),
    };
    if (movimientoEditado) {
      // Si estamos editando, llamamos a actualizarMovimiento
      actualizarMovimiento(nuevoMovimiento);
    } else {
      // Si estamos creando uno nuevo, llamamos a agregarMovimiento
      agregarMovimiento(nuevoMovimiento);
    }
    setTipoMovimiento("Ingreso");
    setNombre("");
    setCantidad("");
  };

  return (
    <div>
      <h2>{movimientoEditado ? "Editar Movimiento" : "Registrar movimiento"}</h2>
      <form className="form_horizontal" onSubmit={handleSubmit}>
        <label className="label_form_horizontal">
          Tipo Movimiento: 
          <select
            onChange={(e) => setTipoMovimiento(e.target.value)}
            value={tipoMovimiento}
          >
            <option value="Ingreso">Ingreso</option>
            <option value="Gasto">Gasto</option>
          </select>
        </label>
        <label className="label_form_horizontal">
          Nombre: 
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>
        <label className="label_form_horizontal">
           Cantidad: 
          <input
            type="number"
            placeholder="Cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
        </label>
        <button type="submit">
          {movimientoEditado ? "Guardar" : "Agregar"}
        </button>
      </form>
    </div>
  );
}

export default MovimientoForm;
