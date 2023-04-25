import ExecuteQuery from '../db';
const jwt = require('jsonwebtoken');

export default async function RetrieveUserInfo(req, res) {
    if (req.method == "POST") {
        const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
        const email = decoded.email;
        let query = `SELECT Fname,
                        Lname,
                        Address,
                        PhoneNum,
                        email,
                        blood_type FROM Patient WHERE email = '${email}'`;
    
        let output = ExecuteQuery(query);
        output.then(async function(result){
            res.json(result);
        });
    }

}
