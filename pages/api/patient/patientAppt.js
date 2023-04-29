import ExecuteQuery from "@/scripts/db";

export default async function handler(req, res) {
    let id = req.body.id;
    let query = `SELECT * FROM Appointment WHERE patient_id = ${id}`;
    let result = await ExecuteQuery(query);
    res.json(result);
    return;
}