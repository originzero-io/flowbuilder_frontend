import React, { useEffect,useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import { getFlowByProjectService, getFlowsByTeamService } from "../../../services/flowService";
import { getProjectsByTeamService } from "../../../services/projectService";
import { getTeamsService } from "../../../services/teamService";
import { setModal } from "../../../store/actions/componentActions";
import { setError } from "../../../store/actions/errorActions";
import { loadFlows } from "../../../store/actions/flowActions";
import { loadProjects } from "../../../store/actions/projectActions";
import { loadTeams,setActiveTeam } from "../../../store/actions/teamActions";
import AddTeamForm from "./AddTeamForm";
import { AddTeamButton, TeamItem, TeamsContainer } from "./style";

const TeamList = () => {
  const { teams,activeTeam } = useSelector((state) => state.teams);
  const dispatch = useDispatch();
  console.log("team list rendered");
  useEffect(async () => {
    try {
      const teams = await getTeamsService();
      dispatch(loadTeams(teams));
      if (teams.length > 0) {
        dispatch(setActiveTeam(teams[0]));
        const projects = await getProjectsByTeamService(teams[0]);
        dispatch(loadProjects(projects));
      }
      else {
        dispatch(setActiveTeam(""));
        dispatch(loadProjects([]));
        dispatch(loadFlows([]));
      }
    }
    catch (error) {
      dispatch(setError(error))
    }
  }, []);

  const clickTeamHandle = async(team) => {
    const projects = await getProjectsByTeamService(team);
    dispatch(setActiveTeam(team))
    dispatch(loadProjects(projects));

    const flows = await getFlowsByTeamService(team);
    dispatch(loadFlows(flows.flows));
  };
  return (
    <TeamsContainer>
      {teams.map((team) => {
        return (
          <TeamItem
            key={team._id}
            active={team._id === activeTeam._id}
            onClick={()=>clickTeamHandle(team)}
          >
            <div style={{color:'white',paddingLeft:'8px',paddingRight:'8px',borderRadius:'4px'}}>
              {team.name.split("")[0].toUpperCase()}
            </div>
          </TeamItem>
        );
      })}
      <AddTeamButton onClick={()=>dispatch(setModal(true,<AddTeamForm/>))}>
        <VscAdd style={{ color:"white" }}/>
      </AddTeamButton>
    </TeamsContainer>
  );
};

export default React.memo(TeamList);
