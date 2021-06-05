import React from "react";
import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux"
import PropTypes from "prop-types"

export default function Tooltip({ id, place, others }) {
  const { theme } = useSelector((state) => state.guiConfigReducer);
  console.log("others:", others);
  return (
    <>
      <ReactTooltip
        id={id}
        place={place}
        type={theme==="dark" ? "light" : "dark"}
        effect="solid"
        delayHide={120}
        delayShow={50}
        className="custom-tooltip"
        {...others}
      />
    </>
  );
}

Tooltip.propTypes = {
  id: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  others: PropTypes.any
}
