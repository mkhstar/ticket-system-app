const path = require("path");
const fs = require("fs");

const deleteFiles = async fileNames => {
  return new Promise((resolve, reject) => {
    fileNames.forEach((f, index) => {
      fs.unlink(path.join(__dirname, "..", "files", f), err => {
        if (err) reject(err);
        if (index === fileNames.length - 1) {
          resolve(true);
        }
      });
    });
  });
};

module.exports = deleteFiles;
