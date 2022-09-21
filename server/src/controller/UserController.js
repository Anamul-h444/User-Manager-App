const UserModel = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.regestrationUser = async (req, res) => {
  let user = new UserModel({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobile: req.body.mobile,
    password: req.body.password,
    photo: "",
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  try {
    let data = await user.save();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email ");

    const validUser = await bcrypt.compare(req.body.password, user.password);
    if (!validUser) return res.status(400).send("Invalid password");

    let paylod = {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60,
      user: user,
    };
    let token = jwt.sign(paylod, "secretKey123");
    res.status(200).json({ user: user, token: token });
  } catch (err) {
    res.status(401).send("Please insert correct userName or Password!");
  }
};

// exports.regestrationUser = (req, res)=>{
//     const reqBody = req.body;
//     UserModel.create(reqBody, (err, data)=>{
//         if(err){
//             res.status(404).send(err)
//         }else{
//             res.status(200).send(data)
//         }
//     })
// };

// exports.loginUser = (req, res) => {
//   const email = req.body["email"];
//   const password = req.body["password"];
//   UserModel.find({ email: email, password: password }, (err, data) => {
//     if (err) {
//       res.status(400).send(err);
//     } else {
//       if (data.length > 0) {
//         let paylod = {
//           exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60,
//           data: data,
//         };
//         let token = jwt.sign(paylod, "secretKey123");

//         res.status(200).json({ data: data, token: token });
//       } else {
//         res.status(401).send("Please insert correct userName or Password!");
//       }
//     }
//   });
// };

exports.selectProfile = (req, res) => {
  UserModel.find({}, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

exports.profileDetails = (req, res) => {
  let email = req.headers["email"];
  UserModel.aggregate(
    [
      { $match: { email: email } },
      {
        $project: {
          _id: 1,
          email: 1,
          firstName: 1,
          lastName: 1,
          mobile: 1,
          photo: 1,
          password: 1,
        },
      },
    ],
    (err, data) => {
      if (err) {
        res.status(400).json({ status: "fail", data: err });
      } else {
        res.status(200).json({ status: "success", data: data });
      }
    }
  );
};

exports.updateProfile = (req, res) => {
  let email = req.headers.email;
  let reqBody = req.body;
  //console.log('reqbody', reqBody)
  UserModel.updateMany(
    { email: email },
    { $set: reqBody },
    { new: true },
    (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
};

