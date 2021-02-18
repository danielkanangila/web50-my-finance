import React, { useState } from "react";
import Banner from "../../components/common/Banner";
import useErrors from "../../hooks/useErrors";

const Error = ({ messages, visibility }) => {
  return (
    <Banner type="danger" visibility={visibility}>
      <ul>
        {messages.map((message) => (
          <li>{message}</li>
        ))}
      </ul>
    </Banner>
  );
};

export default function RenderMessage() {
  const [visibility, setVisibility] = useState(initialState);
  const errors = useErrors();

  useEffect(() => {
    setVisibility(!visibility);
    return () => {};
  }, [errors.messages]);

  return <Error messages={errors.messages} visibility={visibility} />;
}
