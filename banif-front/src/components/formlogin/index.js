import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import TextInput from "../ui/textinput";
import PasswordInput from "../ui/passwordinput";
import Title from "../ui/title";
import SubTitle from "../ui/subtitle";
import Label from "../ui/label";
import SubmitButton from "../ui/submitbutton";
import ForgotPasswordButton from "../ui/forgotpasswordbutton";

import {
  Container,
  MsgBox,
  SendBox,
} from "./style";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const [view, setView] = useState(false);
  const navigate = useNavigate();

  function Authenticate() {
    
  }

  return (
    <Container>
      <Title>BANIF</Title>
      <Title>Autenticação</Title>
      <SubTitle>Informe suas Credenciais</SubTitle>
      
      <Label>E-mail</Label>
      <TextInput
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={load}
      />

      <Label>Senha</Label>
      <PasswordInput
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={load}
      />

      {view && (
        <MsgBox>
          <p>Usuário e Senha Inválidos!</p>
        </MsgBox>
      )}

      <SendBox>
        <SubmitButton onClick={() => Authenticate()}>Entrar</SubmitButton>
        <ForgotPasswordButton>Esqueceu sua senha?</ForgotPasswordButton>      
      </SendBox>
    </Container>
  );
}