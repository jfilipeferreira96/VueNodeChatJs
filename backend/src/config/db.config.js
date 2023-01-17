const path = require("path");
const dotenv = require("dotenv");
const fullPath = path.dirname(require.main.filename);

dotenv.config({ path: path.join(fullPath + "/src", ".env") });

module.exports = {
  local: {
    localUrlDatabase: process.env.DB_URI,
    secret: "password",
  },
};
