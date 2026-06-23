const fs = require("fs");
const { handler } = require("./src/handlers/getTask");

const event = JSON.parse(
  fs.readFileSync("./get-event.json", "utf8")
);

handler(event)
  .then(console.log)
  .catch(console.error);
