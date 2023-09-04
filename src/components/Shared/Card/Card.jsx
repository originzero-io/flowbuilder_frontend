import useAuthPermission from "utils/hooks/useAuthPermission";
import PropTypes from "prop-types";
import React from "react";
import { VscTrash } from "react-icons/vsc";
import flowServiceSocket from "services/configurationService/flowService/flowService.event";
import * as Styled from "./Card.style";
import DetailMenu from "./DetailMenu";
import flowServiceHttp from "services/configurationService/flowService/flowService.http";
import dockerizeServiceHttp from "services/dockerizeService/dockerizeService.http";
import { deleteFlow } from "store/reducers/flow/flowSlice";
import { useDispatch } from "react-redux";
import notificationHelper from "utils/ui/notificationHelper";
import { beginTheBar, endTheBar } from "store/reducers/componentSlice";

const propTypes = {
  data: PropTypes.object.isRequired,
};

const Card = ({ data }) => {
  const getPermission = useAuthPermission("project");
  const dispatch = useDispatch();
  const deleteCardHandler = async (e, flow) => {
    e.stopPropagation();
    if (confirm("Sure?")) {
      await flowServiceHttp.deleteFlow(flow._id);
      dispatch(deleteFlow(flow._id));
      notificationHelper.success("Flow deleted successfully");
      await dockerizeServiceHttp.deleteFlowContainer(flow._id);
    }
  };
  return (
    <Styled.CardContainer>
      <Styled.CardTitle>{data.name || ""}</Styled.CardTitle>
      <DetailMenu
        deleteEvent={deleteCardHandler}
        data={data}
        getPermission={getPermission}
      />
      <Styled.CardBody>
        <Styled.CardDescription>
          {data.description || ""}
        </Styled.CardDescription>
        <Styled.CardFooter>
          <Styled.CardAuthor>{data.port}</Styled.CardAuthor>
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
        </Styled.CardFooter>
      </Styled.CardBody>
    </Styled.CardContainer>
  );
};

Card.propTypes = propTypes;

export default Card;
