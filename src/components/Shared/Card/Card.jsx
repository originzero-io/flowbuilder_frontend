import useAuthPermission from "utils/hooks/useAuthPermission";
import PropTypes from "prop-types";
import React from "react";
import { VscTrash } from "react-icons/vsc";
import { flowNamespace } from "app/SocketConnections";
import {
  CardBody,
  CardContainer,
  CardDescription,
  CardFooter,
  CardTitle,
  CardAuthor,
} from "./Card.style";
import DetailMenu from "./DetailMenu";

const propTypes = {
  data: PropTypes.object.isRequired,
};

const Card = ({ data }) => {
  const getPermission = useAuthPermission("project");
  const deleteCardHandler = (e, flow) => {
    e.stopPropagation();
    if (confirm("Sure?")) {
      flowNamespace.emit("flows:delete", { flow });
    }
  };
  return (
    <CardContainer>
      <CardTitle>{data.config.name || ""}</CardTitle>
      <DetailMenu
        deleteEvent={deleteCardHandler}
        data={data}
        getPermission={getPermission}
      />
      <CardBody>
        <CardDescription>{data.config.description || ""}</CardDescription>
        <CardFooter>
          <CardAuthor>{data.config.createdBy.username || ""}</CardAuthor>
          <div>
            {getPermission("CAN_EDIT_FLOW", {
              flowId: data._id,
              projectId: data.project._id,
            }) && (
              <span onClick={(e) => deleteCardHandler(e, data)}>
                <VscTrash style={{ fontSize: "22px", marginRight: "6px" }} />
              </span>
            )}
          </div>
        </CardFooter>
      </CardBody>
    </CardContainer>
  );
};

Card.propTypes = propTypes;

export default Card;
