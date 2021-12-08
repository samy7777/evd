const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employees");

const auth = require("../middlewares/index");

router.post("/login", employeeController.login);
router.post("/add", auth.adminMiddleware, employeeController.add_admin);
router.get("/list", auth.adminMiddleware, employeeController.add_admin);
router.get("/:employee_id", auth.adminMiddleware, employeeController.add_admin)
router.put("/update/:id", auth.adminMiddleware, employeeController.add_admin);
router.delete("/:employee_id", auth.adminMiddleware, employeeController.add_admin);

module.exports = router;
