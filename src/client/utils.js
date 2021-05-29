export const analyzeDataWithoutMoneyLimit = (data) => {
  let stockTrades = {};
  let currentInvestedAmount = 0;
  let currentInvestedAmountArr = [];
  let onGoingTrades = 0;
  let profitAccumulated = 0;
  let profitAccumulatedArr = [];
  let cashInHandAfterTrade = 0;
  let cashInHandAfterTradeArr = [];
  let newlyInvestedMoney = 0;
  let newlyInvestedMoneyArr = [];
  let totalMoneyUsedForBuying = 0;
  let totalMoneyUsedForBuyingArr = [];
  let totalMoneyReused = 0;
  let totalMoneyReusedArr = [];
  let numberOfTradesReusedMoney = 0;
  let numberOfTradesReusedMoneyArr = [];
  let lossAccumulated = 0;
  let winningTrades = 0;
  let winningTradesArr = [];
  let buyTrades = 0;
  let sellTrades = 0;
  let loosingTrades = 0;
  let loosingTradesArr = [];
  let maxMoneyInvestedCurrently = 0;
  let totalProfit = 0;
  let totalProfitArr = [];
  let totalLoss = 0;
  let totalLossArr = [];
  let timestamps = [];
  // let amountOfTimeInvested = 0;
  for (let k = 0; k < data.length; k++) {
    const trade = data[k];
    const index = k;
    //   data.forEach((trade, index) => {
    if (trade.Type == "Entry Long" && trade.Price < 5000) {
      buyTrades += 1;
      timestamps.push(trade.timeStamp);
      if (!stockTrades[trade.stockName]) {
        stockTrades[trade.stockName] = {};
        stockTrades[trade.stockName].remainingCorpus = 5000;
        //   trade.Price > 5000 ? trade.Price : 5000;
        stockTrades[trade.stockName].tradesTaken = 0;
        stockTrades[trade.stockName].buyTimestamp = trade.timeStamp;
        stockTrades[trade.stockName].stockName = trade.stockName;
        stockTrades[trade.stockName].totalTimeInvested = 0;
        stockTrades[trade.stockName].winningTrades = 0;
        stockTrades[trade.stockName].loosingTrades = 0;
      }

      if (trade.Price > stockTrades[trade.stockName].remainingCorpus) {
        if (cashInHandAfterTrade >= trade.Price) {
          stockTrades[trade.stockName].numberOfShares = 1;
          stockTrades[trade.stockName].remainingCorpus = trade.Price;
          totalMoneyReused += trade.Price;
          cashInHandAfterTrade -= trade.Price;
          numberOfTradesReusedMoney += 1;
        } else {
          newlyInvestedMoney += trade.Price - cashInHandAfterTrade;
          stockTrades[trade.stockName].numberOfShares = 1;
          stockTrades[trade.stockName].remainingCorpus = trade.Price;
          if (cashInHandAfterTrade > 0) numberOfTradesReusedMoney += 1;
          totalMoneyReused += cashInHandAfterTrade;
          cashInHandAfterTrade = 0;
        }
      } else {
        if (
          cashInHandAfterTrade >= stockTrades[trade.stockName].remainingCorpus
        ) {
          stockTrades[trade.stockName].numberOfShares = parseInt(
            stockTrades[trade.stockName].remainingCorpus / trade.Price
          );
          //   stockTrades[trade.stockName].remainingCorpus = cashInHandAfterTrade;
          totalMoneyReused += stockTrades[trade.stockName].remainingCorpus;
          cashInHandAfterTrade -= stockTrades[trade.stockName].remainingCorpus;
          numberOfTradesReusedMoney += 1;
        } else {
          newlyInvestedMoney +=
            stockTrades[trade.stockName].remainingCorpus - cashInHandAfterTrade;
          stockTrades[trade.stockName].numberOfShares = parseInt(
            stockTrades[trade.stockName].remainingCorpus / trade.Price
          );
          if (cashInHandAfterTrade > 0) numberOfTradesReusedMoney += 1;
          totalMoneyReused += cashInHandAfterTrade;
          cashInHandAfterTrade = 0;
        }
      }

      currentInvestedAmount += stockTrades[trade.stockName].remainingCorpus;
      totalMoneyUsedForBuying += stockTrades[trade.stockName].remainingCorpus;
      stockTrades[trade.stockName].tradesTaken += 1;
      onGoingTrades += 1;

      if (currentInvestedAmount > maxMoneyInvestedCurrently) {
        maxMoneyInvestedCurrently = currentInvestedAmount;
      }
    } else if (
      trade.Type == "Exit Long" &&
      stockTrades[trade.stockName] &&
      stockTrades[trade.stockName].numberOfShares
    ) {
      timestamps.push(trade.timeStamp);
      sellTrades += 1;
      onGoingTrades -= 1;
      currentInvestedAmount -= stockTrades[trade.stockName].remainingCorpus;
      const profitOrLoss = parseInt(
        trade["Profit NONE"] * stockTrades[trade.stockName].numberOfShares
      );
      //   console.log("profitOrLoss", profitOrLoss);
      stockTrades[trade.stockName].remainingCorpus += profitOrLoss;

      stockTrades[trade.stockName].numberOfShares = 0;
      stockTrades[trade.stockName].sellTimestamp = trade.timeStamp;
      stockTrades[trade.stockName].totalTimeInvested +=
        stockTrades[trade.stockName].sellTimestamp -
        stockTrades[trade.stockName].buyTimestamp;

      cashInHandAfterTrade += stockTrades[trade.stockName].remainingCorpus;
      profitAccumulated += profitOrLoss;
      if (profitOrLoss >= 0) {
        winningTrades += 1;
        stockTrades[trade.stockName].winningTrades += 1;
        totalProfit += profitOrLoss;
      } else {
        loosingTrades += 1;
        stockTrades[trade.stockName].loosingTrades += 1;
        totalLoss += profitOrLoss;
      }
    }

    if (index + 1 == data.length) {
      console.log("currentInvestedAmount", currentInvestedAmount);
      console.log("profitAccumulated", profitAccumulated);
      console.log("stockTrades", stockTrades);
      console.log("newlyInvestedMoney", newlyInvestedMoney);
      console.log("totalMoneyUsedForBuying", totalMoneyUsedForBuying);
      console.log("numberOfTradesReusedMoney", numberOfTradesReusedMoney);
      console.log("totalMoneyReused", totalMoneyReused);
      console.log("total completed trades", sellTrades);
      console.log("total buy trades", buyTrades);
      console.log("winningTrades", winningTrades);
      console.log("loosingTrades", loosingTrades);
      console.log("cashInHandAfterTrade", cashInHandAfterTrade);
      console.log("totalProfit", totalProfit);
      console.log("totalLoss", totalLoss);
      //   for (let key in stockTrades) {
      //     console.log(stockTrades[key]);
      //   }

      return {
        currentInvestedAmountArr,
        profitAccumulatedArr,
        newlyInvestedMoneyArr,
        totalMoneyUsedForBuyingArr,
        numberOfTradesReusedMoneyArr,
        totalMoneyReusedArr,
        winningTradesArr,
        loosingTradesArr,
        totalProfitArr,
        totalLossArr,
      };
    } else {
      currentInvestedAmountArr.push({
        time: trade.timeStamp,
        totaltrades: sellTrades,
        value: currentInvestedAmount,
      });
      profitAccumulatedArr.push({
        time: trade.timeStamp,
        value: profitAccumulated,
        totaltrades: sellTrades,
      });
      newlyInvestedMoneyArr.push({
        totaltrades: sellTrades,
        time: trade.timeStamp,
        value: newlyInvestedMoney,
      });
      totalMoneyUsedForBuyingArr.push({
        totaltrades: sellTrades,
        time: trade.timeStamp,
        value: totalMoneyUsedForBuying,
      });
      numberOfTradesReusedMoneyArr.push({
        totaltrades: sellTrades,
        time: trade.timeStamp,
        value: numberOfTradesReusedMoney,
      });
      totalMoneyReusedArr.push({
        totaltrades: sellTrades,
        time: trade.timeStamp,
        value: totalMoneyReused,
      });
      winningTradesArr.push({
        time: trade.timeStamp,
        totaltrades: sellTrades,
        value: winningTrades,
      });
      loosingTradesArr.push({
        time: trade.timeStamp,
        totaltrades: sellTrades,
        value: loosingTrades,
      });
      totalProfitArr.push({
        time: trade.timeStamp,
        totaltrades: sellTrades,
        value: totalProfit,
      });
      totalLossArr.push({
        time: trade.timeStamp,
        totaltrades: sellTrades,
        value: totalLoss,
      });
    }
    //   });
  }
};

