import React, { useState, useEffect } from "react";
import "./Uploaded.css";

const Uploaded = ({ url }) => {
  // const [url, setUrl] = useState("");

  // useEffect(() => {
  //   setUrl(`https://image-uploader-backend-rho.vercel.app/${name}`);
  // }, [name]);

  return (
    <div className="uploaded">
      <span className="material-icons-round tick">check_circle</span>
      <h2 className="heading">Uploaded Successfully!</h2>
      <div className="uploaded-image">
        <img src={url} alt="" />
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
