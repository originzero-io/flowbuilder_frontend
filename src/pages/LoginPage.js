import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from "react-router-dom";
import { loginError, loginSuccess } from "../store/actions/authActions";
import { checkAPI } from "../services/authService";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const ErrorMessage = styled.p`
  color: red;
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
  const [users, setUsers] = useState([
    {
      username: "anilakseki",
      password: "1234",
    },
    {
      username: "akinsibay",
      password: "1234",
    },
  ]);
  const onSubmitHandle = (data) => {
    const user = users.find(
      (user) =>
        user.username === data.username && user.password === data.password
    );
    if (user) {
      dispatch(loginSuccess(user.username));
    } else {
      dispatch(loginError("Username or password is not match"));
    }
  };
  useEffect(() => {
    checkAPI().then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <Container>
      <Form
        onSubmit={(e) => e.preventDefault()}
        style={{
          width: "25%",
          border: "1px solid green",
          padding: "25px",
          borderRadius: "4px",
        }}
      >
        <FormGroup>
          <Label>User Name</Label>
          <Input
            {...register("username", {
              required: "Username must enter the field",
            })}
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
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </FormGroup>
        <Button type="submit" onClick={handleSubmit(onSubmitHandle)}>
          Login
        </Button>
        {isAuthenticated ? (
          <Redirect to="/panel" />
        ) : (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
      </Form>
    </Container>
  );
}
