import React from "react";
import styled from "styled-components";
import { Logo } from "../components/Shared/icons";
import LoginForm from "../components/Auth/LoginForm";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #0e1217;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  height: 40%;
  border-radius: 4px;
  box-shadow: 3px 3px 83px 2px rgba(29, 185, 84, 1);
  transition: all 0.8s ease;
  &:hover{
    box-shadow: 3px 3px 170px 50px rgba(29, 185, 84, 1);
  }
  //overflow-y:auto;
`;
const FormWrapper = styled.div`
  width: 300px;
  padding: 40px 30px;
  background: #212529;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const LogoWrapper = styled.div`
  padding: 40px;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(5px);
    box-shadow: 0 2px 6px -1px rgba($primary, 0.65);
  }
`;
export default function LoginPage() {
  return (
    <Wrapper>
      <Content>
        <LogoWrapper>
          <Logo theme="dark" width="100px" height="100px" />
        </LogoWrapper>
        <FormWrapper>
          <LoginForm />
        </FormWrapper>
      </Content>
    </Wrapper>
  );
}
