import React, { useEffect, useState } from "react";
import { updateOrderStatus, updateOrderPriority } from "../../Services/Api";
import GeneralModal from "../GeneralModal";
import "./OrderCard.css";
import { Draggable } from "@hello-pangea/dnd";

export default function OrderCard({ order, handleProducoes, index }) {
  const [status, setStatus] = useState();
  const [priority, setPriority] = useState();
  const [showModal, setShowModal] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const { id, date, time, fullPrice, paymentMethod, user, client, products } =
    order;

  const handleNewDate = () => {
    const dateArray = date.split("-");
    const newDate = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
    setNewDate(newDate);
  };

  const handleNewTime = () => {
    const timeArray = time.split(":");
    const newTime = `${timeArray[0]}:${timeArray[1]}`;
    setNewTime(newTime);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const updateStatus = async () => {
    try {
      const response = await updateOrderStatus(id, status);
      if (response.status === 200) {
        setShowModal(true);
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  const updatePriority = async () => {
    try {
      const response = await updateOrderPriority(id, priority);
      if (response.status === 200) {
        setShowModal(true);
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  const onCloseModal = () => {
    setShowModal(false);
    handleProducoes();
  };
  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  const orderDetails = () => {
    return (
      <section>
        <div className="order-card">
          <p>{`Cliente: ${client.name}`}</p>
          <p>{`${
            user.name !== client.name ? `Vendedor: ${user.name}` : "Delivery"
          }`}</p>
          <div className="select-order-card">
            <select name="status" value={status} onChange={handleStatusChange}>
              <option value="ABERTO">Aberto</option>
              <option value="PREPARO">Em Preparo</option>
              <option value="CONCLUIDO">Concluído</option>
              <option value="CANCELADO">Cancelado</option>
            </select>
            {status !== order.status && (
              <button onClick={updateStatus} className="SaveOrderUpdate">
                Salvar
              </button>
            )}
          </div>
          <div className="select-order-card">
            <select
              name="status"
              value={priority}
              onChange={handlePriorityChange}
            >
              <option value="BAIXA">Prioridade Baixa</option>
              <option value="MEDIA">Prioridade Média</option>
              <option value="ALTA">Prioridade Alta</option>
            </select>
            {priority !== order.priority && (
              <button onClick={updatePriority} className="SaveOrderUpdate">
                Salvar
              </button>
            )}
          </div>
          <ul className="order-products">
            {products.map((product) => (
              <li key={product.id}>
                {product.name} - {`Quantidade: ${product.qtd}`}
              </li>
            ))}
          </ul>
          <p>{`R$ ${Number(fullPrice).toFixed(2)}`}</p>
          <p>{`Forma de pagamento: ${paymentMethod}`}</p>
          {showModal && (
            <GeneralModal
              message="Pedido atualizado com sucesso!"
              onClose={() => onCloseModal()}
            />
          )}
        </div>
      </section>
    );
  };

  useEffect(() => {
    setStatus(order.status);
    setPriority(order.priority);
    handleNewDate();
    handleNewTime();
  }, []);

  return (
    <Draggable draggableId={order.id.toString()} index={index}>
      {(provided) => (
        <section
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="orderSection"
        >
          <div onClick={toggleDetails} className="cardProduct">
            <p>Nº do Pedido {id}</p>
            <p>
              Status:{" "}
              <strong
                className={
                  status === "ABERTO"
                    ? "orderStatusOpen"
                    : status === "PREPARO"
                    ? "orderStatusPreparing"
                    : status === "CONCLUIDO"
                    ? "orderStatusFinished"
                    : "orderStatusCanceled"
                }
              >
                {status}
              </strong>
            </p>
            <p>
              Prioridade:{" "}
              <strong
                className={
                  priority === "BAIXA"
                    ? "orderPriorityLow"
                    : priority === "MEDIA"
                    ? "orderPriorityMedium"
                    : "orderPriorityHigh"
                }
              >
                {priority}
              </strong>
            </p>
            <p>Data do pedido: {newDate}</p>
            <p>Hora do Pedido: {newTime}</p>
          </div>
          {showDetails && orderDetails()}
        </section>
      )}
    </Draggable>
  );
}
