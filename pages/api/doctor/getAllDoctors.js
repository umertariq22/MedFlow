import ExecuteQuery from "@/scripts/db";
export default async function handler(req, res) {
    try{
        let query = `SELECT TOP (100) doctor_id,first_name,last_name,specialization,description,degree,fees,experience FROM Doctor`;
        let result = await ExecuteQuery(query);
        if(result[0].length == 0){
            res.json([]);
        }
        res.json(result);
    }catch(err){
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}   