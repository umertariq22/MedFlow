import withDoctorAuth from "@/components/withDoctorAuth";
import { useEffect } from "react";

const DoctorDashboard = ({tokenDetails,setActive}) => {
    useEffect(() =>{
        setActive("dashboard");

    },[])
    return (<>
    </>);
}

export default withDoctorAuth(DoctorDashboard);