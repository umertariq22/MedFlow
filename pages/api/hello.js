import ExcuteQuery from "../db";
export default async function hello(req,res){
    try{
        let d = await ExcuteQuery("SELECT * FROM Doctor");
        res.send(JSON.stringify(d));
    }catch(error){
        console.log(error)
        res.send("Fuck you");
    }
}