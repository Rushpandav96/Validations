const app = require("./index");
const connect = require("./configs/db");

app.listen(1010, async function () {
  try {
    await connect();
    console.log("listening on port 1010");
  } catch (err) {
    console.error(err.message);
  }
});
