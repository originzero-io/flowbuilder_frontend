import React, { useState } from "react";
import NodeGod from "./shared/NodeGod";

const NotificationNode = (self) => {
  return <NodeGod self={self} collapsable={false} />;
};

export default React.memo(NotificationNode);
