const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.static("public"));

const PORT = process.env.PORT || 10000;

// 🔐 PUT YOUR REAL VALUES HERE
const CLIENT_ID = "62t19tqfi57iuhzc6oxjfzilzg16hm";
const CLIENT_SECRET = "q1j47cjv700mesg3ye5l9ejfabl2j2";
const USERNAME = "zeiterstrats";

let appAccessToken = null;
let tokenExpiry = null;

async function getAppAccessToken() {
  if (appAccessToken && Date.now() < tokenExpiry) {
    return appAccessToken;
  }

  const response = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "client_credentials"
    })
  });

  const data = await response.json();

  appAccessToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in * 1000);

  return appAccessToken;
}

app.get("/api/live-status", async (req, res) => {
  try {
    const token = await getAppAccessToken();

    const response = await fetch(
      `https://api.twitch.tv/helix/streams?user_login=${USERNAME}`,
      {
        headers: {
          "Client-ID": CLIENT_ID,
          "Authorization": `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    if (data.data && data.data.length > 0) {
      const stream = data.data[0];
      res.json({
        live: true,
        title: stream.title,
        viewers: stream.viewer_count
      });
    } else {
      res.json({ live: false });
    }

  } catch (err) {
    res.json({ live: false });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});