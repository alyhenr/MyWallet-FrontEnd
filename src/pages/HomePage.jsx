import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
import styled from "styled-components";

import { userAuthContext } from "../store/AuthContext";

export default function HomePage() {
  const [userWallet, setUserWallet] = useState({});
  const { userData } = useContext(userAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.token) navigate("/");

    axios.get(`${import.meta.env.VITE_API_URL}/home`, {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      }
    })
      .then(res => {
        setUserWallet(res.data);
      })
      .catch(err => {
        if (err.response.status === 401) navigate("/");
      })
  }, []);

  const handleLogOff = () => {
    localStorage.removeItem("my_wallet_user_logged");
    navigate("/");
  };

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {userData.nome}</h1>
        <BiExit onClick={handleLogOff} style={{
          cursor: "pointer",
        }} />
      </Header>

      {
        Object.keys(userWallet).length > 0 &&
        <TransactionsContainer>
          <ul>
            {userWallet.transactions?.map(t => (
              <ListItemContainer key={t._id}>
                <div>
                  <span>{t.date}</span>
                  <strong>{t.description}</strong>
                </div>
                <Value color={t.type === "entrada"
                  ? "positivo"
                  : "negativo"}
                >{Number(t.value).toFixed(2)}</Value>
              </ListItemContainer>
            ))}
          </ul>

          <article>
            <strong>Saldo</strong>
            <Value color={userWallet.total > 0
              ? "positivo" : "negativo"}>{userWallet.total.toFixed(2)}</Value>
          </article>
        </TransactionsContainer>
      }


      <ButtonsContainer>
        <button onClick={() => navigate("/nova-transacao/entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate("/nova-transacao/saida")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
  article {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`;
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`;
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`;