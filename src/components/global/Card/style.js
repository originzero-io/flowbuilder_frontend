import styled from "styled-components";
import { DropdownList,DropdownWrapper } from "../../style-components/DropdownMenu";
export const Container = styled.div`
  margin: 7px;
  width: 160px;
  height: 150px;
  border-radius: 6px;
  user-select: none;
  background-color: #212529;
  border: 2px solid rgba(75, 75, 75, 0.4);
  cursor: pointer;
  color: white;
  transition: background-color 0.3s ease-in-out;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  &:hover {
    background-color: rgba(46, 204, 113, 0.4);
    transition: background-color 0.2s ease-in-out;
  }
  display: flex;
  flex-direction: column;
  position: relative;
  //border:1px solid rgb(22, 139, 63);
`;
export const CardBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-basis: 90%;
`;
export const CardTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  padding: 5px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  color: white;
`;
export const CardAuthor = styled.div`
  display: flex;
  justify-content: center;
`;
export const CardDescription = styled.div`
  //color: black;
  font-size: 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 20px;
`;
export const CardFooter = styled.div`
  position: absolute;
  bottom: 5px;
  right: 8px;
`;
export const CardMoreButton = styled.div`
  font-size: 20px;
  color: rgb(46, 204, 113);
  position: absolute;
  right: 2px;
  top: 1px;
  &:hover {
    color: #2ecc71;
  }
`;
export const DetailMenuList = styled(DropdownList)`
  font-size: 12px;
  min-width: 80px;
  color: black;
  background:whitesmoke;
  top: 30px;
  left: -10px;
  ${DropdownWrapper}:focus-within & {
    visibility: visible;
  }
  padding-top: 5px;
  padding-bottom: 5px;
  background:#212529;
  border:1px solid rgba(75, 75, 75, 0.4);
  color:whitesmoke;
  z-index:999999;
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
