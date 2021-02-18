import { useContext } from "react";
import { setError } from "../context/actions";
import { ApplicationContext } from "../context/ApplicationContext";

const useErrors = () => {
  const [state, dispatch] = useContext(ApplicationContext);

  const setErrors = (message) => {
    dispatch(setError(message));
  };

  const hasErrors = () => !!state.errors.length;

  return {
    messages: state.errors,
    setErrors,
    hasErrors,
  };
};

export default useErrors;
