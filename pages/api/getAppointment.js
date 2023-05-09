import ExecuteQuery from "@/scripts/db";

export default async function handler(req, res) {
    const { id } = req.query;
    const query = `SELECT * FROM AppointmentDetails WHERE appointment_id = ${id}`;
    const appointment = await ExecuteQuery(query);
    res.status(200).json(appointment);
}