const oracledb = require('oracledb');

const connection = await oracledb.getConnection({
    user: "tasy-teste",
    password: "aloisk",
    connectionString: "dbteste.sameldm.com",
});

module.exports = connection;