import ExecuteQuery from "@/scripts/db";
export default async function handler(req, res) {
    try{
        let query1 = `DELETE FROM Timings WHERE doctor_id = ${req.body.id}`;
        let result1 = await ExecuteQuery(query1);
        let query2 = `INSERT INTO Timings(doctor_id,timing_day,start_time,end_time) VALUES`;
        let timings = req.body.timings;
        timings.forEach((timing) => {
            query2 += `(${req.body.id},'${timing.timing_day}','${timing.start_time}','${timing.end_time}'),`
        });
        query2 = query2.slice(0,-1);
        let result2 = await ExecuteQuery(query2);
        res.json({status:"success"});
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}