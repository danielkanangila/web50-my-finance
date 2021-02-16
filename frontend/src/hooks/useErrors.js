import { useContext } from "react";
import { setError } from "../context/actions";
import { ApplicationContext } from "../context/ApplicationContext";

const useErrors = () => {
  const [state, dispatch] = useContext(ApplicationContext);

  const setErrors = (message) => {
    dispatch(setError(message));
  };

  return {
    messages: state.errors,
    setErrors,
  };
};

export default useErrors;
