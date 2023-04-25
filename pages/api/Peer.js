import ExecuteQuery from "@/scripts/db"
export default async (req, res) => {
    if (req.method === 'POST'){
        const {peerID,peerType,id} = req.body;
        const query = `UPDATE ${peerType} SET peerID = '${peerID}' WHERE id = ${id}`;
        
        try{
            const result = await ExecuteQuery(query);
            res.status(200).json({message: "Success"});
        }catch(err){
            console.log(err);
            res.status(500).json({message: "Internal Server Error"});
        }
    }else if(req.method === 'GET'){
        const {peerType,id} = req.query;
        const query = `SELECT peerID FROM ${peerType} WHERE id = ${id}`;
        try{
            const result = await ExecuteQuery(query);
            res.status(200).json({peerID: result[0].peerID});
        }catch(err){
            console.log(err);
            res.status(500).json({message: "Internal Server Error"});
        }
    }
}
