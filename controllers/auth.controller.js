const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const authResponse = require("../views/auth.response");
let generalResponse = require('../views/generalResponse.js')

function isValidAuthBearerHeader(req) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] == "Bearer"
  ) {
    // console.log("valid header");
    return true;
  } else {
    // console.log("invalid header");
    return false;
  }
}

const unAuthResponse = (res, respCode) => {
  res.status(respCode).send({
    error: true,
    message: "Oops! something went wrong",
  });
};

const createUser = (req, res) => {
  if (
    !req.body.username ||
    !req.body.password ||
    !req.body.fullname ||
    !req.body.contact
  ) {
    generalResponse(res, 400, true, 'Mandatory field should not be empty')

    return;
  }

  const User1 = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    fullname: req.body.fullname,
    designation: 1,
    contact: req.body.contact,
    account_type: 1,
  };

  UserModel.create(User1)
    .then((data) => {
      generalResponse(res, 201, false, 'Successfully signup')
    })
    .catch((err) => {
      if(err.name == 'SequelizeUniqueConstraintError') {
        generalResponse(res, 400, true, 'Username already exist.')  
      } else {
        generalResponse(res, 500, true, 'Some error occured, please try again later.')
      }
    });
};

const findOneUser = (req, res) => {
  const idUser = req.body.username;
  UserModel.findOne({
    where: {
      username: idUser,
    },
  })
    .then((data) => {
      if (data) {
        let isValidPassword = bcrypt.compareSync(
          req.body.password,
          data.password
        );
        if (!isValidPassword) {
          generalResponse(res, 401, true, 'Wrong username or password')
        } else {
          let token = jwt.sign(
            {
              username: data.username,
              fullname: data.fullname,
              designation: data.designation,
              account_type: data.account_type,
            },
            process.env.APP_SECRET,
            {
              expiresIn: 3000,
            }
          );
          res.status(200).send({
            error: false,
            data: authResponse(data),
            message: "Successfull login",
            accessToken: token,
          });
        }
      } else {
        generalResponse(res, 401, true, 'Wrong username or password')
      }
    })
    .catch((err) => {
      console.log(err);
      generalResponse(res, 500, true, 'Ooops! there is something wrong')
    });
};

const verifyToken = (req, res) => {
  console.log(`header Authorization : ${req.headers.authorization}`);
  if (!isValidAuthBearerHeader(req)) {
    unAuthResponse(res, 404);
  }

  jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.APP_SECRET,
    (err, decode) => {
      // console.log(decode)
      if (err) {
        unAuthResponse(res, 404);
      } else {
        generalResponse(res, 200, false, 'Ok')
      }
    }
  );
};

const verifyUserOwn = (req, res) => {
  let reqToken = req.headers.authorization.split(" ")[1];
  console.log(`reqToken = ${reqToken}`);
  let dataUser = jwt.verify(reqToken, process.env.APP_SECRET);
  console.log(
    `dataUser = ${dataUser.username} == req.params.username = ${req.params.username}`
  );
  
  if (dataUser.username != req.params.username) {
    generalResponse(res, 403, true, 'Not Authorized!')
  }

  generalResponse(res, 200, false, 'Ok')
};

module.exports = {
  createUser,
  findOneUser,
  verifyToken,
  verifyUserOwn,
};
