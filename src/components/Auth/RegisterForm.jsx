import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Form, FormGroup } from "reactstrap";
import { registerService } from "../../services/authService";
import { Input, Text, Submit, ErrorMessage } from "./style";
import { openNotification as notification } from "../../app-global/dom/notification";
import { setError } from "../../store/actions/errorActions";
import PropTypes from "prop-types";

export default function RegisterForm({ setFormType }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const onSubmitHandle = (data) => {
    registerService(data)
      .then(() => {
        notification("", "Register Successfuly", "success");
        setFormType("login");
      })
      .catch((error) => dispatch(setError(error)));
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
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
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
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
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

RegisterForm.propTypes = {
  setFormType: PropTypes.func,
};
