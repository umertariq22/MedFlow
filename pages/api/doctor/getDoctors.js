import ExecuteQuery from "@/scripts/db";

export default async function handler(req, res) {
    let query = `SELECT * FROM doctor`;
    let result = await ExecuteQuery(query);
    res.status(200).json(result);    
}