const { create } = require('domain')
const oracledb = require('oracledb')
const config = require('./config')

async function init () {
  try {
    await oracledb.createPool({
      user: 'almat',
      password: 'almat789456123', // mypw contains the hr schema password
      connectString: '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=xepdb1)))'
    })

    console.log('Connection pool started')
    // config.createQuery1(query)
  } catch (err) {
    console.error('init() error: ' + err.message)
  }
}

async function closePoolAndExit () {
  console.log('\nTerminating')
  try {
    await oracledb.getPool().close(10)
    console.log('Pool closed')
    process.exit(0)
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

process
  .once('SIGTERM', closePoolAndExit)
  .once('SIGINT', closePoolAndExit)

module.exports.init = init
