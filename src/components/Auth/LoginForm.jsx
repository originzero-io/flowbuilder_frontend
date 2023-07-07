import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Form, FormGroup } from "reactstrap";
import { login } from "store/reducers/authSlice";
import { Redirect } from "react-router-dom";
import useAuth from "utils/hooks/useAuth";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import * as Styled from "./LoginForm.style";
// import { Input, Text, Submit, ErrorMessage } from "./LoginForm.style";

export default function LoginForm() {
  const dispatch = useDispatch();
  const { isAuthenticated, errorMessage } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const onSubmitHandle = async (data) => {
    dispatch(login(data));
  };
  return (
    <>
      <Styled.Text>Welcome to flow builder.📗 Please login</Styled.Text>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FormGroup>
          <FaUser
            style={{
              fontSize: "2.5vmin",
              color: "whitesmoke",
              marginRight: "8px",
            }}
          />
          <Styled.Input
            // defaultValue="akinsibay"
            {...register("username", {
              required: "Username must enter the field",
            })}
            placeholder="Username"
            defaultValue={
              process.env.REACT_APP_HOST_ENV === "development"
                ? "akinsibay"
                : null
            }
          />
          {errors.username && (
            <Styled.ErrorMessage>{errors.username.message}</Styled.ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <RiLockPasswordFill
            style={{
              fontSize: "2.5vmin",
              color: "whitesmoke",
              marginRight: "8px",
            }}
          />
          <Styled.Input
            // defaultValue="1234"
            type="password"
            {...register("password", {
              required: "Password must enter the field",
              minLength: {
                value: 4,
                message: "Password must have at least 4 characters",
              },
            })}
            placeholder="Password"
            defaultValue={
              process.env.REACT_APP_HOST_ENV === "development" ? "1234" : null
            }
          />
          {errors.password && (
            <Styled.ErrorMessage>{errors.password.message}</Styled.ErrorMessage>
          )}
        </FormGroup>
        <Styled.Submit type="submit" onClick={handleSubmit(onSubmitHandle)}>
          Log in
        </Styled.Submit>
        {isAuthenticated ? (
          <Redirect to="/panel" />
        ) : (
          <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>
        )}
      </Form>
    </>
  );
}
