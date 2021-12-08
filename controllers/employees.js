const User = require('../models/employees');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async(req, res, next) => {
  User.findOne({
    email: req.body.email,
    $or: [
      { role: "admin" },
      { role: "employee" }
    ],
  })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(200).json({
          status: "ERROR",
          code: 200,
          message: "Username/Password Is Incorrect!",
          data: [],
          error: [],
        });
      }

      bcrypt.compare(req.body.password, user.password).then(function (resdata) {
        if (resdata) {
          const token = jwt.sign(
            {
              email: user.email,
              user_id: user._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            status: "OK",
            code: 200,
            message: "LOGIN SUCCESS",
            data: {
              token: token,
              user: user,
              role:user.role
            },
            error: [],
          });
        } else {
          res.status(200).json({
            status: "ERROR",
            code: 200,
            message: "Username/Password Not Found!",
          });
        }
      });
    });
};

exports.add_admin = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user) {
        return res.status(409).json({
          status: "ERROR",
          code: 409,
          message: "Email Already Registered!",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              status: "ERROR",
              code: 500,
              message: "Internal Server Error",
              error: err,
            });
          } else {
            req.body.password = hash;
            const user = new User({
              email: req.body.email,
              mobile:req.body.mobile,
              designation:req.body.designation,
              password: req.body.password,
              role:req.body.role
              
            });
            user.save().then((result) => {
              res.status(201).json({
                status: "CREATED",
                code: 200,
                message: "Employee Successfully",
                data: result,
              });
            });
          }
        });
      }
    });
};

exports.single_admin_details = (req, res, next) => {
  User.findOne({ _id: req.params.employee_id })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          status: "ERROR",
          code: 404,
          message: "Employee Not Found",
        });
      }

      return res.status(200).json({
        status: "OK",
        code: 200,
        message: "Employee Details",
        data: user,
      });
    });
};

exports.update_admin = async (req, res, next) => {
  console.log(req.body)
  try {
    const id = req.params.id;
    // req.body.password = hash
    const updates = req.body;
    const result = await User.findByIdAndUpdate(id, updates, { new: true });
    // console.log(result);
    return res.send({
      status: "UPDATED",
      code: 202,
      message: "Employee Updated Successfully",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      status: "ERROR",
      code: 500,
      message: "Internal Server Error",
      error: err,
    });
  }
};
exports.getalladmin = (req, res, next) => {
  User.find()
  
    .then((user) => {
      return res.status(200).json({
        status: "OK",
        code: 200,
        message: "All Employee",
        data: user,
        error: [],
      });
    });
};

exports.user_delete = (req, res, next) => {
  User.findByIdAndDelete(req.params.employee_id, req.body, function (err, data) {
    if (err) {
      res.status(400).json({
        status: "ERROR",
        code: 400,
        message: "Employee Not Found",
      });
    } else {
      res.status(200).json({
        status: "OK",
        code: 200,
        message: "Deleted",
      });
    }
  });
};
