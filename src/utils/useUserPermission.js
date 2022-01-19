import { useSelector } from "react-redux";
export default function useUserPermission(type) {
  const permissions = useSelector((state) => state.userPermissions);
  if (type) {
    const result = {...permissions[type],EVERYTHING:permissions["CAN_DO_EVERYTHING"]};
    return result;
  } else {
    const permissions = useSelector((state) => state.userPermissions);
    return permissions;
  }
}
