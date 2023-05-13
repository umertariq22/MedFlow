import ExecuteQuery from "@/scripts/db";

export default async (req, res) => {
    const {id} = req.query;
    const query = `SELECT * FROM Doctor WHERE specialization = ${id}`;
    const result = await ExecuteQuery(query);
    res.status(200).json(result);
}