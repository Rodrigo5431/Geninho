import React, { useEffect, useState } from "react";
import { getOrders, cancelOrder } from "../../Services/Api";
import ConfirmationModal from "../../Components/ConfirmationModal/index.jsx";
import Header from "../../Components/Header/index.jsx";
import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [sortedOrders, setSortedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmationModal, setConfirmationModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [filter, setFilter] = useState("all");

  const handleOrders = async () => {
    setLoading(true);
    try {
      const response = await getOrders();
      setOrders(response);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const clickCancelOrder = (orderId) => {
    setOrderId(orderId);
  };

  const handleCancelOrder = async () => {
    if (!orderId) return;
    try {
      const response = await cancelOrder(orderId);

      if (response.status === 200) {
        handleOrders();
        setConfirmationModal(false);
      } else {
        console.error("Erro ao cancelar o pedido:", response);
      }
    } catch (error) {
      console.error("Erro ao cancelar o pedido:", error.message);
    }
  };

  const orderOrdersByTime = () => {
    const filteredOrders = orders.filter((order) => {
      if (filter === "all") return true;
      if (filter === "recent") return isRecentOrder(order.date, order.time);
      if (filter === "open") return order.status === "ABERTO";
      if (filter === "cancelled") return order.status === "CANCELADO";
      return false;
    });

    const orderedOrders = [...filteredOrders].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}Z`);
      const dateB = new Date(`${b.date}T${b.time}Z`);
      return dateB - dateA;
    });
    setSortedOrders(orderedOrders);
  };

  const calculateTimeElapsed = (orderDate, orderTime) => {
    const orderDateTime = new Date(`${orderDate}T${orderTime}Z`);
    const now = new Date();
    const diff = now - orderDateTime;
    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes} minutos atrás`;
  };

  const isRecentOrder = (orderDate, orderTime) => {
    const fifteenMinutes = 15 * 60 * 1000;
    const now = new Date();
    const orderDateTime = new Date(`${orderDate}T${orderTime}`);
    return now - orderDateTime < fifteenMinutes;
  };

  useEffect(() => {
    if (orderId) {
      setConfirmationModal(true);
    }
  }, [orderId]);

  useEffect(() => {
    orderOrdersByTime();
  }, [orders, filter]);

  useEffect(() => {
    handleOrders();
  }, []);

  const formatPrice = (price) => {
    return price ? price.toFixed(2) : "0.00";
  };

  const formatDateTime = (date, time) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return `${new Date(`${date}T${time}Z`).toLocaleDateString(
      "pt-BR",
      options
    )} às ${time}`;
  };

  return (
    <>
      <Header />
      <section className="orders">
        <div className="filters">
          <label htmlFor="filter">Filtrar pedidos:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="recent">Recentes</option>
            <option value="cancelled">Cancelados</option>
            <option value="open">Abertos</option>
          </select>
        </div>
        {loading ? (
          <div className="loading">Carregando pedidos...</div>
        ) : sortedOrders.length === 0 ? (
          <p>Não há pedidos disponíveis nesta categoria.</p>
        ) : (
          sortedOrders.map((order) => (
            <div
              key={order.id}
              className={`order ${
                isRecentOrder(order.date, order.time) ? "recent-order" : ""
              } ${order.status === "CANCELADO" ? "cancelled-order" : ""}`}
            >
              <h2>Pedido: #{order.id}</h2>
              <p>Realizado em: {formatDateTime(order.date, order.time)}</p>
              <p>Feito há {calculateTimeElapsed(order.date, order.time)}</p>
              <div>
                Produtos:
                <ul>
                  {order.products.map((product) => (
                    <li key={product.id}>
                      {product.name} - Qtd: {product.qtd}
                    </li>
                  ))}
                </ul>
              </div>
              <p>Status: {order.status}</p>
              <p>
                Cupom:{" "}
                {order.coupon ? (
                  <>
                    <span>Código: {order.coupon.code}</span>
                    <br />
                    <span>Desconto: {order.coupon.discount}%</span>
                    <br />
                  </>
                ) : (
                  "Não foi usado nenhum cupom"
                )}
              </p>
              <p>Valor: R$ {formatPrice(order.fullPrice)}</p>
              {order.status === "ABERTO" &&
                isRecentOrder(order.date, order.time) && (
                  <button
                    className="cancel-button"
                    onClick={() => clickCancelOrder(order.id)}
                  >
                    Cancelar Pedido
                  </button>
                )}
              {showConfirmationModal && (
                <ConfirmationModal
                  message="Tem certeza que deseja cancelar esse pedido?"
                  onConfirm={() => {
                    handleCancelOrder();
                    setConfirmationModal(false);
                  }}
                  onCancel={() => setConfirmationModal(false)}
                />
              )}
            </div>
          ))
        )}
      </section>
    </>
  );
}
