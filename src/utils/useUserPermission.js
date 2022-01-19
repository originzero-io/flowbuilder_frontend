import { useSelector } from "react-redux";
export default function useUserPermission(type) {
  if (type) {
    const permissions = useSelector((state) => state.userPermissions)[type];
    return permissions;
  } else {
    const permissions = useSelector((state) => state.userPermissions);
    return permissions;
  }
}
