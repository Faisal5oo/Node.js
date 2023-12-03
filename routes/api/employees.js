const express = require("express");
const router = express.Router();
const employeeControllers = require("../../Controllers/employeeControllers");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router
  .route("/")
  .get(employeeControllers.getAllEmployees)
  .post(employeeControllers.createEmployee)

  .put(employeeControllers.updateEmployee)
  .delete(employeeControllers.deleteEmployee);

router.route("/:id").get(employeeControllers.getEmployee);

module.exports = router;
