const oracledb = require('oracledb');

require('dotenv-flow').config();

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
};

async function getConn() {
    try {
        oracledb.queueTimeout = 10000;
        await oracledb.createPool(connConfig, err => {
            if (!err)
                console.log(`Pool de conn aberto - ${process.env.TESTE_DB}`);
            else {
                console.log(err,'get conn', 'erro ao conectar');
            }
        })
        return oracledb
    } catch(err) {
        console.log(err, 'getConn', 'Erro ao conectar');
        return undefined;
    }
};

module.exports = getConn();