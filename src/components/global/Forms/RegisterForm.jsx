import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup } from "reactstrap";
import { loginService, registerService } from "../../../services/authService";
import { loginError, loginSuccess } from "../../../store/actions/authActions";
import { Input, Text, Submit, ErrorMessage } from "./style";
import { Redirect } from "react-router-dom";
import { openNotification as notification } from "../../../app-global/dom/notification";

export default function RegisterForm({ setFormType }) {
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
    try {
      const response = await registerService(data);
      notification("", "Register Successfuly", "success");
      setFormType("login");
    } catch ({ response }) {
      console.log("reponse:", response);
      notification("", response.data.message, "error");
    }
  };
  return (
    <>
      <Text>Please fill this form to register flow builder system</Text>
      <Form onSubmit={(e) => e.preventDefault()} style={{ marginTop: "20%" }}>
        <FormGroup>
          <Input
            {...register("name", {
              required: "Name must enter the field",
            })}
            placeholder="Full Name"
          />
          {errors.username && (
            <ErrorMessage>{errors.username.message}</ErrorMessage>
          )}
          <Input
            {...register("username", {
              required: "Username must enter the field",
            })}
            placeholder="Username"
          />
          {errors.username && (
            <ErrorMessage>{errors.username.message}</ErrorMessage>
          )}
          <Input
            {...register("email", {
              required: "Email must enter the field",
            })}
            placeholder="E-mail"
          />
          {errors.username && (
            <ErrorMessage>{errors.username.message}</ErrorMessage>
          )}
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
        <Submit type="submit" onClick={handleSubmit(onSubmitHandle)}>
          Sign Up
        </Submit>
      </Form>
    </>
  );
}
