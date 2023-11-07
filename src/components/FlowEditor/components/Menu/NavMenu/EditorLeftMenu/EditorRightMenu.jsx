import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import NodeConfigMenu from "../../NodeConfigMenu/NodeConfigMenu";

const EditorRightMenuWrapper = styled.div`
  padding: 12px;
`;

export default function EditorRightMenu() {
  const { nodeConfigMenu } = useSelector((state) => state.menus);
  const dispatch = useDispatch();

  return (
    <EditorRightMenuWrapper>
      {Object.hasOwn(nodeConfigMenu.element, "id") ? (
        <NodeConfigMenu self={nodeConfigMenu.element} />
      ) : (
        <div>Select any node</div>
      )}
    </EditorRightMenuWrapper>
  );
}
