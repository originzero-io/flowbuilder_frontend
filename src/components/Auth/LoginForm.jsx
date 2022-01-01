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
import useAuth from "../../utils/useAuth";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

export default function LoginForm() {
  const dispatch = useDispatch();
  const { isAuthenticated, errorMessage } = useAuth();
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
      console.log("thats not important")
    }
  };
  return (
    <>
      <Text>Welcome to flow builder.📗 Please login</Text>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FormGroup>
          <FaUser style={{fontSize:'20px',color:'whitesmoke',marginRight:'8px'}}/>
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
          <RiLockPasswordFill style={{fontSize:'20px',color:'whitesmoke',marginRight:'8px'}}/>
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
