import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Form, FormGroup } from "reactstrap";
import { login } from "store/reducers/authSlice";
import { Redirect } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Input, Text, Submit, ErrorMessage } from "./LoginForm.style";

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
      <Text>Welcome to flow builder.📗 Please login</Text>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FormGroup>
          <FaUser
            style={{
              fontSize: "2.5vmin",
              color: "whitesmoke",
              marginRight: "8px",
            }}
          />
          <Input
            defaultValue="akinsibay"
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
          <RiLockPasswordFill
            style={{
              fontSize: "2.5vmin",
              color: "whitesmoke",
              marginRight: "8px",
            }}
          />
          <Input
            defaultValue="1234"
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
        <Submit type="submit" onClick={handleSubmit(onSubmitHandle)}>
          Log in
        </Submit>
        {isAuthenticated ? (
          <Redirect to="/panel" />
        ) : (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
      </Form>
    </>
  );
}
