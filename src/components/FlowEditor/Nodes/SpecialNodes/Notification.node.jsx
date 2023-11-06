import React, { useEffect } from "react";
import NodeGod from "../shared/NodeGod";
import flowExecutorEvent from "services/flowExecutorService/flowExecutor.event";
import notificationHelper from "utils/ui/notificationHelper";

const NotificationNode = ({ self }) => {
  useEffect(() => {
    flowExecutorEvent.socket.on(`LOG-${self.id}`, (data) => {
      const log = JSON.stringify(data.value);
      notificationHelper.warn(`${self.id} \n ${log}`);
    });
  }, []);

  return <NodeGod self={self} />;
};

export default React.memo(NotificationNode);
