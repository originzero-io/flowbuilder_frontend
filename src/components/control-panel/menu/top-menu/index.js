import React from 'react'
import { Link } from 'react-router-dom'
import fullLogo from "../../../../assets/images/full-logo.png"
import { Container,SearchBar } from './style'
export default function TopMenu() {
    return (
        <Container>
            <img src={fullLogo} alt="logo" width="140px" />
            <SearchBar placeholder="search"/>
            <Link to="/">Home</Link>
        </Container>
    )
}
