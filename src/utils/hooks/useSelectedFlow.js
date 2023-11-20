import { useSelector } from "react-redux";

export default function useSelectedFlow() {
  const selectedFlow = useSelector((state) => state.selectedFlow);
  return selectedFlow;
}
