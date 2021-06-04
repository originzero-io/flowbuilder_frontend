import {
    SetVariablesIcon,
    NotificationIcon,
    CombineIcon,
    SplitIcon,
    CalculateIcon,
    ExcelReadIcon,
} from "../../components/FlowEditor/Nodes/global/Icons";
import * as types from "../../components/FlowEditor/Nodes/constant/nodeTypes";

export const loadIconsToNodeList = (type) => {
    if (type === types.SET_VARIABLES ) {
        return <SetVariablesIcon/>
    }
    if (type === types.NOTIFICATION ) {
        return <NotificationIcon/>
    }
    if (type === types.COMBINE ) {
        return <CombineIcon/>
    }
    if (type === types.SPLIT ) {
        return <SplitIcon/>
    }
    if (type === types.CALCULATE ) {
        return <CalculateIcon/>
    }
    if (type === types.EXCEL_READ ) {
        return <ExcelReadIcon/>
    }
}