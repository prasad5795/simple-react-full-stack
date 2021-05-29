import React, { useState } from "react";
import "./app.css";
import ReactImage from "./react.png";
import { analyzeDataWithoutMoneyLimit } from "./utils";
import { LineChartComponent } from "./LineChartComponent";
export default function App() {
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
  // totalLossArr;

  const onBtnClick = () => {
    console.log("btn clickd");
    fetch("/api/getDataFromCSV")
      .then((res) => res.json())
      .then((data) => {
        const dataReceived = analyzeDataWithoutMoneyLimit(data);
        console.log(dataReceived.currentInvestedAmountArr);
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
        settotalLossArr(dataReceived.totalLossArr);
      });
  };

  return (
    <div>
      {username ? (
        <h1>{`Hello ${username}`}</h1>
      ) : (
        <h1>Loading.. please wait!</h1>
      )}
      <button onClick={onBtnClick}>button</button>
      {currentInvestedAmountArr.length}
      <div className="allGraphsContainerDiv">
        <LineChartComponent
          data={currentInvestedAmountArr}
          label="currentInvestedAmountArr"
        ></LineChartComponent>

        <LineChartComponent
          data={newlyInvestedMoneyArr}
          label="newlyInvestedMoneyArr"
        ></LineChartComponent>
        <LineChartComponent
          data={totalMoneyUsedForBuyingArr}
          label="totalMoneyUsedForBuyingArr"
        ></LineChartComponent>
        <LineChartComponent
          data={totalMoneyReusedArr}
          label="totalMoneyReusedArr"
        ></LineChartComponent>
        <LineChartComponent
          data={numberOfTradesReusedMoneyArr}
          label="numberOfTradesReusedMoneyArr"
        ></LineChartComponent>
        <LineChartComponent
          data={numberOfTradesReusedMoneyArr}
          label="numberOfTradesReusedMoneyArr"
        ></LineChartComponent>
        <LineChartComponent
          data={winningTradesArr}
          label="winningTradesArr"
        ></LineChartComponent>
        <LineChartComponent
          data={loosingTradesArr}
          label="loosingTradesArr"
        ></LineChartComponent>
        <LineChartComponent
          data={totalProfitArr}
          label="totalProfitArr"
        ></LineChartComponent>
        <LineChartComponent
          data={profitAccumulatedArr}
          label="profitAccumulatedArr"
        ></LineChartComponent>
      </div>
    </div>
  );
}
