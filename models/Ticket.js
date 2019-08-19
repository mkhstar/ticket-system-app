const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  customerName: {
    type: String,
    required: "",
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: { type: String, required: true, trim: true },
  adminResponse: String,
  status: {
    type: String,
    enum: ["open", "closed", "pending"],
    default: "open"
  },
  filesUploadedCustomer: [String],
  filesUploadedAdmin: [String]
});

module.exports = mongoose.model("ticket", TicketSchema);
