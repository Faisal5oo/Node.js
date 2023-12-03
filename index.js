const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const EventEmitter = require("events"); // Corrected typo here
const logEvents = require("./middleware/logEvents");

class Emitter extends EventEmitter {}

// const MyEmitter = new Emitter();
// MyEmitter.on("Log", (msg, filename) => logEvents(msg, filename));

// const port = process.env.PORT || 3500;

// const serveFiles = async (filePath, contentType, response) => {
//   try {
//     const rawData = await fsPromises.readFi(filePath, !contentType.includes("image") ? "utf8" : "");
//     const data = contentType === "application/json" ? JSON.parse(rawData) : rawData; // Corrected JSON parsing
//     response.writeHead(filePath.includes("404.html") ? 404 : 200, { "Content-Type": contentType.trim() }); // Removed extra spaces
//     response.end(data);
//   } catch (err) {
//     console.log(err);
//     MyEmitter.emit("Log", `${err.name} : ${err.message}`, "errLog.txt");

//     response.statusCode = 500;
//     response.end();
//   }
// };

// const server = http.createServer((req, res) => {
//   MyEmitter.emit("Log", `${req.url}\t ${req.method}`, "reqLog.txt");
//   console.log(req.url, req.method);
//   const extension = path.extname(req.url);

//   let contentType;

//   switch (extension) {
//     case ".css":
//       contentType = "text/css";
//       break;
//     case ".js":
//       contentType = "text/javascript";
//       break;
//     case ".json":
//       contentType = "application/json";
//       break;
//     case ".jpg":
//       contentType = "image/jpeg";
//       break;
//     case ".png":
//       contentType = "image/png";
//       break;
//     case ".txt":
//       contentType = "text/plain";
//       break;
//     default:
//       contentType = "text/html";
//   }

//   let filePath =
//     contentType === "text/html" && req.url === "/"
//       ? path.join(__dirname, "views", "default.html")
//       : contentType === "text/html" && req.url.slice(-1) === "/"
//       ? path.join(__dirname, "views", req.url, "default.html")
//       : contentType === "text/html"
//       ? path.join(__dirname, "views", req.url)
//       : path.join(__dirname, req.url);

//   if (!extension && !req.url.slice(-1) !== "/") filePath += ".html";
//   const fileExists = fs.existsSync(filePath);

//   if (fileExists) {
//     serveFiles(filePath, contentType, res);
//   } else {
//     switch (path.parse(filePath).base) {
//       case "old-page.html":
//         res.writeHead(301, { "Location": "new-page.html" });
//         res.end();
//         break;
//       case "www-page.html":
//         res.writeHead(301, { "Location": "/" });
//         res.end();
//         break;
//       default:
//         serveFiles(
//           path.join(__dirname, "views", "404.html"),
//           "text/html", // Removed extra spaces
//           res
//         );
//     }
//   }
// });

// server.listen(port, () =>
//   console.log(`server is running on port ${port}`)
// );





