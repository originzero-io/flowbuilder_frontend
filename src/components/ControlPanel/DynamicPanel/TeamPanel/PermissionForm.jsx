import React, { useState } from 'react'
import PropTypes from "prop-types";
import { Form, Input, FormGroup, InputGroupText, Label, Button } from "reactstrap";
import styled from "styled-components";
import SwitchButton from '../../../global/Button/SwitchButton';

const FieldSet = styled.fieldset`
    //background-color: red;
    border: 1px solid;

`
const Legend = styled.legend`
    margin: 10px;
    width: 110px;
    padding: 10px;
    font-size: 1.8vmin;
`
export default function PermissionForm({ member }) {
    const [permission, setPermission] = useState({
        workspace: {
            canCreate: false,
            canEdit:false
        }
    })
    const onChangeHandle = (e) => {
        console.log("value",e.target.value);
        console.log("name",e.target.name);
        console.log("e.target",e.target);
        console.log("e.target.checked",e.target.checked);
        setPermission({
            ...permission,
            workspace: {
                ...permission.workspace,
                [e.target.name]: e.target.checked
            }
        })
    };
    const onSubmitHandle = (e) => {
        e.preventDefault();
    };
    return (
        <Form onSubmit={onSubmitHandle}>
            <FormGroup check inline>
                <Input name="canCreate" type="checkbox" onChange={onChangeHandle} style={{ width:'20px',height:'20px'}}/>
                <Label check>Can create</Label>
            </FormGroup>
            <FormGroup check inline>
                <Input name="canEdit" type="checkbox" onChange={onChangeHandle} style={{ width:'20px',height:'20px' }}/>
                <Label check>Can edit</Label>
            </FormGroup>
            {/* <SwitchButton/> */}
            <Button type="submit">Save</Button>
        </Form>
    )
}
PermissionForm.propTypes = {
    member: PropTypes.object.isRequired,
};