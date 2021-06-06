const dateFolder = "06-06-2021";
const nifty50Folder = "csv files/" + dateFolder + "/Nifty50";
const niftyNext50Folder = "csv files/" + dateFolder + "/NiftyNext50";
const niftyMidcap50Folder = "csv files/" + dateFolder + "/NiftyMidcap50";
const niftySmallcap50Folder = "csv files/" + dateFolder + "/NiftySmallcap50";
const fs = require("fs");
const path = require("path");
const csv = require("csvtojson");

function extractDataFromCSV(indices) {
  let companyTrades = [];
  const mapOfIndices = {
    nifty50: nifty50Folder,
    niftyNext50: niftyNext50Folder,
    niftyMidcap50: niftyMidcap50Folder,
    niftySmallcap50: niftySmallcap50Folder,
  };
  let testFolder = mapOfIndices[indices];

  // let testFolder = niftySmallcap50Folder;
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
                  trade.stockName = stockName;
                  return trade;
                });
              companyTrades = companyTrades.concat(...jsonObj);
              if (index + 1 == files.length) {
                companyTrades = companyTrades.sort((a, b) => {
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
