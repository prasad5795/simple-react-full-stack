const testFolder = "csv files/29-5-2021";
const fs = require("fs");
const path = require("path");
const csv = require("csvtojson");

function extractDataFromCSV() {
  let companyTrades = [];
  return new Promise((resolve, reject) => {
    fs.readdir(testFolder, (err, files) => {
      if (err) {
        console.log("error occured", err);
        reject(err);
      } else {
        files.forEach((file, index) => {
          const stockName = file.split("_")[0];
          console.log(stockName);
          const csvFilePath = path.join(testFolder, file);
          csv({
            checkType: true,
          })
            .fromFile(csvFilePath)
            .then((jsonObj) => {
              jsonObj = jsonObj
                .filter((trade) => trade["Date/Time"])
                .map((trade) => {
                  trade.timeStamp = new Date(
                    Date.parse(trade["Date/Time"])
                  ).valueOf();
                  return trade;
                });
              // for (let i = 0; i < jsonObj.length; i++) {
              //   jsonObj[i].stockName = stockName;
              //   jsonObj[i].timeStamp = jsonObj[i]["Date/Time"] ? new Date(
              //     Date.parse(jsonObj[i]["Date/Time"])
              //   ).valueOf():new Date().valueOf();
              // }
              companyTrades = companyTrades.concat(...jsonObj);
              if (index + 1 == files.length) {
                companyTrades = companyTrades.sort((a, b) => {
                  const date1 = a["Date/Time"];
                  const date2 = b["Date/Time"];
                  // return new Date(Date.parse(a["Date/Time"])).valueOf() - new Date(Date.parse(b["Date/Time"])).valueOf()
                  // return date1 - date2
                  if (a.timeStamp && b.timeStamp)
                    return a.timeStamp - b.timeStamp;
                });

                resolve(companyTrades);
              }
            });
        });
      }
    });
  });
}

exports.extractDataFromCSV = extractDataFromCSV;
