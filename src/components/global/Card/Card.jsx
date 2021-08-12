import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  Container,
  CardBody,
  CardTitle,
  CardAuthor,
  CardDescription,
  CardFooter,
} from "./style";
import { VscTrash } from "react-icons/vsc";
import DetailMenu from "./DetailMenu";
import { deleteFlowService } from "../../../services/flowService";
import { deleteFlow } from "../../../store/actions/flowActions";

const Card = ({ data }) => {
  const dispatch = useDispatch();
  const deleteCardHandler = async (e, flow) => {
    e.stopPropagation();
    if (confirm("Sure?")) {
      await deleteFlowService(flow._id);
      dispatch(deleteFlow(flow));
    }
  };
  return (
    <Container>
      <CardTitle>{data.config.name || ""}</CardTitle>
      <DetailMenu deleteEvent={deleteCardHandler} />
      <CardBody>
        <CardAuthor>{data.config.author || ""}</CardAuthor>
        <CardDescription>{data.config.description || ""}</CardDescription>
        <CardFooter>
          <div onClick={(e) => deleteCardHandler(e, data)}>
            <VscTrash style={{ fontSize: "22px" }} />
          </div>
        </CardFooter>
      </CardBody>
    </Container>
  );
};
export default Card;
Card.propTypes = {
  data: PropTypes.object.isRequired,
};
