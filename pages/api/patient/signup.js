import ExecuteQuery from "@/scripts/db"

export default async function handler(req, res){
    if(req.method == "POST"){
        let query = `SELECT email FROM Patient WHERE email = '${req.body.email}'`;
        let output = ExecuteQuery(query);
        
        output.then(function(result) {

            if(result[0].length == 0){
                query = `INSERT INTO Patient(first_name,last_name,date_of_birth,gender,address,phone_number,email,password,blood_type) VALUES(
                    '${req.body.fname}',
                    '${req.body.lname}',
                    '${req.body.DOB}',
                    '${req.body.gender}',
                    '${req.body.address}',
                    '${req.body.phone}',
                    '${req.body.email}',
                    '${req.body.password}',
                    '${req.body.bloodtype}');`;
                
                ExecuteQuery(query);
                res.json(true);

            }else{
                res.json(false);
            }
        });
    }
}