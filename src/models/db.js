const oracledb = require('oracledb');
const dotenv = require('dotenv');

dotenv.config();

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const connConfig = {
    user: process.env.TESTE_USER,
    password: process.env.TESTE_PW,
    connectionString: `${process.env.TESTE_SERVER}/${process.env.TESTE_DB}`,
    poolMin: 5,
    poolMax: 30,
    poolPingInterval: 10,
    autoCommit: true,
    poolTimeout: 360,
    queueTimeout: 2020000,
}

const poolPromiseOracle = oracledb.createPool(connConfig)
    .then(function (pool) {
        console.log('Connected to Oracle');
        return pool;
    })
    .catch(function (err) {
        console.log('Oracle connection', err);
        return;
    })

module.exports = {
    poolPromiseOracle
}