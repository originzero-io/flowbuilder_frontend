import styled from "styled-components";
export const NodeWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.align === "vertical" ? "column" : "row")};
  flex-wrap: wrap;
  justify-content: center;
  padding: 2px 2px;
  padding-bottom: 0px; //Added by "My name is Anıl Akseki"
  font-size: 12px;
  border-radius: 2px;
  text-align: center;
  background-color: #000000;
  background-image: linear-gradient(
    355deg,
    #323232 0%,
    ${(props) => (props.selected === true ? "#808080" : "#505050")} 80%
  );
  box-shadow: 0.261px 1.5px 3px 0px rgba(0, 0, 0, 0.996);
`;

export const NodeArea = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Header = styled.div`
  display: flex;
  min-width: 190px;
  justify-content: space-between;
  align-items: center;
  text-align: start; //Added by "My name is Anıl Akseki"
  position:relative;
`;
export const Label = styled.div`
  color: rgb(220, 220, 220);
  width: 100%;
  padding-left: 10px;
  font-family: "Prime-Light";
`;

export const NodeContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: ${(props) => (props.type === "logo" ? "1" : "none")};
`;

export const TargetWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: ${(props) => (props.align === "vertical" ? "row" : "column")};
  width: ${(props) => (props.align === "vertical" ? "none" : "0px")};
  height: ${(props) => (props.align === "vertical" ? "0px" : "none")};
  bottom: ${(props) => (props.align === "vertical" ? "13px" : "none")};
  right: ${(props) => (props.align === "vertical" ? "none" : "15px")};
`;
export const SourceWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: ${(props) => (props.align === "vertical" ? "row" : "column")};
  justify-content: center;
  width: ${(props) => (props.align === "vertical" ? "none" : "0px")};
  height: ${(props) => (props.align === "vertical" ? "0px" : "none")};
  top: ${(props) => (props.align === "vertical" ? "4px" : "none")};
  left: ${(props) => (props.align === "vertical" ? "none" : "4px")};
`;

export const Divider = styled.div`
  background-color: #7cffcb;
  height: 1px;
  width: 100%;
  border-radius: 8px;
  opacity: 0.1;
  margin-top: -2px;
`;

export const Info = styled.div`
  width: 10px;
  position: absolute;
  right: 5px;
  bottom: 0;
  cursor: "pointer";
`;
