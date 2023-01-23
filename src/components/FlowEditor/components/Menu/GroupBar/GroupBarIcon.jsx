import React from "react";
import { Container } from "./GroupBar.style";
import { useDispatch } from "react-redux";
import { setGroupBarDisplay } from "store/reducers/flow/flowGuiSlice";
import { GroupIcon } from "components/Shared/icons";
import useActiveFlow from "hooks/useActiveFlow";
import { getGroups } from "store/reducers/flow/flowGroupsSlice";

export default function GroupBarIcon({ theme, flowId }) {
  const { flowGui } = useActiveFlow();
  const dispatch = useDispatch();
  const { groupBarDisplay } = flowGui;
  const groupBarDisplayHandle = () => {
    if (groupBarDisplay === "visible") {
      dispatch(setGroupBarDisplay("hidden"));
      dispatch(getGroups(flowId));
    } else {
      dispatch(setGroupBarDisplay("visible"));
    }
  };
  return (
    <Container onClick={groupBarDisplayHandle} theme={theme}>
      <GroupIcon width="50px" height="50px" color="whitesmoke" theme={theme} />
    </Container>
  );
}
