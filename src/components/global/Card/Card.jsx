import React from "react";
import PropTypes from "prop-types";
import {
  CardContainer,
  CardBody,
  CardTitle,
  CardAuthor,
  CardDescription,
  CardFooter,
} from "./style";
import { VscTrash } from "react-icons/vsc";
import DetailMenu from "./DetailMenu";
import { deleteFlow } from "../../../store/reducers/flow/flowReducer";
import { Badge } from "reactstrap";
import { flowNamespace } from "../../../components/global/SocketConnections";
import Avatar from "../Avatar";
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
export default Card;
Card.propTypes = {
  data: PropTypes.object.isRequired,
};
