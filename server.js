const express = 
  require("express");
const app = express();
app.use(express.static("public));
const PORT = process.env.PORT || 10000;
app.get("/",(req, res) => {
  res.send("ZEITERSTRATS server is running");
});
app.listen(PORT, () =>{
  console.log("Server is running on port" +PORT)
