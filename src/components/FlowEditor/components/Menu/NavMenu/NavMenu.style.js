import styled from "styled-components";

export const MenuIndex = styled.div`
  position: absolute;
  min-width: 250px;
  z-index: 6;
  display: flex;
  flex-direction: row;
  background: #fefefe;
  justify-content: space-around;
  align-items: center;
  font-size: 15px;
  padding: 4px;
`;
export const Menu = styled(MenuIndex)`
  background: ${(props) => props.theme.menuBackground};
  border-radius: 6px;
  top: 10px;
  right: 45px;
  width: 160px;
`;
export const MenuItem = styled.button`
  background: none;
  border: none;
  user-select: none;
  margin: 2px;
  color: ${(props) => props.theme.iconColor};
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
