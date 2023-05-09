import ExecuteQuery from "@/scripts/db";
export default async function handler(req, res) {

    if(req.method == "POST"){

        let query1 = `SELECT * FROM BloodDoner WHERE email = '${req.body.email}';`;
        let result = await ExecuteQuery(query1);
        if(result[0].length == 0){
            let query2 = `INSERT INTO BloodDoner VALUES (
                '${req.body.FName}',
                '${req.body.LName}',
                '${req.body.Address}',
                '${req.body.PhoneNum}',
                '${req.body.email}',
                '${req.body.blood_type}');`;
            await ExecuteQuery(query2);
        }
        res.json(true);
        return;
    }
}
