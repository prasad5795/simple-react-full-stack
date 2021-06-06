export const analyzeDataWithoutMoneyLimit = (data, limitOfMoney) => {
  let moneyThreshold = limitOfMoney;
  let stockTrades = {};
  let currentInvestedAmount = 0;
  let currentInvestedAmountArr = [];
  let onGoingTrades = 0;
  let onGoingTradesArr = [];
  let profitAccumulated = 0;
  let profitAccumulatedArr = [];
  let cashInHandAfterTrade = 0;
  let cashInHandAfterTradeArr = [];
  let newlyInvestedMoney = 0;
  let newlyInvestedMoneyForThisTrade = 0;
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
    if (trade.Type == "Entry Long" && trade.Price < moneyThreshold) {
      buyTrades += 1;
      timestamps.push(trade.timeStamp);
      if (!stockTrades[trade.stockName]) {
        stockTrades[trade.stockName] = {};
        stockTrades[trade.stockName].remainingCorpus = moneyThreshold;
        //   trade.Price > moneyThreshold ? trade.Price : moneyThreshold;
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
          newlyInvestedMoneyForThisTrade = 0;
        } else {
          newlyInvestedMoney += trade.Price - cashInHandAfterTrade;
          newlyInvestedMoneyForThisTrade = trade.Price - cashInHandAfterTrade;
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
          newlyInvestedMoneyForThisTrade = 0;
        } else {
          newlyInvestedMoney +=
            stockTrades[trade.stockName].remainingCorpus - cashInHandAfterTrade;
          newlyInvestedMoneyForThisTrade =
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
        onGoingTradesArr,
        currentInvestedAmount,
        profitAccumulated,
        newlyInvestedMoney,
        totalMoneyUsedForBuying,
        numberOfTradesReusedMoney,
        totalMoneyReused,
        winningTrades,
        loosingTrades,
        totalProfit,
        profitPercentage: parseInt(
          (profitAccumulated * 100) / newlyInvestedMoney
        ),
        totalLoss,
        onGoingTrades,
        stockTrades,
        dataWithAdditionalInfo: data,
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
        // value: newlyInvestedMoney,
        value: newlyInvestedMoneyForThisTrade,
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
      onGoingTradesArr.push({
        time: trade.timeStamp,
        totaltrades: sellTrades,
        value: onGoingTrades,
      });
      cashInHandAfterTradeArr.push({
        time: trade.timeStamp,
        totaltrades: sellTrades,
        value: cashInHandAfterTrade,
      });
      trade.newlyInvestedMoneyForThisTrade = newlyInvestedMoneyForThisTrade;
      trade.cashInHandAfterTrader = cashInHandAfterTrade;
      data[k] = trade;
    }
  }
};

export const groupByMonthAndYear = (data) => {
  let tradesGroupByMonthAndYear = {};
  for (let i = 0; i < data.length; i++) {
    let trade = data[i];
    let dateTime = trade["Date/Time"];
    let year = dateTime.split("-")[0];
    let month = dateTime.split("-")[1];
    if (!tradesGroupByMonthAndYear[month + "-" + year]) {
      tradesGroupByMonthAndYear[month + "-" + year] = [];
    }
    tradesGroupByMonthAndYear[month + "-" + year].push(trade);
  }
  return tradesGroupByMonthAndYear;
};

