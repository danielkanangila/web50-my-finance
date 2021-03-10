import React, { useEffect, useState } from "react";
import Banner from "../../components/common/Banner";
import useErrors from "../../hooks/useErrors";

const Error = ({ messages, visibility }) => {
  return (
    <Banner type="danger" visibility={visibility}>
      <ul className="list-outside md:list-inside">
        {messages.map((message, index) => (
          <li key={index} className="text-white text-xs">
            {message}
          </li>
        ))}
      </ul>
    </Banner>
  );
};

export default function RenderErrors() {
  const [visibility, setVisibility] = useState(false);
  const errors = useErrors();

  useEffect(() => {
    if (errors.hasErrors()) setVisibility(true);
    else setVisibility(false);
    return () => {};
  }, [errors]);

  return <Error messages={errors.messages} visibility={visibility} />;
}
