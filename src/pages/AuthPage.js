import React from "react";
import {
  Container,
  Content,
  FormWrapper,
  LogoWrapper
} from "../components/Auth/style";
import LoginForm from "../components/Auth/LoginForm";
import { Logo } from "../components/global/icons";

export default function LoginPage() {
  return (
    <Container>
      <Content>
        <LogoWrapper>
          <Logo theme="dark" width="100px" height="100px" />
        </LogoWrapper>
        <FormWrapper>
          <LoginForm />
        </FormWrapper>
      </Content>
    </Container>
  );
}
