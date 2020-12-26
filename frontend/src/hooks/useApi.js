import { useState } from "react";

const useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    let response;
    try {
      setLoading(true);
      response = await apiFunc(...args);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setErrors(true);
      setLoading(false);
      response = error.response;
    }

    return response;
  };

  return { data, errors, loading, request };
};

export default useApi;
