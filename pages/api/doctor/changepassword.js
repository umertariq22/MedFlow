const bcrypt = require("bcryptjs");
import ExecuteQuery from "@/scripts/db"

export default async function handler(req, res){
    if(req.method == "POST"){
        
        let query = `SELECT email, password FROM Doctor WHERE email = '${req.body.email}'`;
        let output = ExecuteQuery(query);

        output.then(async function(result){
            if(result.length == 0){
                res.json(false);
            }

            let prev_password = await bcrypt.compare(req.body.newpassword, result[0].password);
                
            if(prev_password){
                res.json(false);
            }

            req.body.newpassword = await bcrypt.hash(req.body.newpassword, 10);
            query = `UPDATE Doctor SET password = '${req.body.newpassword}' WHERE email = '${req.body.email}'`;
            ExecuteQuery(query);
            res.json(true);
        });
    }
}
