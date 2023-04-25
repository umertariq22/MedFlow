import ExecuteQuery from '../../db'

export default async function handler(req, res) {

    if(req.method == "POST"){

        console.log(req.Fname);

        let query = `INSERT INTO BloodBank VALUES (
            '${req.body.FName + ' ' + req.body.LName}',
            '${req.body.Address}',
            '${req.body.PhoneNum}',
            '${req.body.email}',
            '${req.body.blood_type}');`;
        ExecuteQuery(query);

        res.json(true);
    }
}
