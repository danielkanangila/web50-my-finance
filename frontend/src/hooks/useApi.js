import { useState } from "react";

const useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);

  // http request handler function
  const request = async (...args) => {
    let response = {};
    try {
      setLoading(true);
      response = await apiFunc(...args);
      // set ok to false if request contain error
      if (response.statusText !== "ok") response.ok = false;
      // set ok to true if request success
      response.ok = true;
      // set the response data to state
      setData(response.data);
      // disable loading
      setLoading(false);
    } catch (error) {
      console.error(error);
      // set error to true
      setErrors(true);
      // disable loading
      setLoading(false);
      // set response
      response.data = {
        details: error.message,
        ok: false,
      };
    }

    return response;
  };

  return { data, errors, loading, request };
};

export default useApi;
