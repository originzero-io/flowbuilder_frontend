import React from "react";
import { Container, Row, Col } from "reactstrap";
import NavigationMenu from "../components/ControlPanel/Menu/NavMenu";
import TopMenu from "../components/ControlPanel/Menu/TopMenu";
import PanelManager from "../components/ControlPanel/SidePanel/PanelManager";
import { AppWrapper } from "../components/style-components/AppWrapper";
import styled from "styled-components"
const style = {
  backgroundColor: "#191D1F",
}

const Wrapper = styled.div`
  display:flex;
  flex-direction: column;
  width:100%;
  height:100vh;
`
const Content = styled.div`
  display: flex;
  width:100%;
  align-items: stretch;
  justify-content: center;
  height:97vh;
`
export default function ControlPanelPage() {
  return (
    <AppWrapper>
      {/* <Container fluid={true}>
        <Row sm="1" md="1" lg="1">
          <TopMenu />
        </Row>
        <Row sm="11" md="11" lg="11">
          <Col xs="4" md="3" lg="2" style={style}>
            <NavigationMenu />
          </Col>
          <Col xs="8" md="9" lg="10">
            <PanelManager/>
          </Col>
        </Row>
      </Container> */}
      <Wrapper>
        <TopMenu />
        <Content>
          <NavigationMenu />
          <PanelManager/>
        </Content>
      </Wrapper>
    </AppWrapper>
  );
}
