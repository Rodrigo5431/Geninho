import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "../../../Components/Header";

const pedidosIniciais = JSON.parse(localStorage.getItem('pedidos')) || [
  { id: 1, descricao: "Pedido 1", status: "ABERTO" },
  { id: 2, descricao: "Pedido 2", status: "EM PREPARO" },
  { id: 3, descricao: "Pedido 3", status: "CONCLUÍDO" },
];

const AtualizarStatusPedidos = ({ userRole }) => {
  useEffect(() => {
    document.title = "Atualizar Status dos Pedidos";
  }, []);
  const [pedidos, setPedidos] = useState(pedidosIniciais);

  useEffect(() => {
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
  }, [pedidos]);

  const handleStatusChange = (id, novoStatus) => {
    setPedidos(
      pedidos.map((pedido) =>
        pedido.id === id ? { ...pedido, status: novoStatus } : pedido
      )
    );
    alert("Status do pedido atualizado com sucesso!");
  };

  if (userRole !== "chefe") {
    return <p>Você não tem permissão para alterar o status dos pedidos.</p>;
  }

  return (
    <>
      <Header />
      <section className="atualizar-status-container">
        <h2>Atualizar Status dos Pedidos</h2>
        <section className="lista-pedidos">
          {pedidos.map((pedido) => (
            <section key={pedido.id} className="pedido-item">
              <p>
                {pedido.descricao} - Status: {pedido.status}
              </p>
              <select
                value={pedido.status}
                onChange={(e) => handleStatusChange(pedido.id, e.target.value)}
                aria-label="Alterar status do pedido"
              >
                <option value="ABERTO">ABERTO</option>
                <option value="EM PREPARO">EM PREPARO</option>
                <option value="CONCLUÍDO">CONCLUÍDO</option>
              </select>
            </section>
          ))}
        </section>
      </section>
    </>
  );
};

export default AtualizarStatusPedidos;
