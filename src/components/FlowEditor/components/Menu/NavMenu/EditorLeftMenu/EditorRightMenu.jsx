import React from "react";
import styled from "styled-components";
import { GoTriangleRight, GoTriangleLeft } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { setNodeConfigMenu } from "store/reducers/menuSlice";
import { Flexboard, FlexboardProvider, FlexboardFrame, ResizerType, Position } from "@dorbus/flexboard";
import NodeConfigMenu from "../../NodeConfigMenu/NodeConfigMenu";

const ShowMenuButton = styled.div`
  color: #757575;
  font-size: 2.5vmin;
  width: 10px;
  height: 10px;
  position: absolute;
  top: 40%;
  left: -20px;
  z-index: 1000;
`;

export default function EditorRightMenu() {
  const { nodeConfigMenu } = useSelector((state) => state.menus);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    if (nodeConfigMenu.state === true) {
      dispatch(setNodeConfigMenu({ element: nodeConfigMenu.element, state: false }));
    } else {
      console.log("falseee");
      console.log(nodeConfigMenu.element);
      dispatch(setNodeConfigMenu({ element: nodeConfigMenu.element, state: true }));
    }
  };

  return (
    <FlexboardProvider>
      {nodeConfigMenu.state ? (
        <Flexboard
          direction={Position.right}
          draggable={true}
          width={300}
          minWidth={300}
          maxWidth={900}
          flexboardStyle={{
            backgroundColor: "#2d2d2d",
            color: "whitesmoke",
            marginRight: "-2px",
            boxShadow: "5px -7px 15px 3px rgba(0, 0, 0, 0.5)",
            position: "relative",
          }}
          resizerStyle={{
            backgroundColor: "#2d2d2d",
            borderLeft: "0.5px solid black",
            borderRight: "0.5px solid black",
            width: "6px",
          }}
          resizerType={ResizerType.gutterlane}
        >
          {/* <div>Flexboard Content</div> */}
          <ShowMenuButton showMenu={nodeConfigMenu.state} onClick={toggleMenu}>
            {nodeConfigMenu.state ? <GoTriangleRight /> : <GoTriangleLeft />}
          </ShowMenuButton>
          {Object.hasOwn(nodeConfigMenu.element, "id") && <NodeConfigMenu self={nodeConfigMenu.element} />}
        </Flexboard>
      ) : (
        <div style={{ position: "relative" }}>
          <ShowMenuButton showMenu={nodeConfigMenu.state} onClick={toggleMenu}>
            {nodeConfigMenu.state ? <GoTriangleRight /> : <GoTriangleLeft />}
          </ShowMenuButton>
        </div>
      )}
    </FlexboardProvider>
  );
}
