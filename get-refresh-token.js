const { google } = require("googleapis");
const readline = require("readline");

const CLIENT_ID = "553666233624-6o82ccoqdse0m6e5udu7i8jskbs9i26j.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000/api/oauth2callback"; // same as in step 4

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
});

console.log("Authorize this app by visiting this URL:\n", authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Paste the code from that page here: ", async (code) => {
  const { tokens } = await oAuth2Client.getToken(code);
  console.log("Refresh Token:\n", tokens.refresh_token);
  rl.close();
});
