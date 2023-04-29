import { useEffect, useState } from "react";
export default function MainPage(){
    const [doctors, setDoctors] = useState([]);
    const fetchDoctors = async () => {
        const res = await fetch('/api/doctor/getAllDoctors');
        const data = await res.json();
        setDoctors(data)
    }
    useEffect(() => {
        fetchDoctors();
    }, []);
    return(
        <>
            <h1>Medflow</h1>
            {doctors.length != 0 && doctors.map((doctor) => {
                return(
                    <div key={doctor.doctor_id}>
                        <h2>{doctor.first_name} {doctor.last_name}</h2>
                        <a href={`/doctor/${doctor.doctor_id}`}>View Doctor</a>
                    </div>
                )
            })}
        </>
    );
}