const { failed } = require("../helper/response");
module.exports = {
  isAdmin: async (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.level === 0) {
      await next();
    } else {
      failed(res, null, "failed", "forbidden access");
    }
  },
  isCustomer: async (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.level === 1) {
      await next();
    } else {
      failed(res, null, "failed", "forbidden access");
    }
  },
  isCustomerWithSameId: async (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.id === Number(req.params.id)) {
      await next();
    } else {
      failed(res, null, "failed", "forbidden access");
    }
  },
  isAdminOrCustomerWithSameId: (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.level === 0) {
      next();
    } else if (req.APP_DATA.tokenDecoded.id === Number(req.params.id)) {
      next();
    } else {
      failed(res, null, "failed", "forbidden access");
    }
  },
};
