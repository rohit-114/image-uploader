import React, { useState, useEffect } from "react";
import "./Uploaded.css";

const Uploaded = ({ name }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(`${process.env.PUBLIC_URL}/${name}`);
  }, [name]);

  return (
    <div className="uploaded">
      <span className="material-icons-round tick">check_circle</span>
      <h2 className="heading">Uploaded Successfully!</h2>
      <div className="uploaded-image">
        <img src={`images/${name}`} alt="" />
      </div>
      <div className="input-area">
        <input value={url} type="text" readOnly />
        <button onClick={() => navigator.clipboard.writeText(url)}>
          Copy Link
        </button>
      </div>
    </div>
  );
};

export default Uploaded;
