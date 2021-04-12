import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GroupBarWrapper } from "../../style-components/AppWrapper";
import GroupBarIcon from "./GroupBarIcon";
import GroupList from "./GroupList";
import NewGroupForm from "./NewGroupForm";
export default function GroupBar() {
  const { theme } = useSelector((state) => state.guiConfigReducer);
  const { groupBarDisplay } = useSelector((state) => state.flowConfigReducer);
  return (
    <GroupBarWrapper visible={groupBarDisplay}>
      <NewGroupForm theme={theme}/>
      <GroupList theme={theme} />
      <GroupBarIcon/>
    </GroupBarWrapper>
  );
}
