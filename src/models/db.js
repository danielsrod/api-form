const oracledb = require('oracledb');
const dotenv = require('dotenv');

const {
    TESTE_USER,
    TESTE_SERVER,
    TESTE_PW,
    TESTE_DB,
 } = process.env;

dotenv.config();

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const connConfig = {
    user: TESTE_USER,
    password: TESTE_PW,
    connectionString: `${TESTE_SERVER}/${TESTE_DB}`,
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