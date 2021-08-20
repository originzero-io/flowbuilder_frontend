import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup } from "reactstrap";
import { loginService } from "../../../services/authService";
import { loginError, loginSuccess } from "../../../store/actions/authActions";
import { Input, Text, Submit, ErrorMessage } from "./style";
import { Redirect } from "react-router-dom";
import { openNotification as notification } from "../../../app-global/dom/notification";

export default function LoginForm() {
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
