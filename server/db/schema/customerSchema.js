const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: String, required: true },
    pageUrl: { type: String, required: false, default: "" },
  },
  { collection: "Customers" }
);

module.exports = mongoose.model("Customers", CustomerSchema);
