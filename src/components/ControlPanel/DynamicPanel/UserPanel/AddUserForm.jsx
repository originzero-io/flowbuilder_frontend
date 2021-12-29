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
    avatar: null,
    phone: "",
  });

  const onChangeHandler = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    
    var formData = new FormData();
    formData.append("name", userInfo.name);
    formData.append("username", userInfo.username);
    formData.append("password", userInfo.password);
    formData.append("email", userInfo.email);
    formData.append("role", userInfo.role);
    formData.append("avatar", userInfo.avatar);
    formData.append("phone", userInfo.phone);
    dispatch(registerUser(formData));
    e.preventDefault();
    //dispatch(setModal(false));
    //openNotification("", "Register successful!", "success");
  };
  const profilePictureHandle = (e) => {
    setUserInfo({ ...userInfo, avatar: e.target.files[0] });
  };
  return (
    <form onSubmit={onSubmitHandle} encType="multipart/form-data">
      <FormGroup>
        <Label>Name</Label>
        <Input
          type="file"
          accept=".png, .jpg, .jpeg"
          name="avatar"
          onChange={profilePictureHandle}
        />
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
        <Label>Phone</Label>
        <Input
          name="phone"
          type="number"
          placeholder="Phone Number"
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
    </form>
  );
}
