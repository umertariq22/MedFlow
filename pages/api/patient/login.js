const bcrypt = require("bcryptjs");
import ExecuteQuery from "@/scripts/db"
const jwt = require("jsonwebtoken");

export default async function handler(req, res){
    if(req.method == "POST"){

        let query = `SELECT patient_id, email, password FROM Patient WHERE email = '${req.body.email}'`;
        let result = await ExecuteQuery(query);
        if(result[0].length == 0){
            res.json(false);
        }else{
            let check = await bcrypt.compare(req.body.password, result[0][0].password);
            if(check){
                const token = jwt.sign({email: result[0][0].email,type:"patient",id:result[0][0].patient_id}, process.env.JWT_SECRET);
                res.json({token});
            }else{
                res.json(false);
            }
        }
    }
}