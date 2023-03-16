const sql = require("mssql/msnodesqlv8")
// connection configs
const config = {
    server: "DESKTOP-5K1K6FI\\MEDFLOW", // TODO: UPDATE YOUR SERVER NAME
    database: process.env.database,
    driver: "msnodesqlv8",
    options: {
        trustedconnection: true,
        trustServerCertificate: true
    },
}

export default async function ExcuteQuery(query) {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query(query);
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}