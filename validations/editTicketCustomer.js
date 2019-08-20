const { ObjectId } = require("mongoose").Types;
const isEmpty = require("../utils/isEmpty");

module.exports = (data, file, id) => {
  const { customerName, subject, message } = data;
  let errors = {};

  if (!customerName) errors.customerName = "Full name field is required";
  else if (customerName.length < 6)
    errors.customerName = "Full name must be more than 6 characters";

  if (subject && subject.length < 2)
    errors.subject = "Subject must be more than 2 characters";
  if (message && message.length < 10)
    errors.message = "Message must be more than 10 characters";

  if (
    file &&
    file.filesUploadedCustomer &&
    file.filesUploadedCustomer.truncated
  )
    errors.file = "File uploaded is too large Max: 5MB Max: 3 files";

  if (!ObjectId.isValid(id)) errors.id = "Please pass a valid id";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
