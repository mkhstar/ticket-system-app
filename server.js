const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const customer = require("./routes/customer");
const admin = require("./routes/admin");

const app = express();

/**
 * @route   GET /file/:userid/:filename
 * @desc    SERVE ALL FILES
 * @access  PUBLIC
 */
app.get("/file/:filename", (req, res) => {
  res.sendFile(path.join(__dirname, "files", req.params.filename));
});

app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use("/api/customer", customer);
app.use("/api/admin", admin);

const port = 5000;
app.listen(port, () => console.log(`Server Started on port ${port}`));
