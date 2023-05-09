import WithPatientAuth from "@/components/withPatientAuth";
import { useEffect } from "react";

const Patient = ({tokenDetails,setActive}) => {
  useEffect(() =>{
    setActive("dashboard");
  });
  return (
    <>
      <h1 className="display-4"> Hwllo</h1>
    </>
  );
};

export default WithPatientAuth(Patient);
