import React, { useState } from "react";
import "./app.css";
import ReactImage from "./react.png";
import { analyzeDataWithoutMoneyLimit, analyzeDataWithMoneyLimitAndRegularAdditionOfMoneyWithExtraCash } from "./utils";
import { LineChartComponent } from "./LineChartComponent";
export default function LineChartContainerComponent({ indices, limitOfMoney=5000 }) {
  const username = "Shrikrishna";
  const [currentInvestedAmountArr, setcurrentInvestedAmountArr] = useState([]);
  const [profitAccumulatedArr, setprofitAccumulatedArr] = useState([]);
  const [newlyInvestedMoneyArr, setnewlyInvestedMoneyArr] = useState([]);
  const [totalMoneyUsedForBuyingArr, settotalMoneyUsedForBuyingArr] = useState(
    []
  );
  const [numberOfTradesReusedMoneyArr, setnumberOfTradesReusedMoneyArr] =
    useState([]);
  const [totalMoneyReusedArr, settotalMoneyReusedArr] = useState([]);
  const [winningTradesArr, setwinningTradesArr] = useState([]);
  const [loosingTradesArr, setloosingTradesArr] = useState([]);
  const [totalProfitArr, settotalProfitArr] = useState([]);
  const [onGoingTradesArr, setonGoingTradesArr] = useState([]);
  
  // totalLossArr;
  const [results,setResults] = useState({})
  const onBtnClick = () => {
    console.log("btn clickd");
    fetch("/api/getDataFromCSV/" + indices)
      .then((res) => res.json())
      .then((data) => {
        const dataReceived = analyzeDataWithMoneyLimitAndRegularAdditionOfMoneyWithExtraCash(data, limitOfMoney);
        setResults(dataReceived);
        setcurrentInvestedAmountArr(dataReceived.currentInvestedAmountArr);
        setprofitAccumulatedArr(dataReceived.profitAccumulatedArr);
        setnewlyInvestedMoneyArr(dataReceived.newlyInvestedMoneyArr);
        settotalMoneyUsedForBuyingArr(dataReceived.totalMoneyUsedForBuyingArr);
        setnumberOfTradesReusedMoneyArr(
          dataReceived.numberOfTradesReusedMoneyArr
        );
        settotalMoneyReusedArr(dataReceived.totalMoneyReusedArr);
        setwinningTradesArr(dataReceived.winningTradesArr);
        setloosingTradesArr(dataReceived.loosingTradesArr);
        settotalProfitArr(dataReceived.totalProfitArr);
        // settotalLossArr(dataReceived.totalLossArr);
        setonGoingTradesArr(dataReceived.onGoingTradesArr);
      });
  };

  return (
    <div>
      <button onClick={onBtnClick}>Analyze {indices}</button>
      <div className="tableDiv">
          <table border={1}>
              <tr><td>current Invested Amount</td><td>{results.currentInvestedAmount}</td></tr>
              <tr><td>profit Accumulated</td><td>{results.profitAccumulated}</td></tr>
              <tr><td>newly Invested Money</td><td>{results.newlyInvestedMoney}</td></tr>
              <tr><td>profit Percentage</td><td>{results.profitPercentage}</td></tr>
              <tr><td>total Money Used For Buying</td><td>{results.totalMoneyUsedForBuying}</td></tr>
              <tr><td>number Of Trades Reused Money</td><td>{results.numberOfTradesReusedMoney}</td></tr>
              <tr><td>total Money Reused</td><td>{results.totalMoneyReused}</td></tr>
              <tr><td>winning Trades</td><td>{results.winningTrades}</td></tr>
              <tr><td>loosing Trades</td><td>{results.loosingTrades}</td></tr>
              <tr><td>total Profit</td><td>{results.totalProfit}</td></tr>
              <tr><td>total Loss</td><td>{results.totalLoss}</td></tr>            
              <tr><td>on Going Trades</td><td>{results.onGoingTrades}</td></tr>            
          </table>
      </div>
      <div className="allGraphsContainerDiv">
        <LineChartComponent
          data={currentInvestedAmountArr}
          label="current Invested Amount"
        ></LineChartComponent>
        <LineChartComponent
          data={newlyInvestedMoneyArr}
          label="newly Invested Money"
        ></LineChartComponent>
        <LineChartComponent
          data={totalMoneyUsedForBuyingArr}
          label="total Money Used For Buying"
        ></LineChartComponent>
        <LineChartComponent
          data={totalMoneyReusedArr}
          label="total Money Reused"
        ></LineChartComponent>
        <LineChartComponent
          data={numberOfTradesReusedMoneyArr}
          label="number Of Trades Reused Money"
        ></LineChartComponent>
        <LineChartComponent
          data={onGoingTradesArr}
          label="on Going Trades"
        ></LineChartComponent>
        <LineChartComponent
          data={winningTradesArr}
          label="winning Trades"
        ></LineChartComponent>
        <LineChartComponent
          data={loosingTradesArr}
          label="loosing Trades"
        ></LineChartComponent>
        <LineChartComponent
          data={totalProfitArr}
          label="total Profit"
        ></LineChartComponent>
        <LineChartComponent
          data={profitAccumulatedArr}
          label="profit Accumulated"
        ></LineChartComponent>
      </div>
    </div>
  );
}
