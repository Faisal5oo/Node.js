const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs"); // Corrected 'requirte' to 'require'

const fsPromises = require("fs").promises; // Removed the extra '.promises'

const path = require("path");

const logEvents = async (message, Logname) => {
  const dataTime = `${format(new Date(), "yyyy-MM-dd\tHH:mm:ss")}`; // Corrected the date format
  const logItem = `${dataTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);

  try {
    if (!fs.existsSync(path.join(__dirname,"..","logs"))) {
      await fsPromises.mkdir(path.join(__dirname,"..","logs", ));
    }
    await fs.promises.appendFile(path.join(__dirname, "..","logs",Logname), logItem);
  } catch (err) { // Added the 'err' parameter to catch block
    console.log(err);
  }
};
 const logger=((req,res,next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,"reqLog.txt")
    console.log(`${req.method}\t${req.path}`)
    next()
})


module.exports = {logger,logEvents};
