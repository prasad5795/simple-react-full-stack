export const analyzeDataWithoutMoneyLimit = (data) => {
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
    // let amountOfTimeInvested = 0;

    data.forEach((trade, index) => {
      if (trade.Type == "Entry Long") {
        buyTrades += 1;
        if (!stockTrades[trade.stockName]) {
          stockTrades[trade.stockName] = {};
          stockTrades[trade.stockName].remainingCorpus = 5000;
          stockTrades[trade.stockName].tradesTaken = 0;
        }

        if (
          cashInHandAfterTrade < stockTrades[trade.stockName].remainingCorpus
        ) {
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