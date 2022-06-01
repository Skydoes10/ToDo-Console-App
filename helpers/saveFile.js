const fs = require("fs");

const file = "./db/data.json";

const saveDB = (data) => {
  fs.writeFileSync(file, JSON.stringify(data));
};

const readDB = () => {
  if (!fs.existsSync(file)) {
    return null;
  }
  const data = fs.readFileSync(file, "utf8");
  return JSON.parse(data);
};

module.exports = {
  saveDB,
  readDB,
};
