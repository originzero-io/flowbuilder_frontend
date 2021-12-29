import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Input, FormGroup, Label, Button } from "reactstrap";
import { Collapse } from "antd";
import styled from "styled-components";
import { assignPermissionToMember } from "../../../../store/reducers/userReducer";
import { useDispatch } from "react-redux";
import useWorkspace from "../../../../utils/useWorkspace";
import Avatar from "../../../global/Avatar";
import { setModal } from "../../../../store/reducers/componentReducer";
import { openNotification } from "../../../../app-global/dom/notification";
import useFlow from "../../../../utils/useFlow";
const { Panel } = Collapse;
const Header = styled.div`
  margin-bottom: 5px;
  font-size: 2vmin;
  text-align: center;
`;
const Title = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 1.2vmin;
`;
export default function PermissionForm({ member }) {
  const dispatch = useDispatch();
  const { activeWorkspace } = useWorkspace();
  const flows = useFlow();
  const memberPermissionsThisWorkspace = member.workspaces.find(
    (workspace) => workspace._id === activeWorkspace._id
  )?.permissions;
  const [permissions, setPermissions] = useState({
    CAN_CREATE_PROJECT: false,
    CAN_EDIT_PROJECT: false,
    CAN_DELETE_PROJECT: false,
    CAN_CREATE_FLOW: false,
    CAN_EDIT_FLOW: false,
    CAN_DELETE_FLOW: false,
    CAN_CREATE_DEVICE: false,
    CAN_EDIT_DEVICE: false,
    CAN_DELETE_DEVICE: false,
    CAN_CREATE_USER: false,
    CAN_EDIT_USER: false,
    CAN_DELETE_USER: false,
  });
  useEffect(() => {
    setPermissions({ ...permissions, ...memberPermissionsThisWorkspace });
  }, []);
  const onChangeHandle = (e) => {
    setPermissions({ ...permissions, [e.target.name]: e.target.checked });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    try {
      dispatch(assignPermissionToMember(member, activeWorkspace, permissions));
      dispatch(setModal(false));
      openNotification(
        "",
        "Permissions assigned to user for this workspace",
        "success"
      );
    } catch (error) {
      openNotification("", error.message, "error");
    }
  };

  return (
    <div style={{width:'80vw'}}>
      <Header>
        <Avatar avatar={member.avatar} />
      </Header>
      <Header>{member.username}</Header>

      <Form onSubmit={onSubmitHandle}>
        <div>
          <Title>Project</Title>
          <FormGroup check inline>
            <Input
              name="CAN_CREATE_PROJECT"
              type="checkbox"
              onChange={onChangeHandle}
              style={{ width: "20px", height: "20px" }}
              defaultChecked={
                memberPermissionsThisWorkspace?.CAN_CREATE_PROJECT
              }
            />
            <Label check>Can create</Label>
          </FormGroup>
          <FormGroup check inline>
            <Input
              name="CAN_EDIT_PROJECT"
              type="checkbox"
              onChange={onChangeHandle}
              style={{ width: "20px", height: "20px" }}
              defaultChecked={memberPermissionsThisWorkspace?.CAN_EDIT_PROJECT}
            />
            <Label check>Can edit</Label>
          </FormGroup>
          <FormGroup check inline>
            <Input
              name="CAN_DELETE_PROJECT"
              type="checkbox"
              onChange={onChangeHandle}
              style={{ width: "20px", height: "20px" }}
              defaultChecked={
                memberPermissionsThisWorkspace?.CAN_DELETE_PROJECT
              }
            />
            <Label check>Can delete</Label>
          </FormGroup>
        </div>
        <div>
          <Title>Flow</Title>
          {flows.map((flow) => {
            return (
              <div key={flow._id}>
                <Collapse>
                  <Panel header={flow.config.name} key={flow._id}>
                    <FormGroup check inline>
                      <Input
                        name="CAN_CREATE_FLOW"
                        type="checkbox"
                        onChange={onChangeHandle}
                        style={{ width: "20px", height: "20px" }}
                        defaultChecked={
                          memberPermissionsThisWorkspace?.CAN_CREATE_FLOW
                        }
                      />
                      <Label check>Can create</Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        name="CAN_EDIT_FLOW"
                        type="checkbox"
                        onChange={onChangeHandle}
                        style={{ width: "20px", height: "20px" }}
                        defaultChecked={
                          memberPermissionsThisWorkspace?.CAN_EDIT_FLOW
                        }
                      />
                      <Label check>Can edit</Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        name="CAN_DELETE_FLOW"
                        type="checkbox"
                        onChange={onChangeHandle}
                        style={{ width: "20px", height: "20px" }}
                        defaultChecked={
                          memberPermissionsThisWorkspace?.CAN_DELETE_FLOW
                        }
                      />
                      <Label check>Can delete</Label>
                    </FormGroup>
                  </Panel>
                </Collapse>
              </div>
            );
          })}
        </div>
        <div>
          <Title>Device</Title>
          <FormGroup check inline>
            <Input
              name="CAN_CREATE_DEVICE"
              type="checkbox"
              onChange={onChangeHandle}
              style={{ width: "20px", height: "20px" }}
              defaultChecked={memberPermissionsThisWorkspace?.CAN_CREATE_DEVICE}
            />
            <Label check>Can create</Label>
          </FormGroup>
          <FormGroup check inline>
            <Input
              name="CAN_EDIT_DEVICE"
              type="checkbox"
              onChange={onChangeHandle}
              style={{ width: "20px", height: "20px" }}
              defaultChecked={memberPermissionsThisWorkspace?.CAN_EDIT_DEVICE}
            />
            <Label check>Can edit</Label>
          </FormGroup>
          <FormGroup check inline>
            <Input
              name="CAN_DELETE_DEVICE"
              type="checkbox"
              onChange={onChangeHandle}
              style={{ width: "20px", height: "20px" }}
              defaultChecked={memberPermissionsThisWorkspace?.CAN_DELETE_DEVICE}
            />
            <Label check>Can delete</Label>
          </FormGroup>
        </div>
        <div>
          <Title>User</Title>
          <FormGroup check inline>
            <Input
              name="CAN_CREATE_USER"
              type="checkbox"
              onChange={onChangeHandle}
              style={{ width: "20px", height: "20px" }}
              defaultChecked={memberPermissionsThisWorkspace?.CAN_CREATE_USER}
            />
            <Label check>Can create</Label>
          </FormGroup>
          <FormGroup check inline>
            <Input
              name="CAN_EDIT_USER"
              type="checkbox"
              onChange={onChangeHandle}
              style={{ width: "20px", height: "20px" }}
              defaultChecked={memberPermissionsThisWorkspace?.CAN_EDIT_USER}
            />
            <Label check>Can edit</Label>
          </FormGroup>
          <FormGroup check inline>
            <Input
              name="CAN_DELETE_USER"
              type="checkbox"
              onChange={onChangeHandle}
              style={{ width: "20px", height: "20px" }}
              defaultChecked={memberPermissionsThisWorkspace?.CAN_DELETE_USER}
            />
            <Label check>Can delete</Label>
          </FormGroup>
        </div>
        <Button type="submit" color="primary">
          Save
        </Button>
      </Form>
    </div>
  );
}
PermissionForm.propTypes = {
  member: PropTypes.object.isRequired,
};
