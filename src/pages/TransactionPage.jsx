import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { userAuthContext } from "../store/AuthContext";

export default function TransactionsPage() {
  useEffect(() => { if (!userData.token) navigate("/"); }, []);

  const { userData } = useContext(userAuthContext);
  const location = useLocation();

  let value = "", description = "", operation = "post";
  if (location.state) {
    operation = "update";
    value = location.state.value.toString();
    description = location.state.description;
  }

  const [newTransaction, setNewTransaction] = useState({
    value,
    description,
  });
  const action = location.pathname.split("/")[2];
  const navigate = useNavigate();

  const handleSubmit = ev => {
    ev.preventDefault();

    if (!newTransaction.value.length) { alert("Insira um valor maior que 0."); return; }
    if (newTransaction.description.length === 0) { alert("Forneça uma descrição."); return; }
    const request = operation === "post" ? axios.post : axios.put;
    request(`${import.meta.env.VITE_API_URL + location.pathname}`,
      { ...newTransaction, value: parseFloat(newTransaction.value) },
      {
        headers: { "Authorization": `Bearer ${userData.token}` }
      })
      .then(res => { console.log(res.data, res.status); navigate("/home"); })
      .catch(err => { console.log(err.response); alert(err.response.data); })
  };

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form
        onSubmit={ev => handleSubmit(ev)}
      >
        <input
          data-test="registry-amount-input" placeholder="Valor"
          type="text" name="value"
          onChange={ev => setNewTransaction(prev => ({ ...prev, [ev.target.name]: ev.target.value }))}
          value={newTransaction.value}
        />
        <input
          data-test="registry-name-input" placeholder="Descrição"
          type="text" name="description"
          onChange={ev => setNewTransaction(prev => ({ ...prev, [ev.target.name]: ev.target.value }))}
          value={newTransaction.description}
        />
        <button data-test="registry-save">Salvar {action === "saida" && "saída" || action}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
