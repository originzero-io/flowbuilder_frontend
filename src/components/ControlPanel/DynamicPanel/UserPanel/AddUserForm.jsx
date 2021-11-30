import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { openNotification } from "../../../../app-global/dom/notification";
import { setModal } from "../../../../store/reducers/componentReducer";
import { registerUser } from "../../../../store/reducers/userReducer";

export default function AddUserForm() {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    role: "user",
  });

  const onChangeHandler = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    dispatch(registerUser(userInfo));
    dispatch(setModal(false));
    openNotification("","Register successful!", "success");
  };
  return (
    <Form onSubmit={onSubmitHandle}>
      <FormGroup>
        <Label>Name</Label>
        <Input
          name="name"
          placeholder="Full Name"
          onChange={onChangeHandler}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Username</Label>
        <Input
          name="username"
          placeholder="Username"
          onChange={onChangeHandler}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>E mail</Label>
        <Input
          name="email"
          placeholder="Email"
          onChange={onChangeHandler}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          onChange={onChangeHandler}
        />
      </FormGroup>
      <FormGroup>
        <Label>Role</Label>
        <Input
          type="select"
          onChange={onChangeHandler}
          name="role"
          value={userInfo.role}
          defaultValue="user"
          required
        >
          <option style={{ color: "black" }} value="admin">
            admin
          </option>
          <option style={{ color: "black" }} value="user">
            user
          </option>
        </Input>
      </FormGroup>
      <Button color="success" type="submit">
        Submit
      </Button>
    </Form>
  );
}
