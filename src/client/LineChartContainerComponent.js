import React, { useState } from "react";
import "./app.css";
import ReactImage from "./react.png";
import { analyzeDataWithoutMoneyLimit } from "./utils";
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
        const dataReceived = analyzeDataWithoutMoneyLimit(data, limitOfMoney);
        console.log(dataReceived);
        // const {currentInvestedAmount,
        //     profitAccumulated,
        //     newlyInvestedMoney,
        //     totalMoneyUsedForBuying,
        //     numberOfTradesReusedMoney,
        //     totalMoneyReused,
        //     winningTrades,
        //     loosingTrades,
        //     totalProfit,
        //     totalLoss,
        //     onGoingTrades} = dataReceived
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
      <div>
          <table>
              <tr><td>currentInvestedAmount</td><td>{results.currentInvestedAmount}</td></tr>
              <tr><td>profitAccumulated</td><td>{results.profitAccumulated}</td></tr>
              <tr><td>newlyInvestedMoney</td><td>{results.newlyInvestedMoney}</td></tr>
              <tr><td>profitPercentage</td><td>{results.profitPercentage}</td></tr>
              <tr><td>totalMoneyUsedForBuying</td><td>{results.totalMoneyUsedForBuying}</td></tr>
              <tr><td>numberOfTradesReusedMoney</td><td>{results.numberOfTradesReusedMoney}</td></tr>
              <tr><td>totalMoneyReused</td><td>{results.totalMoneyReused}</td></tr>
              <tr><td>winningTrades</td><td>{results.winningTrades}</td></tr>
              <tr><td>loosingTrades</td><td>{results.loosingTrades}</td></tr>
              <tr><td>totalProfit</td><td>{results.totalProfit}</td></tr>
              <tr><td>totalLoss</td><td>{results.totalLoss}</td></tr>            
              <tr><td>onGoingTrades</td><td>{results.onGoingTrades}</td></tr>            
          </table>
      </div>
      <div className="allGraphsContainerDiv">
        <LineChartComponent
          data={currentInvestedAmountArr}
          label="currentInvestedAmount"
        ></LineChartComponent>
        <LineChartComponent
          data={newlyInvestedMoneyArr}
          label="newlyInvestedMoney"
        ></LineChartComponent>
        <LineChartComponent
          data={totalMoneyUsedForBuyingArr}
          label="totalMoneyUsedForBuying"
        ></LineChartComponent>
        <LineChartComponent
          data={totalMoneyReusedArr}
          label="totalMoneyReused"
        ></LineChartComponent>
        <LineChartComponent
          data={numberOfTradesReusedMoneyArr}
          label="numberOfTradesReusedMoney"
        ></LineChartComponent>
        <LineChartComponent
          data={onGoingTradesArr}
          label="onGoingTradesArr"
        ></LineChartComponent>
        <LineChartComponent
          data={winningTradesArr}
          label="winningTrades"
        ></LineChartComponent>
        <LineChartComponent
          data={loosingTradesArr}
          label="loosingTrades"
        ></LineChartComponent>
        <LineChartComponent
          data={totalProfitArr}
          label="totalProfit"
        ></LineChartComponent>
        <LineChartComponent
          data={profitAccumulatedArr}
          label="profitAccumulated"
        ></LineChartComponent>
        
      </div>
      
    </div>
  );
}
