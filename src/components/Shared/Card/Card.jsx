import PropTypes from "prop-types";
import React from "react";
import { VscTrash } from "react-icons/vsc";
import { Badge } from "reactstrap";
import { flowNamespace } from "SocketConnections";
import Avatar from "../Avatar";
import {
  CardBody, CardContainer, CardDescription,
  CardFooter, CardTitle
} from "./Card.style";
import DetailMenu from "./DetailMenu";

const propTypes = {
  data: PropTypes.object.isRequired,
};

const Card = ({ data }) => {
  const deleteCardHandler = (e, flow) => {
    e.stopPropagation();
    if (confirm("Sure?")) {
      flowNamespace.emit("flows:remove", { flow });
    }
  };
  return (
    <CardContainer>
      <CardTitle>{data.config.name || ""}</CardTitle>
      <DetailMenu deleteEvent={deleteCardHandler} data={data} />
      <CardBody>
        {/* <CardAuthor>{data.config.createdBy.username || ""}</CardAuthor> */}
        <CardDescription>{data.config.description || ""}</CardDescription>
        <CardFooter>
          <Avatar avatar={data.config.createdBy.avatar} size={24} style={{marginLeft:'3px'}} />
          <div>
            <Badge color="success">{data.project.name || ""}</Badge>
            <span onClick={(e) => deleteCardHandler(e, data)}>
              <VscTrash style={{ fontSize: "22px" }} />
            </span>
          </div>
        </CardFooter>
      </CardBody>
    </CardContainer>
  );
};

Card.propTypes = propTypes; 

export default Card;