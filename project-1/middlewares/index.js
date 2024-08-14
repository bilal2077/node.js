const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
        appendFile,
      `\n${Date.now()}:${req.ip} :${req.method} :${req.path}\n`,
      (err, data) => {
        next();
      }
    );
    req.myUserName = "bilal.bec";
    next();
  };
}

module.exports = {
    logReqRes,
}; 
