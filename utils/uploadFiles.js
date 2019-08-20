const path = require("path");
const fileNameGen = require("./filenamegenerator");

const uploadFiles = async files => {
  return new Promise((resolve, reject) => {
    if (Array.isArray(files)) {
      const fileNames = [];
      files.forEach((file, index) => {
        const fileName = fileNameGen(file.name);
        file.mv(path.join(__dirname, "..", "files", fileName), err => {
          if (err) reject(err);
          else {
            if (index === files.length - 1) {
              fileNames.push(fileName);
              resolve(fileNames);
            } else fileNames.push(fileName);
          }
        });
      });
    } else {
      const fileName = fileNameGen(files.name);
      files.mv(path.join(__dirname, "..", "files", fileName), err => {
        if (err) reject(err);
        else resolve([fileName]);
      });
    }
  });
};

module.exports = uploadFiles;
