import React from "react";
import styled from "styled-components";
const Container = styled.div`
  margin: 7px;
  width: 150px;
  height: 150px;
  border: 1px solid rgba(189, 195, 199, 0.8);
  border-radius: 4px;
  user-select: none;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: rgba(210, 218, 226, 1);
    transition: background-color 0.3s ease-in-out;
    transform: scale(1.1);
  }
`;
const BodyContainer = styled.div`
  padding: 0.5rem;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
`;
const SubtitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const TextContainer = styled.div`
  color: darkgray;
  font-size: 12px;
`;
const FooterContainer = styled.div`
  position: absolute;
  bottom: 0px;
  right: 5px;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(189, 195, 199, 0.6);
  margin-bottom: 3px;
`;
export function Card({ children }) {
  return <Container>{children}</Container>;
}
export function CardBody({ children }) {
  return <BodyContainer>{children}</BodyContainer>;
}
export function CardTitle({ children }) {
  return <TitleContainer>{children}</TitleContainer>;
}
export function CardSubtitle({ children }) {
  return (
    <>
      <SubtitleContainer>{children}</SubtitleContainer>
      <Divider />
    </>
  );
}
export function CardText({ children }) {
  return <TextContainer>{children}</TextContainer>;
}
export function CardFooter({ children }) {
  return <FooterContainer>{children}</FooterContainer>;
}
