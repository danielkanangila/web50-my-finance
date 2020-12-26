import React from "react";

const SubmitButton = ({ className, onSubmit = null, title, loading }) => {
  const handleSubmit = (e) => {
    if (onSubmit) return onSubmit(e);
    return true;
  };
  return (
    <button
      className={`btn btn-primary ${className ? className : ""}`}
      type="submit"
      disabled={loading}
      onClick={handleSubmit}
    >
      {!loading && title}
      {loading && (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      )}
    </button>
  );
};

export default SubmitButton;
