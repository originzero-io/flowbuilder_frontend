import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../components/global/Forms/LoginForm";
import styled from "styled-components";
import {
  Container,
  Content,
  Image,
  FormWrapper,
  Input,
  Text,
  LoginButton,
  ErrorMessage,
} from "../components/global/Forms/style";
import RegisterForm from "../components/global/Forms/RegisterForm";
const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 6px;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2vh;
  width: 120px;
  background-color:rgb(182,157,230);
  color:whitesmoke;
`;

export default function LoginPage() {
  const [formType, setFormType] = useState("login");
  const switchForm = () => {
    if (formType === "login") {
      setFormType("signup")
    }
    else setFormType("login")
  }
  return (
    <Container>
      <Button onClick={switchForm}>{formType === "login" ? "Sign Up" : "Log In"}</Button>
      <Content>
        <Image />
        <FormWrapper>
          {formType === "login" ? <LoginForm setFormType={setFormType} /> : <RegisterForm setFormType={setFormType}/>}
        </FormWrapper>
      </Content>
    </Container>
  );
}
