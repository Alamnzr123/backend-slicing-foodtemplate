const { failed } = require('../helpers/response')
module.exports = {
  isAdmin: (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.level === 0) {
      next()
    } else {
      failed(res, null, 'failed', 'forbidden access')
    }
  },
  isCustomer: (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.level === 1) {
      next()
    } else {
      failed(res, null, 'failed', 'forbidden access')
    }
  },
  isCustomerWithSameId: (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.id === Number(req.params.id)) {
      next()
    } else {
      failed(res, null, 'failed', 'forbidden access')
    }
  },
  isAdminOrCustomerWithSameId: (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.level === 0) {
      next()
    } else if (req.APP_DATA.tokenDecoded.id === Number(req.params.id)) {
      next()
    } else {
      failed(res, null, 'failed', 'forbidden access')
    }
  }
}
