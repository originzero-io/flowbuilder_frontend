import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GoTriangleRight, GoTriangleLeft } from "react-icons/go";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import Tooltip from "components/Shared/Tooltip/Tooltip";

const Wrapper = styled.div`
  position: relative;
  min-width: ${({ showMenu }) => (showMenu ? "270px" : "0")};
  max-width: ${({ showMenu }) => (showMenu ? "270px" : "0")};
  background-color: #2d2d2d;
  box-shadow: 5px 3px 15px -7px rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease;
  z-index: ${({ showMenu }) => (showMenu ? "1000" : "none")};
`;
const EditorLeftMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const EditorMenuItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-left: 6px;
  padding-top: 10px;
`;
const ShowMenuButton = styled.div`
  color: #757575;
  font-size: 2.5vmin;
  width: 10px;
  height: 10px;
  position: absolute;
  top: 40%;
  right: -10px;
  z-index: 1000;
`;

const SearchBarWrapper = styled.div`
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 17px;
  position: relative;
  color: #a8a8a8;
`;
const SearchBar = styled.input`
  border-radius: 4px;
  width: 100%;
  padding: 6px;
  padding-left: 35px;
  background-color: #262626;
  border: none;
  color: #757575;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  margin: 2px;
`;
const CategoryName = styled.div`
  color: #c1c1c1;
  margin-bottom: 5px;
  border-bottom: 1px solid #262626;
`;

const NodeItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default function EditorLeftMenu({ showMenu, setShowMenu }) {
  const nodeList = useSelector((state) => state.panelNodeList);
  const [filteredCategories, setFilteredCategories] = useState({});
  const [categories, setCategories] = useState({});

  const searchHandle = (e) => {
    const { value } = e.target;

    const filteredObject = {};

    for (const category in categories) {
      const categoryItems = categories[category].filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase()),
      );

      if (categoryItems.length > 0) {
        filteredObject[category] = categoryItems;
      }
    }

    setFilteredCategories(filteredObject);
  };

  useEffect(() => {
    const groupedCategories = {};
    nodeList.forEach((node) => {
      const { category } = node;

      if (!groupedCategories[category]) {
        groupedCategories[category] = [];
      }

      groupedCategories[category].push(node);
    });

    setCategories(groupedCategories);
    setFilteredCategories(groupedCategories);
  }, [nodeList]);

  return (
    <Wrapper showMenu={showMenu}>
      <ShowMenuButton showMenu={showMenu} onClick={setShowMenu}>
        {showMenu ? <GoTriangleLeft /> : <GoTriangleRight />}
      </ShowMenuButton>
      <EditorLeftMenuWrapper>
        {/* <button onClick={groupNodesByCategory}>group</button> */}
        <SearchBarWrapper>
          <SearchBar placeholder="Filter nodes" onChange={searchHandle} />
          <AiOutlineSearch
            style={{
              position: "absolute",
              top: "18%",
              left: "2%",
              fontSize: "22px",
            }}
          />
        </SearchBarWrapper>
        <EditorMenuItemWrapper>
          {Object.keys(filteredCategories).map((category) => (
            <CategoryWrapper key={category}>
              <CategoryName>{category}</CategoryName>
              <NodeItemWrapper>
                {filteredCategories[category].map((node) => (
                  <LeftMenuItem key={node.id} node={node} />
                ))}
              </NodeItemWrapper>
            </CategoryWrapper>
          ))}
        </EditorMenuItemWrapper>
      </EditorLeftMenuWrapper>
    </Wrapper>
  );
}

const StyledMenuItem = styled.div`
  width: 75px;
  height: 76px;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.4);
  background: #262626;
  border-radius: 4px;
  border: 1px #43b104 solid;
  border: ${({ nodeType }) =>
    nodeType === "TRIGGER" ? "1px #43b104 solid;" : "1px #515C85 solid"};
  color: ${({ nodeType }) => (nodeType === "TRIGGER" ? "#65CD1A" : "#A6B3E8")};
  margin: 4px;
  font-size: 12.1px;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #333333;
  }
`;
const NodeLabel = styled.div`
  margin-top: 7px;
  font-size: 9px;
  overflow: hidden;
  padding: 5px;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
`;
function LeftMenuItem({ node }) {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <>
      <StyledMenuItem
        nodeType={node.type}
        onDragStart={(event) => onDragStart(event, node.type)}
        draggable
        data-tip={node.name}
        data-for={`pnl-${node.id}`}
      >
        <div>{node.icon}</div>
        <NodeLabel>{node.name}</NodeLabel>
      </StyledMenuItem>
      <Tooltip id={`pnl-${node.id}`} place="top" type="light" />
    </>
  );
}