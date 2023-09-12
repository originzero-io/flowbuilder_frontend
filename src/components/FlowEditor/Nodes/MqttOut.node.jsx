import React from "react";
import NodeGod from "./shared/NodeGod";

const MqttOutNode = (self) => <NodeGod self={self} collapsable />;

export default React.memo(MqttOutNode);
