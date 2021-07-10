import * as React from "react";

const PageHeading = ({ title, align }) => {
  return (
    <div>
      <h1
        className={`text-4xl py-4 pt-24 mb-6 text-${
          align ? align : "center"
        } font-semibold`}
      >
        {title}
      </h1>
    </div>
  );
};

export default PageHeading;
