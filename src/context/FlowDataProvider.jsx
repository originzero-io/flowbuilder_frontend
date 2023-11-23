import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const FlowDataContext = createContext();

export const useFlowContext = () => useContext(FlowDataContext);

export const FlowDataProvider = ({ children }) => {
  const [syncedFlow, setSyncedFlow] = useState(true);

  const value = {
    syncedFlow,
    setSyncedFlow,
  };

  return <FlowDataContext.Provider value={value}>{children}</FlowDataContext.Provider>;
};

FlowDataProvider.propTypes = {
  children: PropTypes.element,
};
