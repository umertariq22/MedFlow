import ExecuteQuery from "@/scripts/db";

export default async function handler(req, res) {
    try{
        if(req.method != "POST") {
        res.status(400).json({message: "Invalid method"});
        return;
    }
    const {doctor_id,patient_id,appointment_date} = req.body;
    const query = `INSERT INTO Appointment (doctor_id,patient_id,appointment_date) VALUES (${doctor_id},${patient_id},'${appointment_date}')`;
    console.log(query)
    const result = await ExecuteQuery(query);
    res.status(200).json({message: "Appointment booked"});
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}