{/*import { useState, useEffect } from "react";
import Header from "../../../components/Header";
import "../CadastroF/cadastrof.css";
import React from "react";

const CadastroF = () => {
  useEffect(() => {
    document.title = "Cadastro de funcionários";
  }, []);
  
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [senha, setSenha] = useState("");
  const [funcionarios, setFuncionarios] = useState([]);

  const cargosPermitidos = ["adim", "chefe", "vendedor"];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !email || !cargo || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    if (!cargosPermitidos.includes(cargo.toLowerCase())) {
      alert(
        `O cargo deve ser um dos seguintes: ${cargosPermitidos.join(", ")}`
      );
      return;
    }

    const novoFuncionario = { nome, email, cargo, senha };
    setFuncionarios([...funcionarios, novoFuncionario]);

    setNome("");
    setEmail("");
    setCargo("");
    setSenha("");

    alert("Funcionário cadastrado com sucesso!");
  };

  return (
    <section>
       <Header />
      <section className="containerCF">
       
        <h1>Cadastrar Novo Funcionário</h1>
        <form onSubmit={handleSubmit}>
          <section>
            <input className="inputCF"
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </section>
          <section>
            <input 
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </section>
          <section>
            <input
              type="text"
              placeholder="Cargo"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              required
            />
          </section>
          <section>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </section>
          <button className="signup-button" type="submit">
            Cadastrar
          </button> 
        </form>
                <ul>
          {funcionarios.map((funcionario, index) => (
            <li key={index}>
              {funcionario.nome} - {funcionario.email} - {funcionario.cargo}-{" "}
              {funcionario.senha}
            </li>
          ))}
        </ul>
      
        </section>
      </section>
    );
  };

export default CadastroF;*/}
