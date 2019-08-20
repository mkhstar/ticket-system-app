const { ObjectId } = require("mongoose").Types;
const isEmpty = require("../utils/isEmpty");

module.exports = (data, files, id) => {
  const { message } = data;
  let errors = {};

  if (!message) errors.message = "Message Field is required";
  else if (message.length < 10)
    errors.message = "Message field must be at least 10 characters";

  if (files && files.filesUploadedAdmin && files.filesUploadedAdmin.truncated)
    errors.files = "File uploaded is too large Max: 5MB Max: 3 files";

  if (!ObjectId.isValid(id)) errors.id = "Please pass a valid id";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
