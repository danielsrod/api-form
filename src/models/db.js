const oracledb = require('oracledb');
const dotenv = require('dotenv');

dotenv.config();

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const connection = await oracledb.getConnection({
    user: "tasy",
    password: "aloisk",
    connectionString: "dbteste.sameldm.com",
});

module.exports = connection;