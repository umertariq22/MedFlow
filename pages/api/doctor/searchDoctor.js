import ExecuteQuery from "@/scripts/db"

export default async function handler(req, res){
    if (req.method == "POST") {
        
        let query = `SELECT * FROM Doctor 
                     WHERE CONCAT(fname, ' ', lname) LIKE '%${req.body.search}%';`;
        let output = ExecuteQuery(query);

        output.then(function(result){
           res.json(result); 
        });
        return;
    }
   let query = `SELECT * FROM Doctor 
                     WHERE doctor_id = ${req.query.id};`;
   let output = await ExecuteQuery(query);
   res.json(output);
   return;
}