import React, { useState, useEffect, useContext } from "react";
import Header from "../../Components/Header";
import { getOrdersInBetweenDates, getTodayOrders } from "../../Services/Api";
import { AuthContext } from "../../Context/Auth";
import OrderCard from "../../Components/OrderCard";
import "./OrdemProducao.css";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

export default function OrdemProdução() {
  useEffect(() => {
    document.title = "Ordem de produção";
  }, []);

  const [producoes, setProducoes] = useState([]);
  const [orderedOrders, setOrderedOrders] = useState([]);
  const [date, setDate] = useState({ beginDate: "", endDate: "" });
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [sellerFilter, setSellerFilter] = useState();
  const [clientFilter, setClientFilter] = useState();
  const { role } = useContext(AuthContext);

  const handleProducoes = async () => {
    try {
      const response = await getTodayOrders();
      setProducoes(response);
    } catch (e) {
      console.error(e.message);
    }
  };

  const orderByStatusAndPriority = (orders) => {
    const statusOrder = {
      ABERTO: 1,
      PREPARO: 2,
      CONCLUIDO: 3,
      CANCELADO: 4,
    };

    const priorityOrder = {
      ALTA: 1,
      MEDIA: 2,
      BAIXA: 3,
    };

    const orderedOrders = orders.sort((a, b) => {
      if (statusOrder[a.status] === statusOrder[b.status]) {
        if (priorityOrder[a.priority] === priorityOrder[b.priority]) {
          return a.id - b.id;
        }
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return statusOrder[a.status] - statusOrder[b.status];
    });

    setOrderedOrders(orderedOrders);
  };

  const handleOrderedOrders = () => {
    const orderedOrders = producoes.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}Z`);
      const dateB = new Date(`${b.date}T${b.time}Z`);
      return dateB - dateA;
    });
    orderByStatusAndPriority(orderedOrders);
  };

  function reOrder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const items = reOrder(
      orderedOrders,
      result.source.index,
      result.destination.index
    );
    setOrderedOrders(items);
  }

  const renderOrders = () => {
    return (
      <section className="orders-section">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="orders" type="list" direction="vertical">
            {(provided) => (
              <section
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="orders-section"
              >
                {orderedOrders.map((order, index) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    handleProducoes={handleProducoes}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </section>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    );
  };

  const handleDate = (e) => {
    setDate({ ...date, [e.target.name]: e.target.value });
  };

  const filterBySeller = (orders) => {
    return orders.filter(({ user }) => user.name === sellerFilter);
  };

  const filterByClient = (orders) => {
    return orders.filter(({ client }) => client.name === clientFilter);
  };

  const handleButtonClick = async () => {
    const { beginDate, endDate } = date;
    try {
      let response;
      if (beginDate && endDate) {
        response = await getOrdersInBetweenDates(beginDate, endDate);
      } else {
        response = await getTodayOrders();
      }

      if (response.status === 200) {
        let filteredOrders = response.data;
        if (sellerFilter) {
          filteredOrders = filterBySeller(filteredOrders);
        }
        if (clientFilter) {
          filteredOrders = filterByClient(filteredOrders);
        }
        setProducoes(filteredOrders);
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleTotalRevenue = () => {
    const validOrders = orderedOrders.filter((order) => {
      return order.status !== "CANCELADO";
    });
    const total = validOrders.reduce((acc, order) => acc + order.fullPrice, 0);
    setTotalRevenue(total);
  };

  const handleSellerFilterChange = (e) => {
    setSellerFilter(e.target.value);
  };

  const handleClientFilterChange = (e) => {
    setClientFilter(e.target.value);
  };

  const userOptions = () => {
    const uniqueUsers = new Set();
    return orderedOrders
      .filter(({ user, client }) => {
        if (uniqueUsers.has(user.name) || user.name === client.name) {
          return false;
        }
        uniqueUsers.add(user.name);
        return true;
      })
      .map(({ user }) => (
        <option key={user.name} value={user.name}>
          {user.name}
        </option>
      ));
  };

  const clientOptions = () => {
    const uniqueClients = new Set();
    return orderedOrders
      .filter(({ user, client }) => {
        if (uniqueClients.has(client.name) || user.name === client.name) {
          return false;
        }
        uniqueClients.add(client.name);
        return true;
      })
      .map(({ client }) => (
        <option key={client.name} value={client.name}>
          {client.name}
        </option>
      ));
  };

  useEffect(() => {
    handleTotalRevenue();
  }, [orderedOrders]);

  useEffect(() => {
    handleOrderedOrders();
  }, [producoes]);

  useEffect(() => {
    handleProducoes();
  }, []);

  return (
    <>
      <Header />
      {role !== "CHEF" && role !== "ADMIN" ? (
        <h1>Você não tem permissão para visualizar o conteúdo essa página</h1>
      ) : role === "ADMIN" || role === "CHEF" ? (
        <>
          <div className="filters-container">
            <div className="filters">
              <div className="date-picker">
                <div>
                  <p>De:</p>
                  <input
                    type="date"
                    name="beginDate"
                    value={date.beginDate}
                    onChange={handleDate}
                  />
                </div>
                <div>
                  <p>Até:</p>
                  <input
                    type="date"
                    name="endDate"
                    value={date.endDate}
                    onChange={handleDate}
                  />
                </div>
              </div>
              <div className="filters-selects">
                <div className="seller-picker">
                  <div>
                    <p>Vendedor:</p>
                    <select
                      name="sellerFilter"
                      className="filter-select"
                      value={sellerFilter}
                      onChange={handleSellerFilterChange}
                    >
                      <option value="">Selecione um vendedor</option>
                      {orderedOrders.length > 0 && userOptions()}
                    </select>
                  </div>
                </div>
                <div className="client-picker">
                  <div>
                    <p>Cliente:</p>
                    <select
                      name="clientFilter"
                      className="filter-select"
                      value={clientFilter}
                      onChange={handleClientFilterChange}
                    >
                      <option value="">Selecione um cliente</option>
                      {orderedOrders.length > 0 && clientOptions()}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="buttonSearchOrder"
              type="button"
              onClick={() => handleButtonClick()}
            >
              Buscar
            </button>
          </div>
          <div className="informationOrder">
            <p>{`Quantidade de pedidos no período: ${
              orderedOrders.filter((order) => order.status !== "CANCELADO")
                .length
            }`}</p>
            <p>{`Faturamento no período: R$ ${totalRevenue.toFixed(2)}`}</p>
          </div>
          <div className="pedidos">{renderOrders()}</div>
        </>
      ) : (
        renderOrders()
      )}
    </>
  );
}
