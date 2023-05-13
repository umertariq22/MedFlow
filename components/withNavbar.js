import { useEffect,useState } from "react";
import Loader from "./Loader";
import NavBar from "./NavBar";

export default function withNavbar(WrappedComponent) {
  const Nav = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setLoading(false);
    }, []);
    
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <div className="d-flex flex-column" style={{minHeight:"100vh"}}>
            <NavBar />
            <WrappedComponent  />
          </div>
        )}
      </>
    );
  };
    return Nav;
}
