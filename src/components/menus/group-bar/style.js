import styled from "styled-components";
export const Container = styled.div`
  position: absolute;
  border-radius: 6px;
  top: 30%;
  left:-30px;
  cursor: pointer;
  z-index: 6;
  user-select: none;
  font-size: 24px;
  color: rgb(22, 162, 165);
`;

export const GroupItem = styled.div`
  padding: 2px 6px 2px 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: ${(props) => (props.theme === "dark" ? "whitesmoke" : "whitesmoke")};
  margin: 4px;
  border-radius: 4px;
  user-select: none;
  font-size: 12px;
  &:hover {
    background: #273c75;
  }
`;
export const ColorBox = styled.div`
  background-color: ${(props) => props.color};
  width: 15px;
  height: 15px;
  border-radius: 128px;
`;

export const AddGroupWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0px 5px 0px 5px;
  margin: 5px;
`;
export const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
export const Title = styled.div`
  color: whitesmoke;
  margin-left: 6px;
  user-select: none;
`;
export const IconWrapper = styled.div`
  cursor: pointer;
`;
export const Label = styled.div``;

export const InputWrapper = styled.div`
  position: relative;
  margin-top: 3px;
`;
export const Input = styled.input`
  border-radius: 4px;
  height: 30px;
  width: 100%;
  padding-left: 30px;
  background-color: transparent;
  border: 1px solid #636e72;
  user-select: none;
  color: whitesmoke;
  font-size: 11px;
  &:focus {
    box-shadow: 0px 0px 44px -4px rgba(0, 0, 0, 0.75);
  }
`;
export const ColorInput = styled.input`
  width: 26px;
  height: 30px;
  cursor: pointer;
  position: absolute;
  top: 0px;
  left: 0px;
`;
export const Submit = styled.button`
  border: none;
  background: transparent;
  position: absolute;
  top: 2px;
  right: 0px;
  cursor: pointer;
`;

export const ColorFlag = styled.input`
  border: none;
  border-image: none;
  width: 20px;
  background: none;
  color: transparent;
  cursor: pointer;
`;
export const DeleteButton = styled.button`
  border: none;
  background: none;
  padding-left: 1px;
  padding-right: 1px;
  color: #c0392b;
`;
export const Divider = styled.div`
  width: 90%;
  height: 1px;
  background: gray;
  margin: auto;
  margin-top: 7px;
  opacity: 0.4;
`;
