import React, { useState, useEffect } from 'react';
import './styles.css';
import Header from '../../Components/Header';
import { api } from '../../Services/Api'; 

const VisualizarUsuarios = ({ userRole }) => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get('/users'); 
        setUsuarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleFuncaoChange = async (id, novaFuncao) => {
    try {
      await api.put(`/users/${id}`, { funcao: novaFuncao }); 
      setUsuarios(
        usuarios.map((usuario) =>
          usuario.id === id ? { ...usuario, funcao: novaFuncao } : usuario
        )
      );
      alert('Função do usuário atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar função do usuário:', error);
      alert('Erro ao atualizar função do usuário.');
    }
  };

  const handleAtivarDesativar = async (id, ativo) => {
    try {
      await api.put(`/users/${id}`, { ativo }); 
      setUsuarios(
        usuarios.map((usuario) =>
          usuario.id === id ? { ...usuario, ativo } : usuario
        )
      );
      alert(`Usuário ${ativo ? 'ativado' : 'desativado'} com sucesso!`);
    } catch (error) {
      console.error('Erro ao atualizar status do usuário:', error);
      alert('Erro ao atualizar status do usuário.');
    }
  };

  if (userRole !== 'administrador') {
    return <p>Você não tem permissão para gerenciar os usuários.</p>;
  }

  return (
    <>
      <Header />
      <section className="visualizar-usuarios-container">
        <h2>Gerenciar Usuários</h2>
        <section className="lista-usuarios">
          {usuarios.map((usuario) => (
            <section key={usuario.id} className="usuario-item">
              <p>Nome: {usuario.nome}</p>
              <p>
                Função:
                <select
                  value={usuario.funcao}
                  onChange={(e) => handleFuncaoChange(usuario.id, e.target.value)}
                  aria-label="Alterar função do usuário"
                >
                  <option value="Vendedor">Vendedor</option>
                  <option value="Chefe">Chefe</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </p>
              <p>Status: {usuario.ativo ? 'Ativo' : 'Inativo'}</p>
              <button
                className="btn-toggle"
                style={{ backgroundColor: usuario.ativo ? '#f44336' : '#4CAF50' }}
                onClick={() => handleAtivarDesativar(usuario.id, !usuario.ativo)}
              >
                {usuario.ativo ? 'Desativar' : 'Ativar'}
              </button>
            </section>
          ))}
        </section>
      </section>
    </>
  );
};

export default VisualizarUsuarios;

