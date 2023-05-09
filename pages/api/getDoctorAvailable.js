import ExecuteQuery from "@/scripts/db";
const moment = require('moment');
export default async function handler(req,res){
    let doctor_id = req.body.doctor_id;
    let date = req.body.date;
    let dateMoment = moment(date,"YYYY-MM-DD");
    let day = dateMoment.format("DD");
    let month = dateMoment.format("MM");
    let year = dateMoment.format("YYYY");
    let query = `SELECT FORMAT(appointment_date,N'HH:mm') AS Time FROM Appointment WHERE doctor_id = ${doctor_id} AND DAY(appointment_date) = ${day} AND MONTH(appointment_date) = ${month} AND YEAR(appointment_date) = ${year};`;
    let result = await ExecuteQuery(query);
    res.json(result);
}