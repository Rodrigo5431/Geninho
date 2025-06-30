import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../Services/Api";

export default function OrderPage() {
  //   const { id } = useParams();
  const [order, setOrder] = useState({});

  const fetchOrder = async () => {
    const order = await getOrderById(id);
    setOrder(order);
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <section>
      <h1>Pedido: {id}</h1>
    </section>
  );
}
