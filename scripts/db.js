const sql = require("mssql/msnodesqlv8")
// connection configs
const config = {
    server: "DESKTOP-5K1K6FI\\MEDFLOW", // TODO: UPDATE YOUR SERVER NAME
    database: process.env.database,
    driver: "msnodesqlv8",
    user:process.env.user,
    password:process.env.password,
    options: {
        trustedconnection: true,
        trustServerCertificate: true
    },
}

export default async function ExecuteQuery(query) {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query(query);
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}