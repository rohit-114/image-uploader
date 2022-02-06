import React, { useEffect } from "react";
import "./ErrorBanner.css";

const ErrorBanner = ({ msg, setError }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setError({ msg: "", state: false });
    }, 6500);

    return () => {
      clearTimeout(timer);
    };
  }, [setError]);

  return (
    <div className="banner">
      <span className="material-icons-round info">info</span>
      <p>{msg}</p>
    </div>
  );
};

export default ErrorBanner;
