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
  const [view, setView] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  function Authenticate() {
    const user = { email: email, password: password };
    Client.post("/auth/login", user)
      .then((res) => {
        const userAuth = res.data;      
        setUser(userAuth.user);
        setDataUser(userAuth.user);
        setToken(userAuth.token.value);
        setPermissions(userAuth.permissions);
        navigate("/home");
      })
      .catch(function (error) {
        setView(true);
        console.log(error);
      })
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
      />

      <Label>Senha</Label>
      <PasswordInput
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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