const oracledb = require('oracledb')
const pool = require('./createpool')
const encrypt = require('../crypto')

async function createQuery (query) {
  let connection
  try {
    connection = await oracledb.getConnection()
    // const password = query.body.password
    // const hash = encrypt(password)
    const sql = `INSERT INTO customer(ID, FIRSTNAME, SECONDNAME, PHONE, EMAIL, PASSWORD)
                      VALUES(CUSTOMER_ID.nextval, :FIRSTNAME, :SECONDNAME, :PHONE, :EMAIL, :PASSWORD)`
    const bind = {
      FIRSTNAME: query.body.name,
      SECONDNAME: query.body.secondname,
      PHONE: query.body.phone,
      EMAIL: query.body.email,
      PASSWORD: query.body.password
    }
    const options = {
      autoCommit: true
    }
    const result = await connection.execute(sql, bind, options)
    console.log(result)
  } catch (err) {
    console.error('createQuery error' + err)
  } if (connection) {
    try {
      await connection.close()
    } catch (err) {
      console.error(err)
    }
  }
}

async function createQuery1 (query) {
  let connection
  try {
    connection = await oracledb.getConnection()
    const sql = 'SELECT EMAIL, PASSWORD FROM CUSTOMER WHERE EMAIL = :EMAIL AND PASSWORD = :PASSWORD'
    const bind = {
      EMAIL: query.body.email,
      PASSWORD: query.body.password
    }
    const result = await connection.execute(sql, bind)
    /* const sql = ``
    const bind
    const result = await connection.execute(sql, bind, options) */
    console.log(result)
  } catch (err) {
    console.error('createQuery1 error' + err)
  } if (connection) {
    try {
      await connection.close()
    } catch (err) {
      console.error(err)
    }
  }
}

async function displayProduct () {
  let connection
  try {
    connection = await oracledb.getConnection()
    const sql = 'SELECT name, price, description FROM PRODUCT'
    const result = await connection.execute(sql, {}, { outFormat: oracledb.OBJECT })
    console.log(result)
    return result.rows
  } catch (error) {
    console.error(error)
  } if (connection) {
    try {
      await connection.close()
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports.createQuery = createQuery
module.exports.createQuery1 = createQuery1
module.exports.displayProduct = displayProduct
