import React, { useState, useEffect } from "react";

function MovimientoList({
  movimientos,
  filtroTipo,
  busqueda,
  eliminarMovimiento,
  editarMovimiento
}) {
  const [filteredMovimientos, setFilteredMovimientos] = useState([]);
  const movimientoContador = movimientos.length;

  useEffect(() => {
    let filtered = movimientos;
    if (filtroTipo !== "Todos") {
      filtered = filtered.filter(
        (movimiento) =>
          movimiento.tipoMovimiento === filtroTipo &&
          movimiento.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    } else {
      filtered = filtered.filter((movimiento) =>
        movimiento.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }
    setFilteredMovimientos(filtered);
  }, [movimientos, filtroTipo, busqueda]);

  const renderTipoMovimiento = (tipoMovimiento) => {
    const estilo = tipoMovimiento === "Ingreso" ? "green" : "red";
    return { background: estilo };
  };

  const formatoCantidad = (cantidad) => {

    return cantidad.toLocaleString('es-CO');
  };

  return (
    <div>
      <h2 className="lista_movimientos_title">Lista de Movimientos  <span>{movimientoContador}</span></h2>
      <ul className="lista_movimientos">
        {filteredMovimientos.map((movimiento) => (
          <li className="lista_movimientos_item" key={movimiento.id}>
            <button onClick={() => eliminarMovimiento(movimiento.id)}>
            ❌
            </button>
            <button onClick={() => editarMovimiento(movimiento)}>✏️</button>
            <p>{movimiento.nombre}  <span style={renderTipoMovimiento(movimiento.tipoMovimiento)}>{formatoCantidad(movimiento.cantidad)}</span></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovimientoList;
