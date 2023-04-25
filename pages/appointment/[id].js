import { useEffect,useState } from 'react';
import dynamic from 'next/dynamic';

const VideoCallComponent = dynamic(() => import('../../components/VideoCallComponent'), {
  ssr: false
});
export default function Appointment({ appointment }) {
    let [props,setProps] = useState(null);
    useEffect(() =>{
        if(appointment[0].length === 0){
            console.log("No appointment found")
            window.location.href = "/"
        }
        
        const token = localStorage.getItem("token");
        if(!token){
            window.location.href = "/";
        }

        let queryData = appointment[0][0];
        let d = new Date(queryData.appointment_date );
        queryData.appointment_date = d;
        const tokenExtractor = async() =>{
            let tokenInfo = await fetch(`/api/validateToken`,{
                method:"POST",
                body:JSON.stringify({
                    token:token
                }),
                headers:{
                    "Content-type": "application/json",
                }
            });
            let result = await tokenInfo.json();
            return result;
        }
        tokenExtractor().then((result) =>{
            if(result.type === "doctor" && result.id != queryData.doctor_id){
                window.location.href = "/";
            }
            if(result.type === "patient" && result.id != queryData.patient_id){
                window.location.href = "/"
            }
            setProps(queryData);
        })

    })
  return (
    <div>

            {props && <VideoCallComponent  appointment_details={{...props}}/>}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(`http://localhost:3000/api/getAppointment?id=${id}`);
  const appointment = await res.json();
  return {
    props: {
      appointment,
    },
  };
}
