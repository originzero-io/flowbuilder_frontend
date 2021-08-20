import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProjectsByTeamService } from "../../../services/projectService";
import { getTeamsService } from "../../../services/teamService";
import { setModal } from "../../../store/actions/componentActions";
import { setActiveProject } from "../../../store/actions/controlPanelActions";
import { setError } from "../../../store/actions/errorActions";
import { loadProjects } from "../../../store/actions/projectActions";
import { loadTeams,setActiveTeam } from "../../../store/actions/teamActions";
import AddTeamForm from "./AddTeamForm";
import { AddTeamButton, TeamItem, TeamsContainer } from "./style";

const TeamList = () => {
  const { teams } = useSelector((state) => state.teamReducer);
  const dispatch = useDispatch();
  console.log("team list rendered");
  useEffect(() => {
    getTeamsService()
      .then((teams) => {
        dispatch(loadTeams(teams));
        dispatch(setActiveTeam(teams[0]));
        return getProjectsByTeamService(teams[0]._id);
      })
      .then((projects) => {
        dispatch(loadProjects(projects));
      })
      .catch((err) => dispatch(setError(err)));
  }, []);

  const clickTeamHandle = (team) => {
    getProjectsByTeamService(team._id)
      .then((projects) => {
        dispatch(setActiveTeam(team))
        dispatch(loadProjects(projects));
      })
      .catch((err) => dispatch(setError(err)));
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
      <AddTeamButton onClick={()=>dispatch(setModal(true,<AddTeamForm/>))}><i className="fas fa-plus"></i></AddTeamButton>
    </TeamsContainer>
  );
};

export default TeamList;
