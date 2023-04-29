import ExecuteQuery from "@/scripts/db";

export default async function handler(req, res) {
  try {
    let id = req.body.id;
    let query = `SELECT * FROM Timings WHERE doctor_id = ${id}`;
    let result = await ExecuteQuery(query);

    if (result[0].length == 0) {
      res.json([]);
      return;
    }

    result[0].forEach((timing) => {
      timing.start_time = new Date(timing.start_time).toISOString().slice(11, 16);
      timing.end_time = new Date(timing.end_time).toISOString().slice(11, 16);
    });

    delete result[0][0].doctor_id;
    res.json(result[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
