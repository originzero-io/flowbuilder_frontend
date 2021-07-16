import React, { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from "react-router-dom";
import { loginError, loginSuccess } from "../store/actions/authActions";
import { loginService,checkAPI } from "../services/authService";
import { init,sendMessage,subscribeChat,disconnect } from '../services/socketApi';
import io from "socket.io-client";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #11998e;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #38ef7d, #11998e);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #38ef7d, #11998e); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  position:relative;
`;
const FormWrapper = styled.div`
  width: 25%;
  transform: scale(1.1);
  padding: 25px;
  border-radius: 4px;
  background:rgba(47, 54, 64,0.8);
  color:whitesmoke;
  box-shadow: 0px 0px 11px 0px rgba(0,0,0,0.75);
`;
const Text = styled.div`
  font-size:20px;
  border-bottom:1px solid whitesmoke;
  margin-bottom: 20px;
`;
const LoginButton = styled.button`
  border:none;
  border-radius: 8px;
  padding: 5px;
  float:right;
  width:100%;
  color:whitesmoke;
  background: #11998e;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #38ef7d, #11998e);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #38ef7d, #11998e); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;
const SignUpButton = styled.button`
  border:none;
  border-radius: 2px;
  padding:6px;
  position:absolute;
  top:10px;
  right:10px;
  font-size:2vh;
  width:120px;
  
`;
const ErrorMessage = styled.p`
  color: tomato;
`;
export default function LoginPage() {
  const dispatch = useDispatch();
  const { isAuthenticated, errorMessage } = useSelector(
    (state) => state.authReducer
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  
  const [form, setForm] = useState("login");
  const onSubmitHandle = async (data) => {
    //const response = await loginService(data);
    try {
      const response = await loginService(data);
      dispatch(loginSuccess(response.data));
    } catch ({response}) {
      dispatch(loginError(response.data.message));
    }
  };

  return (
    <Container>
      <SignUpButton onClick={()=>setForm("signup")}>Sign up</SignUpButton>
      <FormWrapper>
        <LoginButton onClick={()=>sendMessage("HELLO SERVER")}>Hello Server</LoginButton>
        <Text>Login</Text>
        <Form onSubmit={(e) => e.preventDefault()}>
          <FormGroup>
            <Label>User Name</Label>
            <Input
              {...register("username", {
                required: "Username must enter the field",
              })}
              placeholder="Enter username"
            />
            {errors.username && (
              <ErrorMessage>{errors.username.message}</ErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              {...register("password", {
                required: "Password must enter the field",
                minLength: {
                  value: 4,
                  message: "Password must have at least 4 characters",
                },
              })}
              placeholder="Enter password"
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </FormGroup>
          <LoginButton type="submit" onClick={handleSubmit(onSubmitHandle)}>
            Login
          </LoginButton>
          {isAuthenticated ? (
            <Redirect to="/panel" />
          ) : (
            <ErrorMessage>{errorMessage}</ErrorMessage>
          )}
        </Form>
      </FormWrapper>
    </Container>
  );
}
