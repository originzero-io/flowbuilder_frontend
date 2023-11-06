import styled from "styled-components";
import {
  DropdownList,
  DropdownWrapper,
} from "../../StyledComponents/DropdownMenu";

export const CardContainer = styled.div`
  margin: 4px;
  width: 220px;
  height: 150px;
  //width:15vw;
  //height:25vh;
  border-radius: 3px;
  user-select: none;
  background-color: #212529;
  border: 2px solid rgba(75, 75, 75, 0.7);
  cursor: pointer;
  color: white;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  &:hover {
    border: 2px solid #43b104;
  }
  display: flex;
  flex-direction: column;
  position: relative;
  text-overflow: ellipsis;
`;
export const CardBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-basis: 90%;
`;
export const CardTitle = styled.div`
  //display: flex;
  //justify-content: center;
  text-align: center;
  font-size: 1.6vmin;
  padding: 8px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  color: white;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const CardAuthor = styled.div`
  display: flex;
  justify-content: center;
  background: #43b104;
  margin-left: 6px;
  padding: 5px;
  font-size: 1.1vmin;
  border-radius: 3px;
`;
export const CardDescription = styled.div`
  font-size: 1.2vmin;
  padding-right: 5px;
  padding-left: 5px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: -40px;
`;
export const CardFooter = styled.div`
  position: absolute;
  bottom: 5px;
  left: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const CardMoreButton = styled.div`
  font-size: 20px;
  position: absolute;
  right: 2px;
  top: 1px;
  &:hover {
    color: #43b104;
  }
`;
export const DetailMenuList = styled(DropdownList)`
  font-size: 12px;
  min-width: 80px;
  color: black;
  background: whitesmoke;
  top: 30px;
  left: -10px;
  ${DropdownWrapper}:focus-within & {
    visibility: visible;
  }
  background: #212529;
  border: 1px solid rgba(75, 75, 75, 0.4);
  color: whitesmoke;
`;
export const DetailMenuItem = styled.li`
  padding: 8px;
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background: rgb(22, 139, 63);
  }
`;
