const express = require("express");
const passport = require("passport");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const jwtStrategry = require("./strategies/jwt");
const randToken = require("rand-token");
const SECRET = "SECRET_KEY"; //normally stored in process.env.secret
let refreshTokens = {};

passport.use(jwtStrategry);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.get("/", (req, res) => {
  res.send("hello express server");
});

app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.status(200).send("yay we are authenticated");
  }
);

app.post("/login", (req, res) => {
  let { email, password } = req.body;
  //This lookup would normally be done using a database
  if (email === "sw") {
    if (password === "pass") {
      let opts = {};
      //the password compare would normally be done using bcrypt.
      opts.expiresIn = 120; //token expires in 2min
      const token = jwt.sign({ email }, SECRET, opts);
      let refreshToken = randToken.uid(256);
      refreshTokens[refreshToken] = email;
      return res.status(200).json({
        message: "Auth Passed",
        token,
        refreshToken
      });
    }
  }
  return res.status(401).json({ message: "Auth Failed" });
});

app.post("/token", function(req, res, next) {
  let email = req.body.email;
  let refreshToken = req.body.refreshToken;
  if (refreshToken in refreshTokens && refreshTokens[refreshToken] == email) {
    let token = jwt.sign({ email }, SECRET, { expiresIn: 300 });
    res.json({ token: "JWT " + token });
  } else {
    res.send(401);
  }
});
