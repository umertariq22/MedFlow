import ExecuteQuery from "@/scripts/db";

export default async function handler(req, res) {
  try {
    const id = req.body.id;
    const query = `SELECT COUNT(*) AS count FROM Timings WHERE doctor_id = ${id};`;
    const result = await ExecuteQuery(query);
    if (result[0][0].count == 0) {
      res.json({ status: false });
    } else {
      res.json({ status: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
