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
import { setError } from "../../../store/actions/errorActions";
import { Badge } from "reactstrap";

const Card = ({ data }) => {
  const dispatch = useDispatch();
  const deleteCardHandler = (e, flow) => {
    e.stopPropagation();
    if (confirm("Sure?")) {
      deleteFlowService(flow._id)
        .then(() => dispatch(deleteFlow(flow)))
        .catch((err) => dispatch(setError(err)));
    }
  };
  return (
    <Container>
      <CardTitle onClick={(e)=>e.stopPropagation()}>{data.config.name || ""}</CardTitle>
      <DetailMenu deleteEvent={deleteCardHandler} data={data} />
      <CardBody>
        <CardAuthor>{data.config.author || ""}</CardAuthor>
        <CardDescription>{data.config.description || ""}</CardDescription>
        <CardFooter>
          <Badge color="success">{data.project.name}</Badge>
          <span onClick={(e) => deleteCardHandler(e, data)}>
            <VscTrash style={{ fontSize: "22px" }} />
          </span>
        </CardFooter>
      </CardBody>
    </Container>
  );
};
export default Card;
Card.propTypes = {
  data: PropTypes.object.isRequired,
};
