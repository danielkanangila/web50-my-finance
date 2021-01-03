export const handleFormSubmission = async (
  request,
  formHandler,
  onSuccess,
  setUser,
  onError
) => {
  const { setErrors, setStatus, resetForm } = formHandler;

  // set form status to loading to true
  setStatus({ loading: true });
  const response = await request();
  // handle response error if any
  if (!response.ok) {
    console.log(response);
    // call error handler if defined
    if (onError) return onError(response.data, setErrors, setStatus);
    // set the errors to the form errors
    // parse form error
    const errors =
      "data" in response
        ? response.data
        : { details: "An unknown error occurred." };
    setErrors(errors);
    // set form loading status to false
    setStatus({ loading: false });
    return;
  }
  // handle response success
  // set user to the local storage
  setUser(response.data);
  // set form loading status to false
  setStatus({ loading: false });
  // reset the form
  resetForm();
  // call the callback function
  onSuccess(response.data);
};

// http request handler function
export const request = async (apiFunc, data) => {
  let response = {};
  try {
    response = await apiFunc(data);
    // set ok to false if request contain error
    if (response.statusText !== "ok") response.ok = false;
    // set ok to true if request success
    response.ok = true;
  } catch (error) {
    console.error(error);
    // set response
    response.data = {
      details: error.message,
      ok: false,
    };
  }

  return response;
};
