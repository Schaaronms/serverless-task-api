const fs = require("fs");
const { handler } = require("./src/handlers/createTask");

const event = JSON.parse(
  fs.readFileSync("./event.json", "utf8")
);

handler(event)
  .then(console.log)
  .catch(console.error);
