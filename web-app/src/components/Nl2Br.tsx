import * as React from "react";

const Nl2Br: React.FC<{ text: string }> = ({ text }) => {
  const elements: Array<React.ReactNode> = [];

  let parts = text.split("\n");
  parts.forEach((part: string, index: number): void => {
    elements.push(<React.Fragment key={index}>{part}</React.Fragment>);

    if (index < parts.length - 1) {
      elements.push(<br key={`${index}-nl`} />);
    }
  });

  return <>{elements}</>;
};

export default Nl2Br;
