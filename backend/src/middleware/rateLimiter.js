const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 10 * 60 * 100,
  max: 150,
  message: {
    message:
      "Too many requests from this IP address, please try again after 10 minutes.",
  },
});

module.exports = limiter;
