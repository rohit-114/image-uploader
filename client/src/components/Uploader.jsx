import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Uploaded from "./Uploaded";
import Loader from "./Loader";
import ErrorBanner from "./ErrorBanner";
import axios from "axios";
import "./Uploader.css";

const Uploader = () => {
  const [file, setFile] = useState();
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState({ msg: "", state: false });
  const [imgName, setImgName] = useState("");
  const imageInput = useRef();

  function handleChange(e) {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }

  useEffect(() => {
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("image", file);
    const postImage = async () => {
      try {
        const res = await axios.post("http://localhost:5000/single", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setImgName(res.data.filename);
        setUploaded(true);
      } catch (err) {
        setError({ msg: `${err.response.data.msg}`, state: true });
      } finally {
        setTimeout(() => {
          setUploading(false);
        }, 1000);
      }
    };

    postImage();
  }, [file]);

  return (
    <div className="container">
      {uploading ? (
        <Loader />
      ) : (
        <>
          {error.state &&
            ReactDOM.createPortal(
              <ErrorBanner msg={error.msg} setError={setError} />,
              document.getElementById("error")
            )}
          {uploaded ? (
            <Uploaded name={imgName} />
          ) : (
            <div className="uploader">
              <h2 className="title">Upload your image</h2>
              <p className="sub-title">File should be jpg, jpeg</p>
              <div
                className="dropzone"
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setFile(e.dataTransfer.files[0]);
                }}
              >
                <img src={"images/image.svg"} alt="" />
                <p className="light-grey">Drag & Drop your image here</p>
              </div>
              <p className="light-grey">Or</p>
              <input
                name="image"
                type="file"
                accept="image/jpeg, image/jpg"
                ref={imageInput}
                multiple={false}
                style={{ display: "none" }}
                onChange={handleChange}
              />
              <button onClick={() => imageInput.current.click()}>
                Choose File
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Uploader;
