// server.js
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.post("/access_token", async (req, res) => {
  const { code } = req.body;
  try {
    const response = await axios.post(
      process.env.GITHUB_ACCESS_TOKEN_URL,
      {
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        scope: process.env.SCOPE,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const accessToken = response.data.access_token;
    res.json({ access_token: accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
