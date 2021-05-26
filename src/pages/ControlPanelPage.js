import React from "react";
import { Container, Row, Col } from "reactstrap";
import NavigationMenu from "../components/control-panel/menu/nav-menu";
import TopMenu from "../components/control-panel/menu/top-menu";
import PanelManager from "../components/control-panel/side-panels";
import { AppWrapper } from "../components/style-components/AppWrapper";
export default function ControlPanelPage() {
  return (
    <AppWrapper>
      <Container fluid={true}>
        <Row>
          <TopMenu />
        </Row>
        <Row>
          <Col xs="4" md="3" lg="2">
            <NavigationMenu />
          </Col>
          <Col xs="8" md="9" lg="10">
            <PanelManager/>
          </Col>
        </Row>
      </Container>
    </AppWrapper>
  );
}
