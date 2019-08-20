const path = require("path");
const fileNameGenerator = name => {
  const date = Date.now();
  const extname = path.extname(name);
  const filename = path.parse(name).name + `-${date}${extname}`;
  return filename;
};
module.exports = fileNameGenerator;
