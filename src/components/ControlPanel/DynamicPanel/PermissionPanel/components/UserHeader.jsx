import React from "react";
import Avatar from "../../../../global/Avatar";
import PropTypes from "prop-types";
import useWorkspace from "../../../../../utils/useWorkspace";
import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Title = styled.div`
  margin-top: 5px;
  font-size: 2vmin;
`;
export default function UserHeader({ member }) {
  const { activeWorkspace } = useWorkspace();
  return (
    <Container>
      <Avatar avatar={member.avatar} size={60} />
      <Title>
        {member.username}'s Permissions of {activeWorkspace.name}
      </Title>
    </Container>
  );
}

UserHeader.propTypes = {
  member: PropTypes.object.isRequired,
};