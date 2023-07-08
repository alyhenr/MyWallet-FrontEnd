import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    conf: "",
  });
  const navigate = useNavigate();

  const handleSubmit = ev => {
    ev.preventDefault();

    if (formData.senha !== formData.conf) {
      alert("As senhas devem ser iguais!");
      return;
    }

    const user = { ...formData };
    delete user.conf;
    axios.post(`${import.meta.env.VITE_API_URL}/cadastro`, user)
      .then(() => { navigate("/"); })
      .catch(err => console.log(err.response.data));
  };

  return (
    <SingUpContainer>
      <form
        onSubmit={ev => handleSubmit(ev)}
        onChange={ev => setFormData(
          prev => ({ ...prev, [ev.target.name]: ev.target.value })
        )}>
        <MyWalletLogo />
        <input
          name="nome"
          placeholder="Nome"
          type="text"
        />
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
        <input
          name="conf"
          placeholder="Confirme a senha"
          type="password"
          autoComplete="new-password"
        />
        <button>Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
};

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
