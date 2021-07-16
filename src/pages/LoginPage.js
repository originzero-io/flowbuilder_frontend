import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Form, FormGroup, Label } from "reactstrap";
import { Redirect } from "react-router-dom";
import { loginError, loginSuccess } from "../store/actions/authActions";
import { loginService } from "../services/authService";
import { openNotification as notification } from "../app-global/dom/notification";
import {
  init,
  sendMessage,
  subscribeChat,
  disconnect,
} from "../services/socketApi";
import io from "socket.io-client";
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background: #f3f2f2;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  height: auto;
  margin: auto auto;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 2px 6px -1px rgba(0, 0, 0, 0.12);
`;
const Image = styled.div`
  width: 220px;
  height: 500px;
  background-image: url("https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  background-size: cover;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;
const FormWrapper = styled.div`
  background: red;
  width: 300px;
  padding: 40px 30px;
  background: #fefefe;
  
`;
const Text = styled.div`
  letter-spacing: 2px;
`;
const Input = styled.input`
  width: 90%;
  border: none;
  border-bottom: solid 1px rgba(0,0,0,.1);
  margin-top: 10px;
  padding: 5px 5px 5px 10px;
  &:focus {
    border: none;
    outline: 0;
    border-bottom: 1px solid rgb(182,157,230);
    font-size: 17px;
  }
`;
const LoginButton = styled.button`
  float: right;
  background:rgb(182,157,230);
  width:  auto;
  min-width:  100px;
  border-radius:  24px; 
  text-align:  center; 
  padding:  15px 40px;
  margin-top:  5px; 
  color:  #fff; 
  font-size:  14px;
  margin-left:  auto; 
  font-weight:  500; 
  box-shadow:  0px 2px 6px -1px rgba(0,0,0,.13); 
  border:  none;
  transition:  all .3s ease; 
  outline: 0; 
  &:hover {
    transform:  translateY(-3px);
    box-shadow:  0 2px 6px -1px rgba($primary, .65);
  }
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
  const onSubmitHandle = async (data) => {
    //const response = await loginService(data);
    try {
      const response = await loginService(data);
      dispatch(loginSuccess(response.data));
    } catch ({ response }) {
      notification("", "The server is not active", "error");
      dispatch(loginError(response?.data.message));
    }
  };

  return (
    <Container>
      <Content>
        <Image />
        <FormWrapper>
          <Text>Welcome to flow builder</Text>
          <Form onSubmit={(e) => e.preventDefault()} style={{marginTop:'50%'}}>
            <FormGroup>
            <i className="fas fa-user"></i>
              <Input
                {...register("username", {
                  required: "Username must enter the field",
                })}
                placeholder="Username"
              />
              {errors.username && (
                <ErrorMessage>{errors.username.message}</ErrorMessage>
              )}
             </FormGroup>
            <FormGroup>
            <i className="fas fa-key"></i>
              <Input
                type="password"
                {...register("password", {
                  required: "Password must enter the field",
                  minLength: {
                    value: 4,
                    message: "Password must have at least 4 characters",
                  },
                })}
                placeholder="Password"
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
      </Content>
    </Container>
  );
}
