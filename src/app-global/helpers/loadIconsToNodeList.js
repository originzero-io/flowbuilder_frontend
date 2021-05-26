import {
    SetVariablesIcon,
    NotificationIcon,
    CombineIcon,
    SplitIcon,
    CalculateIcon,
    ExcelReadIcon,
} from "../../components/flow-editor/nodes/global/icons";
import * as types from "../../components/flow-editor/nodes/constant/nodeTypes";

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