export const analyzeDataWithMoneyLimit = (data, limitOfMoney) => {
  let moneyThreshold = limitOfMoney;
  let stockTrades = {};
  let currentInvestedAmount = 0;
  let currentInvestedAmountArr = [];
  let onGoingTrades = 0;
  let onGoingTradesArr = [];
  let profitAccumulated = 0;
  let profitAccumulatedArr = [];
  let cashInHandAfterTrade = 0;
  let cashInHandAfterTradeArr = [];
  let newlyInvestedMoney = 0;
  let newlyInvestedMoneyForThisTrade = 0;
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
  let currentMonthYear = "";
  let monthlyBugdet = 15000;
  let currentRemainingMoneyForCurrentMonth = 0;
  for (let k = 0; k < data.length; k++) {
    const trade = data[k];
    const index = k;
    //logic to find new month is started and depending on bugdet of month decide whether to take that trade
    let dateTime = trade["Date/Time"].split("-");
    let monthYear = dateTime[1] + dateTime[0];
    // console.log(currentMonthYear,monthYear);
    if (monthYear !== currentMonthYear) {
      // console.log("new month is started");
      currentRemainingMoneyForCurrentMonth = monthlyBugdet;
      currentMonthYear = monthYear;
    } else {
      // console.log("money remaining of current month",currentRemainingMoneyForCurrentMonth);
      if (trade.Type == "Entry Long") {
        trade.taken = false;
      }
    }
    if (
      trade.Type == "Entry Long" &&
      trade.Price < moneyThreshold &&
      currentRemainingMoneyForCurrentMonth > 0
    ) {
      // console.log("money remaining of current month",currentRemainingMoneyForCurrentMonth);
      trade.taken = true;
      buyTrades += 1;
      timestamps.push(trade.timeStamp);
      if (!stockTrades[trade.stockName]) {
        stockTrades[trade.stockName] = {};
        stockTrades[trade.stockName].remainingCorpus = moneyThreshold;
        //   trade.Price > moneyThreshold ? trade.Price : moneyThreshold;
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
          newlyInvestedMoneyForThisTrade = 0;
        } else {
          newlyInvestedMoney += trade.Price - cashInHandAfterTrade;
          newlyInvestedMoneyForThisTrade = trade.Price - cashInHandAfterTrade;
          currentRemainingMoneyForCurrentMonth -=
            newlyInvestedMoneyForThisTrade;
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
          newlyInvestedMoneyForThisTrade = 0;
        } else {
          newlyInvestedMoney +=
            stockTrades[trade.stockName].remainingCorpus - cashInHandAfterTrade;
          newlyInvestedMoneyForThisTrade =
            stockTrades[trade.stockName].remainingCorpus - cashInHandAfterTrade;
          currentRemainingMoneyForCurrentMonth -=
            newlyInvestedMoneyForThisTrade;
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
      trade.taken = true;
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
        onGoingTradesArr,
        currentInvestedAmount,
        profitAccumulated,
        newlyInvestedMoney,
        totalMoneyUsedForBuying,
        numberOfTradesReusedMoney,
        totalMoneyReused,
        winningTrades,
        loosingTrades,
        totalProfit,
        profitPercentage: parseInt(
          (profitAccumulated * 100) / newlyInvestedMoney
        ),
        totalLoss,
        onGoingTrades,
        stockTrades,
        dataWithAdditionalInfo: data.filter((trade1) => trade1.taken),
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
        // value: newlyInvestedMoney,
        value: newlyInvestedMoneyForThisTrade,
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
      onGoingTradesArr.push({
        time: trade.timeStamp,
        totaltrades: sellTrades,
        value: onGoingTrades,
      });
      cashInHandAfterTradeArr.push({
        time: trade.timeStamp,
        totaltrades: sellTrades,
        value: cashInHandAfterTrade,
      });
      trade.newlyInvestedMoneyForThisTrade = newlyInvestedMoneyForThisTrade;
      trade.cashInHandAfterTrader = cashInHandAfterTrade;
      data[k] = trade;
    }
  }
};

export const analyzeDataWithMoneyLimitAndRegularAdditionOfMoneyWithExtraCash = (
  data,
  limitOfMoney,
  startDate = 1,
  endDate = new Date().valueOf()
) => {
  let moneyThreshold = limitOfMoney;
  let stockTrades = {};
  let currentInvestedAmount = 0;
  let currentInvestedAmountArr = [];
  let onGoingTrades = 0;
  let onGoingTradesArr = [];
  let profitAccumulated = 0;
  let profitAccumulatedArr = [];
  let cashInHandAfterTrade = 0;
  let cashInHandAfterTradeArr = [];
  let newlyInvestedMoney = 0;
  let newlyInvestedMoneyForThisTrade = 0;
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
  let currentMonthYear = "";
  let monthlyBugdet = 15000;
  let currentRemainingMoneyForCurrentMonth = 0;
  for (let k = 0; k < data.length; k++) {
    const trade = data[k];
    const index = k;
    //logic to find new month is started and depending on bugdet of month decide whether to take that trade
    let dateTime = trade["Date/Time"].split("-");
    let monthYear = dateTime[1] + dateTime[0];
    // console.log(currentMonthYear,monthYear);
    if (monthYear !== currentMonthYear) {
      // console.log("new month is started");
      currentRemainingMoneyForCurrentMonth = monthlyBugdet;
      currentMonthYear = monthYear;
    } else {
      // console.log("money remaining of current month",currentRemainingMoneyForCurrentMonth);
      if (trade.Type == "Entry Long") {
        trade.taken = false;
      }
    }
    if (
      trade.Type == "Entry Long" &&
      trade.Price < moneyThreshold &&
      currentRemainingMoneyForCurrentMonth > 0 &&
      trade.timeStamp >= startDate &&
      trade.timeStamp <= endDate
    ) {
      // console.log("money remaining of current month",currentRemainingMoneyForCurrentMonth);
      trade.taken = true;
      buyTrades += 1;
      timestamps.push(trade.timeStamp);
      if (!stockTrades[trade.stockName]) {
        stockTrades[trade.stockName] = {};
        stockTrades[trade.stockName].remainingCorpus = moneyThreshold;
        //   trade.Price > moneyThreshold ? trade.Price : moneyThreshold;
        stockTrades[trade.stockName].tradesTaken = 0;
        stockTrades[trade.stockName].buyTimestamp = trade.timeStamp;
        stockTrades[trade.stockName].stockName = trade.stockName;
        stockTrades[trade.stockName].totalTimeInvested = 0;
        stockTrades[trade.stockName].winningTrades = 0;
        stockTrades[trade.stockName].loosingTrades = 0;
        stockTrades[trade.stockName].stockName = trade.stockName;
      }

      if (trade.Price > stockTrades[trade.stockName].remainingCorpus) {
        if (cashInHandAfterTrade >= trade.Price) {
          const newAmtToBeSpent =
            cashInHandAfterTrade / 2 + currentRemainingMoneyForCurrentMonth / 4;
          stockTrades[trade.stockName].numberOfShares = parseInt(
            newAmtToBeSpent / trade.Price
          );
          trade.numberOfShares = parseInt(newAmtToBeSpent / trade.Price);
          stockTrades[trade.stockName].remainingCorpus = newAmtToBeSpent;
          totalMoneyReused += cashInHandAfterTrade / 2;
          cashInHandAfterTrade -= cashInHandAfterTrade / 2;
          numberOfTradesReusedMoney += 1;
          newlyInvestedMoneyForThisTrade =
            currentRemainingMoneyForCurrentMonth / 4;
          currentRemainingMoneyForCurrentMonth -=
            currentRemainingMoneyForCurrentMonth / 4;
          newlyInvestedMoney += currentRemainingMoneyForCurrentMonth / 4;
        } else {
          if (
            currentRemainingMoneyForCurrentMonth >=
            trade.Price - cashInHandAfterTrade
          ) {
            newlyInvestedMoney += trade.Price - cashInHandAfterTrade;
            newlyInvestedMoneyForThisTrade = trade.Price - cashInHandAfterTrade;
            currentRemainingMoneyForCurrentMonth -=
              newlyInvestedMoneyForThisTrade;
            stockTrades[trade.stockName].numberOfShares = 1;
            trade.numberOfShares = 1;
            stockTrades[trade.stockName].remainingCorpus = trade.Price;
            if (cashInHandAfterTrade > 0) numberOfTradesReusedMoney += 1;
            totalMoneyReused += cashInHandAfterTrade;
            cashInHandAfterTrade = 0;
          } else {
            trade.taken = false;
            newlyInvestedMoneyForThisTrade = 0;
            stockTrades[trade.stockName].numberOfShares = 0;
          }
        }
      } else {
        if (
          cashInHandAfterTrade >= stockTrades[trade.stockName].remainingCorpus
        ) {
          const newAmtToBeSpent =
            cashInHandAfterTrade / 2 + currentRemainingMoneyForCurrentMonth / 4;
          stockTrades[trade.stockName].numberOfShares = parseInt(
            newAmtToBeSpent / trade.Price
          );
          trade.numberOfShares = parseInt(newAmtToBeSpent / trade.Price);
          stockTrades[trade.stockName].remainingCorpus = newAmtToBeSpent;
          totalMoneyReused += cashInHandAfterTrade / 2;
          cashInHandAfterTrade -= cashInHandAfterTrade / 2;
          numberOfTradesReusedMoney += 1;
          newlyInvestedMoneyForThisTrade =
            currentRemainingMoneyForCurrentMonth / 4;
          currentRemainingMoneyForCurrentMonth -=
            currentRemainingMoneyForCurrentMonth / 4;
          newlyInvestedMoney += currentRemainingMoneyForCurrentMonth / 4;
        } else {
          if (
            currentRemainingMoneyForCurrentMonth >=
            stockTrades[trade.stockName].remainingCorpus - cashInHandAfterTrade
          ) {
            newlyInvestedMoney +=
              stockTrades[trade.stockName].remainingCorpus -
              cashInHandAfterTrade;
            newlyInvestedMoneyForThisTrade =
              stockTrades[trade.stockName].remainingCorpus -
              cashInHandAfterTrade;
            currentRemainingMoneyForCurrentMonth -=
              newlyInvestedMoneyForThisTrade;
            stockTrades[trade.stockName].numberOfShares = parseInt(
              stockTrades[trade.stockName].remainingCorpus / trade.Price
            );
            trade.numberOfShares = parseInt(
              stockTrades[trade.stockName].remainingCorpus / trade.Price
            );
            if (cashInHandAfterTrade > 0) numberOfTradesReusedMoney += 1;
            totalMoneyReused += cashInHandAfterTrade;
            cashInHandAfterTrade = 0;
          } else {
            trade.taken = false;
            newlyInvestedMoneyForThisTrade = 0;
            stockTrades[trade.stockName].numberOfShares = 0;
          }
        }
      }
      if (trade.taken) {
        stockTrades[trade.stockName].buyPrice = trade.Price;
        currentInvestedAmount +=
          stockTrades[trade.stockName].numberOfShares *
          stockTrades[trade.stockName].buyPrice;
        totalMoneyUsedForBuying += stockTrades[trade.stockName].remainingCorpus;
        stockTrades[trade.stockName].tradesTaken += 1;
        onGoingTrades += 1;
        console.log(
          currentInvestedAmount,
          stockTrades[trade.stockName].numberOfShares,
          stockTrades[trade.stockName].buyPrice
        );
        stockTrades[trade.stockName].onGoing = "Yes";
        trade.onGoing = stockTrades[trade.stockName].onGoing;
      }

      if (currentInvestedAmount > maxMoneyInvestedCurrently) {
        maxMoneyInvestedCurrently = currentInvestedAmount;
      }
    } else if (
      trade.Type == "Exit Long" &&
      stockTrades[trade.stockName] &&
      stockTrades[trade.stockName].numberOfShares &&
      trade.timeStamp >= startDate &&
      trade.timeStamp <= endDate
    ) {
      trade.taken = true;
      newlyInvestedMoneyForThisTrade = 0;
      console.log(
        "newlyInvestedMoneyForThisTrade is zero",
        newlyInvestedMoneyForThisTrade
      );
      timestamps.push(trade.timeStamp);
      sellTrades += 1;
      onGoingTrades -= 1;
      stockTrades[trade.stockName].onGoing = "No";
      trade.onGoing = stockTrades[trade.stockName].onGoing;
      currentInvestedAmount -=
        stockTrades[trade.stockName].numberOfShares *
        stockTrades[trade.stockName].buyPrice;
      console.log(
        currentInvestedAmount,
        stockTrades[trade.stockName].numberOfShares,
        stockTrades[trade.stockName].buyPrice
      );
      const profitOrLoss =
        parseInt(trade["Profit NONE"]) *
        stockTrades[trade.stockName].numberOfShares;
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
        cashInHandAfterTrade,
        totalMoneyUsedForBuyingArr,
        numberOfTradesReusedMoneyArr,
        totalMoneyReusedArr,
        winningTradesArr,
        loosingTradesArr,
        totalProfitArr,
        totalLossArr,
        onGoingTradesArr,
        currentInvestedAmount,
        profitAccumulated,
        newlyInvestedMoney,
        totalMoneyUsedForBuying,
        numberOfTradesReusedMoney,
        totalMoneyReused,
        winningTrades,
        loosingTrades,
        totalProfit,
        profitPercentage: parseInt(
          (profitAccumulated * 100) / newlyInvestedMoney
        ),
        totalLoss,
        onGoingTrades,
        stockTrades,
        dataWithAdditionalInfo: data.filter((trade1) => trade1.taken),
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
        // value: newlyInvestedMoney,
        value: newlyInvestedMoneyForThisTrade,
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
      onGoingTradesArr.push({
        time: trade.timeStamp,
        totaltrades: sellTrades,
        value: onGoingTrades,
      });
      cashInHandAfterTradeArr.push({
        time: trade.timeStamp,
        totaltrades: sellTrades,
        value: cashInHandAfterTrade,
      });
      trade.newlyInvestedMoneyForThisTrade = newlyInvestedMoneyForThisTrade;
      trade.cashInHandAfterTrader = cashInHandAfterTrade;
      data[k] = trade;
    }
  }
};
