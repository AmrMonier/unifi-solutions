const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = new express();
// register third-party packages
app.use(cors());
app.use(bodyParser.json());

// register routes


// register middlewares

const PORT = process.env.PORT || 3030

app.listen(PORT, () => {
    console.log(`App is up and running on http://localhost:${PORT}`);
})
