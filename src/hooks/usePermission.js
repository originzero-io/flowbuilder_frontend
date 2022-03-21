import { useState, useEffect,useMemo } from 'react'
import useAuth from "./useAuth"
import useWorkspace from './useWorkspace';
export default function usePermission(permission) {
    const auth = useAuth();
    const { activeWorkspace } = useWorkspace();
    // const permissionsInThisWorkspace = useMemo(() => {
    //    return auth.workspaces.find(workspace => workspace._id === activeWorkspace._id)?.permissions 
    // },[auth])
    const permissionsInThisWorkspace = auth.workspaces.find(workspace => workspace._id === activeWorkspace._id)?.permissions 
    // console.log("permissionsInThisWorkspace:", permissionsInThisWorkspace);
    // console.log("AKIN:", permissionsInThisWorkspace?.CAN_CREATE_PROJECT);
    // const state = permissionsInThisWorkspace?.permission
    //console.log("state:", state);
    return permissionsInThisWorkspace;
}
