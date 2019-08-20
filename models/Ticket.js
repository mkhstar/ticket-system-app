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
  message: { type: String, required: true },
  adminResponse: {
    message: String,
    date: { type: Date }
  },
  status: {
    type: String,
    enum: ["open", "closed", "pending"],
    default: "open"
  },
  filesUploadedCustomer: [String],
  filesUploadedAdmin: [String],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ticket", TicketSchema);
