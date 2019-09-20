const router = require("express").Router();
const Users = require("./auth-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const restricted = require("./authenticate-middleware");
const secret = require("../config/secrets");

router.post("/register", (req, res) => {
  // implement registration
  let user = req.body;

  user.password = bcrypt.hashSync(user.password, 10);

  Users.add(user)
    .then(saved => {
      res.status(201).json({ message: "saved!", saved });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  // implement login
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!, have a token`,
          token
        });
      } else {
        res.status(401).json({
          message: "invalid credentials"
        });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/users", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json({ users, loggedInUser: req.user.username });
    })
    .catch(err => res.send(err));
});

function generateToken(user) {
  const payload = {
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
