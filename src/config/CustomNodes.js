import SetVariables from "../components/nodes/SetVariables";
import NotificationNode from "../components/nodes/Notification";
import CombineNode from "../components/nodes/Combine";
import SplitNode from "../components/nodes/Split";

const customNodes = {
  "Set Variables": SetVariables,
  Notification: NotificationNode,
  Split: SplitNode,
  Combine: CombineNode,
};

export default customNodes;
