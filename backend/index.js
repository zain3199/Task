const express = require("express");
require("./db/config");

const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.post("/compute", (req, res) => {
  const { num1, num2, operation } = req.body;
  // Validate input
  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: "Please provide valid numbers." });
  }
  let result;
  switch (operation) {
    case "add":
      result = num1 + num2;
      break;
    case "subtract":
      result = num1 - num2;
      break;
    case "multiply":
      result = num1 * num2;
      break;
    default:
      return res.status(400).json({
        error: "Invalid operation. Choose add, subtract, or multiply.",
      });
  }

  res.json({ result });
});
app.listen(5000);