export const analyzeDataWithMoneyLimit = (data) => {
  let stockTrades = {};
  let currentInvestedAmount = 0;
  let onGoingTrades = 0;
  let profitAccumulated = 0;
  let cashInHandAfterTrade = 0;
  let newlyInvestedMoney = 0;
  let totalMoneyUsedForBuying = 0;
  let totalMoneyReused = 0;
  let numberOfTradesReusedMoney = 0;
  let lossAccumulated = 0;
  let winningTrades = 0;
  let buyTrades = 0;
  let sellTrades = 0;
  let loosingTrades = 0;
  let maxNewMoney = 15000;
  // let amountOfTimeInvested = 0;

  data.forEach((trade, index) => {
    if (trade.Type == "Entry Long") {
      buyTrades += 1;
      if (!stockTrades[trade.stockName]) {
        stockTrades[trade.stockName] = {};
        stockTrades[trade.stockName].remainingCorpus = 5000;
        stockTrades[trade.stockName].tradesTaken = 0;
      }

      if (cashInHandAfterTrade < stockTrades[trade.stockName].remainingCorpus) {
        newlyInvestedMoney +=
          stockTrades[trade.stockName].remainingCorpus - cashInHandAfterTrade;
        totalMoneyReused += cashInHandAfterTrade;
        cashInHandAfterTrade = 0;
      } else {
        cashInHandAfterTrade -= stockTrades[trade.stockName].remainingCorpus;
        totalMoneyReused += stockTrades[trade.stockName].remainingCorpus;
        numberOfTradesReusedMoney += 1;
      }
      currentInvestedAmount += stockTrades[trade.stockName].remainingCorpus;
      totalMoneyUsedForBuying += stockTrades[trade.stockName].remainingCorpus;
      stockTrades[trade.stockName].tradesTaken += 1;
      onGoingTrades += 1;
      stockTrades[trade.stockName].numberOfShares = parseInt(
        stockTrades[trade.stockName].remainingCorpus / trade.Price
      );
    } else if (trade.Type == "Exit Long") {
      sellTrades += 1;
      onGoingTrades -= 1;
      currentInvestedAmount -= stockTrades[trade.stockName].remainingCorpus;
      const profitOrLoss = parseInt(
        trade["Profit NONE"] * stockTrades[trade.stockName].numberOfShares
      );
      stockTrades[trade.stockName].remainingCorpus += profitOrLoss;
      stockTrades[trade.stockName].numberOfShares = 0;
      cashInHandAfterTrade += stockTrades[trade.stockName].remainingCorpus;
      profitAccumulated += profitOrLoss;
      if (profitOrLoss >= 0) {
        winningTrades += 1;
      } else {
        loosingTrades += 1;
      }
    }
    if (index + 1 == data.length) {
      console.log("currentInvestedAmount", currentInvestedAmount);
      console.log("profitAccumulated", profitAccumulated);
      console.log("stockTrades", stockTrades);
      console.log("newlyInvestedMoney", newlyInvestedMoney);
      console.log("totalMoneyUsedForBuying", totalMoneyUsedForBuying);
      console.log("numberOfTradesReusedMoney", numberOfTradesReusedMoney);
      console.log("totalMoneyReused", totalMoneyReused);
      console.log("total completed trades", sellTrades);
      console.log("total buy trades", buyTrades);
      console.log("winningTrades", winningTrades);
      console.log("loosingTrades", loosingTrades);
      console.log("cashInHandAfterTrade", cashInHandAfterTrade);
    }
  });
};
