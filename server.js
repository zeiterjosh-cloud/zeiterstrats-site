const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.static("public"));

const CLIENT_ID = "62t19tqfi57iuhzc6oxjfzilzg16hm";
const ACCESS_TOKEN = "62t19tqfi57iuhzc6oxjfzilzg16hm";
const TWITCH_USERNAME = "zeiterstrats";

app.get("/api/live-status", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.twitch.tv/helix/streams?user_login=${TWITCH_USERNAME}`,
      {
        headers: {
          "Client-ID": CLIENT_ID,
          "Authorization": `Bearer ${ACCESS_TOKEN}`
        }
      }
    );

    const data = await response.json();

    if (data.data && data.data.length > 0) {
      res.json({ live: true, title: data.data[0].title });
    } else {
      res.json({ live: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Twitch status" });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});