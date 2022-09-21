exports.AdminVerify = (req, res, next) => {
  var role = req.headers["role"];
  if(role !=="admin"){
    res.status(403).send("Forbidden")
  }
  next();
}
