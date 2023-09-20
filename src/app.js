const express = require("express");
const cors = require("cors");
const server = express();
const port = 3000;
const bodyParser = require("body-parser");

// server.use(express.urlencoded({ extended: false }));
server.use(cors());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
server.use(bodyParser.json());
server.use(express.static("public"));
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

server.use("/files", require("./routes/fileHandling"));
