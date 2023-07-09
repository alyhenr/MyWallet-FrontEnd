import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { userAuthContext } from "../store/AuthContext";

export default function TransactionsPage() {
  const { userData } = useContext(userAuthContext);
  const [newTransaction, setNewTransaction] = useState({
    value: 0,
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => { if (!userData.token) navigate("/"); }, []);

  const handleSubmit = ev => {
    ev.preventDefault();

    if (Number(newTransaction.value) != newTransaction.value) { alert("O valor da transação deve conter apenas números"); return; }
    if (newTransaction.description.length === 0) { alert("Fornece uma descrição."); return; }

    axios.post(`${import.meta.env.VITE_API_URL + location.pathname}`,
      { ...newTransaction, value: parseFloat(newTransaction.value) },
      {
        headers: { "Authorization": `Bearer ${userData.token}` }
      })
      .then(res => { console.log(res.data, res.status); navigate("/home"); })
      .catch(err => console.log(err.message))
  };

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form
        onChange={ev => setNewTransaction(prev => ({ ...prev, [ev.target.name]: ev.target.value }))}
        onSubmit={ev => handleSubmit(ev)}
      >
        <input placeholder="Valor" type="text" name="value" />
        <input placeholder="Descrição" type="text" name="description" />
        <button>Salvar TRANSAÇÃO</button>
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
