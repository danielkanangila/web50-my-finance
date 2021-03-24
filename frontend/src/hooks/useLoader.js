import { useContext } from "react";
import { setLoading } from "../context/actions";
import { ApplicationContext } from "../context/ApplicationContext";

const useLoader = () => {
  const [state, dispatch] = useContext(ApplicationContext);

  const setLoader = (status, message = "") =>
    dispatch(setLoading(status, message));

  return {
    ...state.loading,
    setLoader,
  };
};

export default useLoader;
