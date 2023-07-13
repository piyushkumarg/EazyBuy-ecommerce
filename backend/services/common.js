const passport = require("passport");

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  //TODO : this is temporary token for testing without cookie
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWNjZDRmZWFjOWEwOTU2MmFlMWEzZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg5MTgzMjE2fQ.gN7kPb148gBs85rcyEotX50O5zrpsyT8QODUh1Kr09o";
  return token;
};
