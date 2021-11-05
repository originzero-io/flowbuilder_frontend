import React from "react";
import { deleteTeamService } from "../../../services/teamService";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../../store/actions/componentActions";
import { setError } from "../../../store/actions/errorActions";
import { deleteTeam, setActiveTeam } from "../../../store/actions/teamActions";
import { VscTrash } from "react-icons/vsc";
import { BiEdit } from "react-icons/bi";
import EditTeamForm from "../TeamPanel/EditTeamForm";
import { TeamBrandWrapper } from "./style";
import PropTypes from "prop-types";
const TeamBrand = ({ team }) => {
  console.log("TEAM BRAND RENDERED");
  const dispatch = useDispatch();
  const { activeTeam } = useSelector((state) => state.teams);
  const deleteTeamHandler = () => {
    if (confirm(`${team.name} takımını silmek istiyor musunuz?`)) {
      deleteTeamService(team._id)
        .then((res) => {
          dispatch(deleteTeam(res.team._id));
          dispatch(setActiveTeam(""));
        })
        .catch((err) => dispatch(setError(err)));
    }
  };
  const editTeamHandler = () => {
    dispatch(setModal(true, <EditTeamForm />));
  };
  return (
    <TeamBrandWrapper>
      {activeTeam && (
        <>
          <span>{team.name}</span>
          <div>
            <span onClick={editTeamHandler} style={{ marginRight: "5px" }}>
              <BiEdit style={{ fontSize: "20px" }} />
            </span>
            <span onClick={deleteTeamHandler}>
              <VscTrash style={{ fontSize: "20px" }} />
            </span>
          </div>
        </>
      )}
    </TeamBrandWrapper>
  );
};

TeamBrand.propTypes = {
  team: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
export default React.memo(TeamBrand);
