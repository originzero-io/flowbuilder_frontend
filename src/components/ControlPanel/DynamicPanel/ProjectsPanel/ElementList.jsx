import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import Card from "../../../Global/Card/Card";

const ElementList = ({ elements }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const openPageHandler = (element) => {
    history.push(`/flow/${element._id}`);
  };
  return (
    <>
      {elements && elements.map((element) => {
        return (
          <Link key={element._id} to={`/flow/${element._id}`} onClick={(e)=>e.stopPropagation()}>
            <Card key={element._id} data={element} />
          </Link>
          // <div key={element._id} onClick={() => openPageHandler(element)}>
          //   <Card key={element._id} data={element} />
          // </div>
        );
      })}
    </>
  );
}
ElementList.propTypes = {
  elements: PropTypes.oneOfType([PropTypes.array, null])
}
export default React.memo(ElementList);