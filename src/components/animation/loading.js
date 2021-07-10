import * as React from "react";

const Spinner = () => {
  return (
    // <div className="spinner-box">
    //   <div className="spinner spinner--1"></div>
    // </div>
    <div className="text-center">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
