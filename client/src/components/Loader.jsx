import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <h3>Uploading...</h3>
      <div className="outer">
        <div className="inner"></div>
      </div>
    </div>
  );
};

export default Loader;
