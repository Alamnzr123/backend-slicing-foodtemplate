const bcrypt = require('bcrypt')
const authModel = require('../models/auth.models')
const { success, failed, successWithToken } = require('../helper/response')
const jwtToken = require('../helper/generateToken')
const authController = {
  register: async (req, res) => {
    try {
      // let image = req.file.filename
      // if (!image) {
      //   image = null
      // }
      const { name, email, password, phone } = await req.body
      if (!name) {
        throw Error('Nama harus diisi') // validation
      }
      if (!email) {
        throw Error('Email harus diisi') // validation
      }
      if (!password) {
        throw Error('Password harus diisi') // validation
      }
      if (!phone) {
        throw Error('Nomor telepon harus diisi') // validation
      }
      authModel.checkEmailRegistered(email.toLowerCase()) // call model to check email exist or not
        .then((result) => {
          bcrypt.hash(password, 10, (err, hash) => { // encrypt password before insert to db
            if (err) {
              failed(res, err.message, 'failed', 'Failed hash a password') // show error if catching error
            } else {
              const data = { // data to send
                name,
                email: email.toLowerCase(),
                password: hash,
                phone
              }
              authModel.register(data) // calling model to register data
                .then((result) => {
                  success(res, null, 'success', 'Register user berhasil') // output if success
                })
                .catch((err) => {
                  failed(res, err.message, 'failed', 'Register user gagal') // output if failed
                })
            }
          })
        })
        .catch((err) => {
          failed(res, err.message, 'failed', 'Email already registered') // output if email already registered
        })
    } catch (err) {
      failed(res, err.message, 'failed', 'Internal Server Error') // output if catching error
    }
  },
  login: async (req, res) => {
    try {
      const { password } = await req.body
      const email = req.body.email.toLowerCase()
      if (!email) {
        throw Error('Email harus diisi') // validation
      }
      if (!password) {
        throw Error('Password harus diisi') // validation
      }
      authModel.login(email) // call model and send email to check email exist or not
        .then((results) => {
          if (results.rowCount > 0) { // condition if email exist
            bcrypt.compare(password, results.rows[0].password) // compare plain password with hash password on db
              .then(async (match) => {
                if (match) {
                  const token = await jwtToken(results.rows[0])
                  successWithToken(res, token, results.rows[0].id, 'success', 'login sukses') // output if bcrypt compare return true
                } else {
                  failed(res, null, 'error', 'username atau password salah') // output if bcrypt compare return false
                }
              })
          } else {
            failed(res, null, 'error', 'username atau password salah') // output if email doesnt exist
          }
        })
        .catch((err) => {
          failed(res, err.message, 'failed', 'Internal Server Error') // output if some error catch
        })
    } catch (err) {
      failed(res, err.message, 'failed', 'Internal Server Error') // output if some error catch
    }
  }
}

module.exports = authController
