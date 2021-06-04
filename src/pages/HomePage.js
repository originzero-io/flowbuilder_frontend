import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import {Container,Box,Text} from './styles'
export default function HomePage() {
  return (
    <Container>
      <Box>
        <img src={logo} width="160px" height="160px"></img>
        <Text>Hey !</Text>
        <Link to="/flow"><h4 style={{color:'whitesmoke'}}>Go to flow</h4></Link>
        <Link to="/panel"><h4 style={{color:'whitesmoke'}}>Go to Panel</h4></Link>
      </Box>
    </Container>
  );
}
