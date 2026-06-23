const fs = require("fs");
const { handler } = require("./src/handlers/listTasks");

const event = JSON.parse(
  fs.readFileSync("./list-event.json", "utf8")
);

handler(event)
  .then(console.log)
  .catch(console.error);
