export default async function handler(req, res) {
    console.log(req.body);
    console.log("caleed")
    res.send("Done")
}