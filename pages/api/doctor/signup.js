import ExecuteQuery from "@/scripts/db"

export default async function handler(req, res){
    if(req.method == "POST"){
        let query = `SELECT email FROM Doctor WHERE email = '${req.body.email}'`;
        let result = await ExecuteQuery(query);
        if(result[0].length == 0){
            query = `INSERT INTO Doctor(first_name,last_name,specialization,phone_number,email,address,password) VALUES(
                '${req.body.Fname}',
                '${req.body.Lname}',
                '${req.body.spec}',
                '${req.body.phone_num}',
                '${req.body.email}',
                '${req.body.address}',
                '${req.body.password}');`;
            
            ExecuteQuery(query);
            res.send(true);
        }else{
            res.send(false);
        }
        return;
    }
}