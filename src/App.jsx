import React, { useState, useEffect } from "react";
import Saldo from "./components/Saldo";
import MovimientoForm from "./components/MovimientoForm";
import MovimientoList from "./components/MovimientoList";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [saldoInicial, setSaldoInicial] = useState(0);
  const [movimientos, setMovimientos] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [movimientoEditado, setMovimientoEditado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitulo, setModalTitulo] = useState("");
  const [modalMensaje, setModalMensaje] = useState("");

  const agregarMovimiento = (nuevoMovimiento) => {
    const saldoFinal = calcularSaldoFinal();
    if (
      nuevoMovimiento.tipoMovimiento === "Gasto" &&
      saldoFinal < nuevoMovimiento.cantidad
    ) {
      // Mostrar modal de error
      setModalTitulo("Error");
      setModalMensaje(
        "No cuenta con saldo suficiente para realizar este movimiento."
      );
      setModalVisible(true);
      return;
    }

    setMovimientos([...movimientos, nuevoMovimiento]);

    setModalTitulo("Registro Exitoso");
    setModalMensaje(
      `${
        nuevoMovimiento.tipoMovimiento === "Ingreso" ? "Ingreso" : "Gasto"
      } agregado con éxito.`
    );
    setModalVisible(true);
  };

  const eliminarMovimiento = (id) => {
    const movimientosActualizados = movimientos.filter(
      (movimiento) => movimiento.id !== id
    );
    setMovimientos(movimientosActualizados);
  };

  const editarMovimiento = (movimiento) => {
    setMovimientoEditado(movimiento);
  };

  const actualizarMovimiento = (movimientoActualizado) => {
    const movimientosActualizados = movimientos.map((movimiento) =>
      movimiento.id === movimientoActualizado.id
        ? movimientoActualizado
        : movimiento
    );
    setMovimientos(movimientosActualizados);
    setMovimientoEditado(null);
  };

  const calcularSaldoFinal = () => {
    let saldoFinal = saldoInicial;
    for (const movimiento of movimientos) {
      if (movimiento.tipoMovimiento === "Ingreso") {
        saldoFinal += movimiento.cantidad;
      } else {
        saldoFinal -= movimiento.cantidad;
      }
    }
    return saldoFinal;
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalTitulo("");
    setModalMensaje("");
  };

  useEffect(() => {
    // Configura un temporizador para cerrar automáticamente el modal después de 3 segundos
    if (modalVisible) {
      const timer = setTimeout(() => {
        closeModal();
      }, 3000);

      // Limpia el temporizador si el componente se desmonta antes de que se cierre el modal
      return () => clearTimeout(timer);
    }
  }, [modalVisible]);

  return (
    <div className="container_app">
      <header className="header_app">
        <h1>Ingresos y Gastos</h1>
        <div className="container_saldo">
          <div className="saldo_colum">
            <label>Saldo Inicial</label>
            <br></br>
            <input
              type="number"
              className="input_100"
              value={saldoInicial}
              onChange={(e) => setSaldoInicial(Number(e.target.value))}
            />
          </div>
          <Saldo saldo={calcularSaldoFinal()} />
        </div>
      </header>
      <main>
        <section>
          <MovimientoForm agregarMovimiento={agregarMovimiento} />
          {movimientoEditado && (
            <MovimientoForm
              movimientoEditado={movimientoEditado}
              actualizarMovimiento={actualizarMovimiento}
            />
          )}
        </section>

        <section>
          <div>
            <input
              type="text"
              value={busqueda}
              placeholder="busca en la lista"
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <select
              onChange={(e) => setFiltroTipo(e.target.value)}
              value={filtroTipo}
            >
              <option value="Todos">Todos</option>
              <option value="Ingreso">Ingreso</option>
              <option value="Gasto">Gasto</option>
            </select>
          </div>
          <MovimientoList
            movimientos={movimientos}
            filtroTipo={filtroTipo}
            busqueda={busqueda}
            eliminarMovimiento={eliminarMovimiento}
            editarMovimiento={editarMovimiento}
          />
        </section>
      </main>

      {modalVisible && (
        <Modal
          titulo={modalTitulo}
          mensaje={modalMensaje}
          closeModal={closeModal}
        />
      )} 
    </div>
  );
}

export default App;
