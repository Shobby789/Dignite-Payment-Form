const express = require("express");
const {
  CreateCustomer,
  GetCustomers,
} = require("../controller/customerController");
const router = express.Router();

router.post("/create-customer", CreateCustomer);
router.get("/get-customers", GetCustomers);

module.exports = router;
