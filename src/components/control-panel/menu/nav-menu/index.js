import React,{useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActivePanel, setActiveProject } from "../../../../store/actions/controlPanelActions";
import { Container } from "./style";
import AddProjectForm from "../../side-panels/projects/AddProjectForm";
import AppModal from '../../../global/AppModal'
import { Menu } from "antd";
import {
  AppstoreOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

const NavigationMenu = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const {projects} = useSelector((state) => state.controlPanelReducer);
  const panelActiveHandler = (e) => {
    const data = e.item.props.data;
    console.log("panel-name:", data);
    console.log("e", e);
    dispatch(setActivePanel(data));
    if (data === "Projects") {
      dispatch(setActiveProject(e.item.props.project));
    }
  };
  const showModalHandle = (e) => {
    setShowModal(true);
  };
  const hideModalHandle = (e) => {
    setShowModal(false);
  };
  return (
    <Container>
      <Menu
        mode="inline"
        theme="light"
        style={{border:'none',fontSize:"16px"}}
      >
        <Menu.Item key="teams" data="Teams" icon={<ContainerOutlined />} onClick={panelActiveHandler}>
          Teams
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="Projects" style={{ position: 'relative' }}>
          <div style={{position:'absolute',top:'0px',right:'0px'}}>Add new</div>
          {
            projects.map(project => {
              return(
                <Menu.Item key={project.id} data="Projects" project={project} onClick={panelActiveHandler}>{project.name}</Menu.Item>
              )
            })
          }
          {/* <Menu.Item key="add-new" onClick={showModalHandle}>Add New</Menu.Item> */}
        </SubMenu>
        <Menu.Item key="notes" data="Notes" icon={<ContainerOutlined />} onClick={panelActiveHandler} >
          Notes
        </Menu.Item>
        <Menu.Item key="learn" data="Learn" icon={<ContainerOutlined />} onClick={panelActiveHandler}>
          Learn
        </Menu.Item>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Settings">
          <Menu.Item key="settings" data="Settings" onClick={panelActiveHandler}>User Settings</Menu.Item>
          <Menu.Item key="8" data="Settings" onClick={panelActiveHandler}>Preferences</Menu.Item>
        </SubMenu>
      </Menu>


      <AppModal
        visible={showModal}
        onOk={hideModalHandle}
        onCancel={hideModalHandle}
      >
        <AddProjectForm closeModal={hideModalHandle}/>
      </AppModal>
    </Container>
  );
};

export default NavigationMenu;
