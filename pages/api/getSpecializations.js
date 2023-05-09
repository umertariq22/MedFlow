import ExecuteQuery from "@/scripts/db";
export default async function getSpecializations(req, res) {
    let query = "SELECT * FROM Specialization";
    let result = await ExecuteQuery(query);
    res.status(200).json(result);
}