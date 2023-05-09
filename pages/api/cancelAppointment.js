import ExecuteQuery from "@/scripts/db";

export default async function handler(req, res) {
    let id = req.body.id;
    let query = `UPDATE Appointment SET status = 'Cancelled' WHERE appointment_id = ${id}`;
    let result = await ExecuteQuery(query);
    res.json(result);
}