import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { Container, Box, Text } from "./style";
export default function Homepage() {
  return (
    <Container>
      <Box>
        <img src={logo} width="160px" height="160px"></img>
        <Text>Hello baby!</Text>
        <Link to="/flow"><h4>Go to flow</h4></Link>
      </Box>
    </Container>
  );
}
