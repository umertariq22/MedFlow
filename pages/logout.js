import withAuth from "@/components/withAuth";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";

function Logout({ tokenDetails }) {
    useEffect(() =>{
        localStorage.removeItem("token");
        window.location.href = "/";
    })
  return <>
  </>;
}

export default withAuth(Logout)