const isEmpty = require("../utils/isEmpty");

module.exports = (data, file) => {
  const { customerName, subject, message } = data;
  let errors = {};

  if (!customerName) errors.customerName = "Full name field is required";
  else if (customerName.length < 6)
    errors.customerName = "Full name must be more than 6 characters";
  if (!subject) errors.subject = "Subject field is required";
  else if (subject.length < 2)
    errors.subject = "Subject must be more than 2 characters";

  if (!message) errors.message = "Message field is required";
  else if (message.length < 10)
    errors.message = "Message must be more than 10 characters";

  if (
    file &&
    file.filesUploadedCustomer &&
    file.filesUploadedCustomer.truncated
  )
    errors.file = "File uploaded is too large Max: 5MB Max: 3 files";
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
