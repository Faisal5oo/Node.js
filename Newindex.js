const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.port || 3500;
const cors = require("cors");
const { logEvents, logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const { error } = require("console");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(logger);

const whiteList = [
  "https://www.yoursite.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];
const corsOption = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.log(new Error("Not allowed by CORS"));
    }
    optionSuccessStatus = 200;
  },
};

app.use(cors(corsOption));

app.use("/register", require("./routes/api/register"));
app.use("/auth", require("./routes/api/auth"));
app.use("/refresh", require("./routes/api/refresh"));
app.use("/logout", require("./routes/api/logout"));

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));
// app.get("^/$|/default.html",(req,res)=>{
//     res.sendFile(path.join(__dirname,"views","default.html"))
// })
// app.get("/new-page(.html)?",(req,res)=>{
//     res.sendFile(path.join(__dirname,"views","new-page.html"))
// })
// app.get("/old-page(.html)?",(req,res)=>{
//     res.redirect("/new-page.html")
// })
// app.get("/*",(req,res)=>{
//     res.status(404).sendFile(path.join(__dirname,"views","404.html"))

// })
app.use(errorHandler);
app.listen(PORT, console.log("server is running on Port:", PORT));
