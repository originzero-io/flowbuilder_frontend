import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const PermissionContext = createContext({});
export function PermissionProvider({ children }) {
  const [permission1, setPermission1] = useState({ canLoveMe: true });
  const [controllers, setControllers] = useState([
    {
      _id: "1",
      name: "Controller 1",
      canUse: false,
      canEdit: false,
    },
    {
      _id: "2",
      name: "Controller 2",
      canUse: false,
      canEdit: false,
    },
    {
      _id: "3",
      name: "Controller 3",
      canUse: false,
      canEdit: false,
    },
    {
      _id: "4",
      name: "Controller 4",
      canUse: false,
      canEdit: false,
    },
  ]);
  const [processors, setProcessors] = useState([
    {
      _id: "1",
      name: "Processor 1",
      canUse: false,
      canEdit: false,
    },
    {
      _id: "2",
      name: "Processor 2",
      canUse: false,
      canEdit: false,
    },
  ]);
  const [selectAllControllers, setSelectAllControllers] = useState({
    canUse: false,
    canEdit: false,
  });
  const [selectAllProcessors, setSelectAllProcessors] = useState({
    canUse: false,
    canEdit: false,
  });
  const value = {
    permission1,
    setPermission1,
    controllers,
    setControllers,
    processors,
    setProcessors,
    selectAllControllers,
    setSelectAllControllers,
    selectAllProcessors,
    setSelectAllProcessors,
  };
  console.log("CONTEXT RENDERED");
  const [permissions, setPermissions] = useState({
    create: {
      controller: false,
      processor: false,
      project: false,
      dashboard: [
        /*project_id*/
      ],
      flow: [
        /*project_id*/
      ],
    },
    usage: {
      controllers: [
        /*controller_id*/
      ],
      processors: [
        /*processor_id*/
      ],
      projects: [
        /*project_id*/
      ],
      flows: [
        /*flow_id*/
      ],
      nodes: [
        /*node_id*/
      ],
    },
    edit: {
      controllers: [
        /*controller_id*/
      ],
      processors: [
        /*processor_id*/
      ],
      projects: [
        /*project_id*/
      ],
      flows: [
        /*flow_id*/
      ],
      nodes: [
        /*node_id*/
      ],
    },
    //TODO:observe this
    delete: {
      controller: false,
      processor: false,
      projects: [],
      flows: [],
      nodes: [],
    },
  });
  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
}

PermissionProvider.propTypes = {
  children: PropTypes.element,
};

export default PermissionContext;
