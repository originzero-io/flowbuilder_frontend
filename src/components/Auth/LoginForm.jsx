import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup } from "reactstrap";
import { loginService } from "../../services/authService";
import { loginError, loginSuccess } from "../../store/reducers/authReducer";
import { Input, Text, Submit, ErrorMessage } from "./style";
import { Redirect } from "react-router-dom";
import { openNotification as notification } from "../../app-global/dom/notification";
import { setError } from "../../store/reducers/errorReducer";

export default function LoginForm() {
  const dispatch = useDispatch();
  const { isAuthenticated, errorMessage } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const onSubmitHandle = async (data) => {
    try {
      dispatch(loginSuccess(data));
    } catch (error) {
      notification("", "The server is not active", "error");
      dispatch(loginError(error.response?.data.message));
    }
  };
  return (
    <>
      <Text>Welcome to flow builder</Text>
      <Form onSubmit={(e) => e.preventDefault()} style={{ marginTop: "50%" }}>
        <FormGroup>
          <i className="fas fa-user"></i>
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
          <i className="fas fa-key"></i>
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
