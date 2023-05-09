import ExecuteQuery from '@/scripts/db';
const jwt = require('jsonwebtoken');

export default async function RetrieveUserInfo(req, res) {
    if (req.method == "POST") {
        const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
        const email = decoded.email;
        let query = `SELECT first_name,
                        last_name,
                        address,
                        phone_number,
                        email,
                        blood_type FROM Patient WHERE email = '${email}'`;
    
        let output = await ExecuteQuery(query);
        res.json(output)
    }

}
