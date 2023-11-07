import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import NodeConfigMenu from "../../NodeConfigMenu/NodeConfigMenu";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { LuSettings2 } from "react-icons/lu";
import { BiInfoCircle } from "react-icons/bi";
import { PiTreeStructure } from "react-icons/pi";
import { useState } from "react";

const EditorRightMenuWrapper = styled.div`
  padding: 12px;
  position: relative;
`;
const TabName = styled.div`
  position: absolute;
  top: 2vh;
  border: 1px solid #c1c1c1;
  color: #c1c1c1;
  padding: 4px 20px 4px 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: none;
`;

export default function EditorRightMenu() {
  const { nodeConfigMenu } = useSelector((state) => state.menus);
  const [tabName, setTabName] = useState("Properties");
  const dispatch = useDispatch();

  return (
    <EditorRightMenuWrapper>
      <TabName>{tabName}</TabName>
      <Tabs defaultIndex={1} selectedTabClassName="selected-tab">
        <TabList
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Tab onClick={() => setTabName("Info")}>
            <BiInfoCircle />
          </Tab>
          <Tab onClick={() => setTabName("Properties")}>
            <LuSettings2 />
          </Tab>
          <Tab onClick={() => setTabName("Flow")}>
            <PiTreeStructure />
          </Tab>
        </TabList>

        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          {Object.hasOwn(nodeConfigMenu.element, "id") ? (
            <NodeConfigMenu />
          ) : (
            <div>Select any node</div>
          )}
        </TabPanel>
      </Tabs>
    </EditorRightMenuWrapper>
  );
}
