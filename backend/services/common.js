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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWQ0ZDRhYTc2N2ViNjQ3OGZkYmRmMyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4OTQxNTgzN30.rSg2ZUP6xFnxFhdcEqg4TTZKEUXPWRFEqLhOhFLhX4Y";
  return token;
};
