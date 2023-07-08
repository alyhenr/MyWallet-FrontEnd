import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import MyWalletLogo from "../components/MyWalletLogo";
import { userAuthContext } from "../store/AuthContext";

export default function SignInPage() {
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const { setUserData } = useContext(userAuthContext);
  const navigate = useNavigate();
  const handleSubmit = (ev) => {
    ev.preventDefault();

    axios.post(`${import.meta.env.VITE_API_URL}`, formData)
      .then(res => {
        localStorage.setItem("my_wallet_user_logged", JSON.stringify(res.data));
        setUserData(res.data);
        navigate("/home");
      })
      .catch(err => console.log(err.response.data));
  }
  return (
    <SingInContainer>
      <form
        onSubmit={ev => handleSubmit(ev)}
        onChange={ev => setFormData(prev => ({
          ...prev,
          [ev.target.name]: ev.target.value
        }))}
      >
        <MyWalletLogo />
        <input
          name="email"
          placeholder="E-mail"
          type="email"
        />
        <input
          name="senha"
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
        />
        <button>Entrar</button>
      </form>

      <Link to={"/cadastro"}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
};

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
