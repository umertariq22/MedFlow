import ExecuteQuery from '../db';

export default async function handler(req, res) {
    let query = `SELECT Fname,
                    Lname,
                    Address,
                    PhoneNum,
                    email,
                    specialization,
                    description FROM Doctor WHERE email = '${req.body.email}'`;
    let output = ExecuteQuery(query);
    output.then(async function(result){
        res.json(result);
    });

}
