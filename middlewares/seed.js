const bcrypt = require("bcrypt");
const User = require("../models/employees");

bcrypt.hash("123456", 10, (err, hash) => {
  const user = new User({
    email: "evdtechnologyllp@gmail.com",
    password: hash,
    firstName:'Anshu',
    lastName:'Agrawal',
    role:'admin'
  });
  User.findOne({ email: "evdtechnologyllp@gmail.com" }, function (error, docs) {
    if (!docs) {
      User.create(user, function (err, user) {
        if (err) {
          console.log("Error in creating default admin" + err);
        }
      });
    }
  });
});
