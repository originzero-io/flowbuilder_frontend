import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProjectsByTeamService } from "../../../services/projectService";
import { getTeamsService } from "../../../services/teamService";
import { loadProjects } from "../../../store/actions/projectActions";
import { loadTeams,setActiveTeam } from "../../../store/actions/teamActions";
import Modal from "../../global/Modal";
import AddTeamForm from "./AddTeamForm";
import { AddTeamButton, TeamItem, TeamsContainer } from "./style";

const TeamList = () => {
  const { teams } = useSelector((state) => state.teamReducer);
  const dispatch = useDispatch();
  console.log("team list rendered");
  useEffect(() => {
    getTeamsService()
      .then((res) => {
        console.log("res:", res);
        dispatch(loadTeams(res.teams));
        dispatch(setActiveTeam(res.teams[0]));
      })
      .catch((err) => console.log("team error:", err));
  }, []);
  const clickTeamHandle = async (team) => {
    const projects = await getProjectsByTeamService(team._id);
    dispatch(setActiveTeam(team))
    dispatch(loadProjects(projects));
  };
  const [showModal, setShowModal] = useState(false);
  const showModalHandle = (type) => {
    setShowModal(true);
  };
  const hideModalHandle = () => {
    setShowModal(false);
  };
  return (
    <TeamsContainer>
      {teams.map((team) => {
        return (
          <TeamItem
            key={team._id}
            onClick={()=>clickTeamHandle(team)}
          >
            {team.name.split("")[0].toUpperCase()}
          </TeamItem>
        );
      })}
      <AddTeamButton onClick={showModalHandle}><i className="fas fa-plus"></i></AddTeamButton>
      <Modal isOpen={showModal} onRequestClose={hideModalHandle}>
        <AddTeamForm closeModal={hideModalHandle} />
      </Modal>
    </TeamsContainer>
  );
};

export default TeamList;
