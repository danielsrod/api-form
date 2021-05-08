const oracledb = require('oracledb');
const dotenv = require('dotenv');

dotenv.config();

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

/* 
const connextionConfig = {
    user: process.env.APPV2_USER,
    password: process.env.APPV2_PASSWD,
    connectionString: `${process.env.APPV2_SERVER}/${process.env.APPV2_DB}`,
    poolMin: 5,
    poolMax: 30,
    poolPingInterval: 10,
    autoCommit: true,
    poolTimeout: 360,
    queueTimeout: 2020000
}
//oracledb.queueTimeout = 2020000;
const poolPromiseOracle = oracledb.createPool(connextionConfig)
  .then(function (pool){
    console.log('Connected to Oracle')
    return pool
  })
  .catch(function (err){
    console.log('Oracle connection', err)
    return 
  })

  



module.exports = {
  poolPromiseOracle
}
*/

module.exports = connection;