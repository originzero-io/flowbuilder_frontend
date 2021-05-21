import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import styled from "styled-components";
const Container = styled.div`
 background-color: #000000;
background-image: linear-gradient(315deg, #000000 0%, #ffffff 74%);


  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 260px;
`;
const Text = styled.div`
  font-size:42px;
  letter-spacing: 8px;
`;

export default function Homepage() {
  return (
    <Container>
      <Box>
        <img src={logo} width="160px" height="160px"></img>
        <Text>Hello baby!</Text>
        <Link to="/flow">Go to flow</Link>
      </Box>
    </Container>
  );
}
