import React from "react";

function Saldo({ saldo }) {
  return (
    <div className="saldo_colum">
      <p>Saldo final: </p>
      <p className="saldo_parrafo">{saldo}</p>
    </div>
  );
}

export default Saldo;
