import styled from "styled-components";

export const NodeWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.align === "vertical" ? "column" : "row")};
  flex-wrap: wrap;
  justify-content: center;
  padding: 2px 2px;
  padding-bottom: 0px; //Added by "My name is Anıl Akseki"
  font-size: 12px;
  border-radius: 3px;
  text-align: center;
  background-color: #000000;
  box-shadow: 0.261px 1.5px 3px 0px rgba(0, 0, 0, 0.996);
  opacity: ${(props) => (props.enable ? "1" : "0.5")};
  background: ${(props) => (props.selected ? "#1DB954" : "#000000")};
  background-image: ${(props) =>
    props.selected
      ? "linear-gradient(355deg,rgb(7,46,21) 0%,rgb(22,139,63) 80%)"
      : "linear-gradient(355deg,#323232 0%,#505050 80%)"};
`;

export const NodeArea = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Header = styled.div`
  display: flex;
  min-width: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: start; //Added by "My name is Anıl Akseki"
  position: relative;
  margin: -2px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  box-shadow: 0.1px 0.5px 0.6px 0px rgba(0, 0, 0, 0.7);
  padding: 3px;
`;
export const Content = styled.div`
  width: 60%;
`;
export const Label = styled.div`
  color: white;
  padding-left: 5px;
  font-family: "Prime-Light";
`;
export const FeatureIconsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60px;
  position: absolute;
  right: 20px;
  padding-left: 5px;
`;

export const NodeContent = styled.div`
  padding: 10px;
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
  top: ${(props) => (props.align === "vertical" ? "5px" : "none")};
  left: ${(props) => (props.align === "vertical" ? "none" : "7px")};
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
