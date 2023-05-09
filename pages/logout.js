import withAuth from "@/components/withAuth";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";

function Logout({ tokenDetails }) {
    const [loggedOut,setLoggedOut] = useState(false);
    useEffect(() =>{
        localStorage.removeItem("token");
        window.location.href = "/";
        useState(true);
    })
  return <>
    {!loggedOut && <Loader />}
  </>;
}

export default withAuth(Logout)