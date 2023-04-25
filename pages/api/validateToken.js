let jwt = require('jsonwebtoken');
export default function handler(req,res){
    if(req.method == "POST"){
        let token = req.body.token;
        if(!token){
            res.json(false);
        }else{
            try{
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                res.json(decoded);
            }catch(err){
                res.json(false);
            }
        }
    }
}