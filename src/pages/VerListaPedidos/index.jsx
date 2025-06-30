import React, { useState, useEffect } from "react";
import "./styles.css";
// import Header from "../../components/Header";

const VerListaPedidos = ({ userRole }) => {
  useEffect(() => {
    document.title = "Lista de Pedidos";
  }, []);

  const [pedidos, setPedidos] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await fetch("URL_DA_SUA_API_AQUI");
        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      }
    };

    fetchPedidos();
  }, []);

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  const pedidosFiltrados = pedidos.filter(
    (pedido) =>
      pedido.cliente.toLowerCase().includes(filtro.toLowerCase()) ||
      pedido.itens.some((item) =>
        item.nome.toLowerCase().includes(filtro.toLowerCase())
      )
  );

  if (userRole !== "administrador") {
    return <p>Você não tem permissão para visualizar os pedidos.</p>;
  }

  return (
    <>
      <section className="visualiza-lista-pedidos-container">
        <h2>Lista de Pedidos</h2>
        <section className="filtro-pedidos">
          <input
            type="text"
            value={filtro}
            onChange={handleFiltroChange}
            placeholder="Filtrar por nome do cliente ou item"
          />
        </section>
        <section className="lista-pedidos">
          {pedidosFiltrados.map((pedido) => (
            <section key={pedido.id} className="pedido-item">
              <h3>Pedido #{pedido.id}</h3>
              <p>Cliente: {pedido.cliente}</p>
              <ul>
                {pedido.itens.map((item, index) => (
                  <li key={index}>
                    {item.nome} - Quantidade: {item.quantidade} - Preço: R${" "}
                    {item.preco.toFixed(2)}
                  </li>
                ))}
              </ul>
              <p>Valor Total: R$ {pedido.valorTotal.toFixed(2)}</p>
              <p>Forma de Pagamento: {pedido.formaPagamento}</p>
              <p>Status: {pedido.status}</p>
            </section>
          ))}
        </section>
      </section>
    </>
  );
};

export default VerListaPedidos;
