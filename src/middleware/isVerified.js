const { failed } = require("../helper/response");
module.exports = {
  isVerified: (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.is_verified === 1) {
      next();
    } else {
      failed(res, null, "failed", "email not verified");
    }
  },
};
