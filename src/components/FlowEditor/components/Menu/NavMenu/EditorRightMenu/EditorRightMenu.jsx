import { useSelector } from "react-redux";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { LuSettings2 } from "react-icons/lu";
import { PiTreeStructure } from "react-icons/pi";
import { useState } from "react";
import NodeConfigurationMenu from "./NodeConfigurationMenu/NodeConfigurationMenu";
import FlowInformationMenu from "./FlowInformationMenu/FlowInformationMenu";

const EditorRightMenuWrapper = styled.div`
  padding: 12px;
  position: relative;
  color: #e7e5e5;
  height: 100%;
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
  const { nodeConfigurationMenu } = useSelector((state) => state.menus);
  const [tabName, setTabName] = useState("Node Configuration");

  return (
    <EditorRightMenuWrapper>
      <TabName>{tabName}</TabName>
      <Tabs defaultIndex={0} selectedTabClassName="selected-tab" style={{ height: "100%" }}>
        <TabList
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Tab onClick={() => setTabName("Node Configuration")}>
            <LuSettings2 />
          </Tab>
          <Tab onClick={() => setTabName("Flow")}>
            <PiTreeStructure />
          </Tab>
        </TabList>

        <TabPanel>
          {Object.hasOwn(nodeConfigurationMenu.element, "id") ? (
            <NodeConfigurationMenu />
          ) : (
            <div>Select any node</div>
          )}
        </TabPanel>
        <TabPanel>
          <FlowInformationMenu />
        </TabPanel>
      </Tabs>
    </EditorRightMenuWrapper>
  );
}
