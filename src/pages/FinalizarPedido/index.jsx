// import React, { useState } from "react";
// import "./styles.css";
// import Header from "../../Components/Header";

// const pedidosExemplo = [
//   { id: 1, nome: "Hambúrguer", quantidade: 2, preco: 12.5 },
//   { id: 2, nome: "Batata Frita", quantidade: 1, preco: 5.0 },
//   { id: 3, nome: "Refrigerante", quantidade: 2, preco: 3.0 },
// ];

// const FinalizarPedido = ({ userRole }) => {
//   const [pedidos, setPedidos] = useState(pedidosExemplo);
//   const [metodoPagamento, setMetodoPagamento] = useState("");
//   const [cupom, setCupom] = useState("");
//   const [desconto, setDesconto] = useState(0);
//   const [pedidoFinalizado, setPedidoFinalizado] = useState(false);

//   const totalPedido =
//     pedidos.reduce(
//       (total, pedido) => total + pedido.preco * pedido.quantidade,
//       0
//     ) - desconto;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!metodoPagamento) {
//       alert("Por favor, selecione um método de pagamento.");
//       return;
//     }
//     setPedidoFinalizado(true);
//     // Adicionar a lógica para atualizar o status do pedido e enviar os dados ao backend.
//     console.log(
//       "Pedido finalizado com sucesso. Método de pagamento:",
//       metodoPagamento,
//       "Cupom aplicado:",
//       cupom
//     );
//   };

//   const handleCancel = () => {
//     setPedidoFinalizado(false);
//     alert("Pedido cancelado.");
//     // Adicionar a lógica para cancelar o pedido e atualizar os dados no backend.
//   };

//   const aplicarCupom = () => {
//     if (cupom === "DESCONTO10") {
//       setDesconto(totalPedido * 0.1);
//       alert("Cupom aplicado com sucesso!");
//     } else {
//       setDesconto(0);
//       alert("Cupom inválido.");
//     }
//   };

  return (
    <>
      <Header />
      <section className="finalizar-pedido-container"tabIndex={0} > 
        <h2>Resumo do Pedido</h2>
        <section className="resumo-pedido" tabIndex={0}>
          {pedidos.map((pedido) => (
            <section key={pedido.id} className="pedido-item" tabIndex={0}>
              <p>
                {pedido.nome} - Quantidade: {pedido.quantidade} - Preço: R${" "}
                {(pedido.preco * pedido.quantidade).toFixed(2)}
              </p>
            </section>
          ))}
          <p tabIndex={0}>
            <strong>Total do Pedido: R$ {totalPedido.toFixed(2)}</strong>
          </p>
        </section>
        <form onSubmit={handleSubmit} tabIndex={0}>
          <section className="form-group" tabIndex={0}>
            <label>Método de Pagamento:</label>
            <select
              value={metodoPagamento}
              onChange={(e) => setMetodoPagamento(e.target.value)}
              required
              tabIndex={0}
            >
              <option value="">Selecione o método de pagamento</option>
              <option value="cartao">Cartão</option>
              <option value="dinheiro">Dinheiro</option>
              <option value="transferencia">Pix</option>
            </select>
          </section>
          <section className="form-group" tabIndex={0}>
            <label>Cupom de Desconto:</label>
            <input
              type="text"
              name="cupom"
              value={cupom}
              onChange={(e) => setCupom(e.target.value)}
              placeholder="Digite o cupom"
              tabIndex={0}
            />
            <button
              type="button"
              onClick={aplicarCupom}
              className="btn-apply-coupon"
              tabIndex={0}
            >
              Aplicar Cupom
            </button>
          </section>
          <button type="submit" className="btn-submit" tabIndex={0}>
            Finalizar Pedido
          </button>
          {pedidoFinalizado && (
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancelar Pedido
            </button>
          )}
        </form>
        {pedidoFinalizado && (
          <p>Pedido finalizado com sucesso! Status: Em Preparação</p>
        )}
      </section>
    </>
  );



// export default FinalizarPedido;
