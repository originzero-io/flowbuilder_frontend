import React from "react";
import Avatar from "components/Shared/Avatar";
import PropTypes from "prop-types";
import useWorkspace from "hooks/useWorkspace";
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

const propTypes = {
  member: PropTypes.object.isRequired,
};
export default function UserHeader({ member }) {
  const { activeWorkspace } = useWorkspace();
  return (
    <Container>
      <Avatar avatar={member.avatar} size={60} />
      <Title>
        {member.username}
        's Permissions of
        {activeWorkspace.name}
      </Title>
    </Container>
  );
}

UserHeader.propTypes = propTypes;
