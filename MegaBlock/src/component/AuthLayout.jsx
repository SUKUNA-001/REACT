import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Protected({ children, authntication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.sttus);

  useEffect(() => {
    //TODO: make it more easy
    // if(authStatus==true){
    //     navigate("/login")
    // }else if (authStatus ===false){
    //     navigate("/")
    // }

    if (authntication && authStatus !== authntication) {
      navigate("/login");
    } else if (!authntication && authStatus !== authntication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authntication]);

  return loader ? <h1>loading...</h1>: <>{children}</>
}
