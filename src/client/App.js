import React, { useState } from "react";
import "./app.css";
import ReactImage from "./react.png";
import { analyzeDataWithoutMoneyLimit } from "./utils";
import { LineChartComponent } from "./LineChartComponent";
import TableContainerComponent from "./TableContainerComponent";
import LineChartContainerComponent from "./LineChartContainerComponent";
export default function App() {
  const username = "Shrikrishna";
  const [limitOfMoney, setlimitOfMoney] = useState(5000);
  const [graphViewEnabled, setGraphViewEnabled] = useState(false);
  const onChangeLimit = (e) => {
    console.log("e", e.target.value);
    setlimitOfMoney(Number(e.target.value));
  };
  const onBtnClick = (e) => {
    setGraphViewEnabled(!graphViewEnabled);
  };
  return (
    <div>
      {username ? (
        <h1>{`Hello ${username}`}</h1>
      ) : (
        <h1>Loading.. please wait!</h1>
      )}
      Limit Of MONEYY
      <input onChange={onChangeLimit} value={limitOfMoney} />
      <hr /> <hr /> <hr />
      <button onClick={onBtnClick}>Switch View</button>
      {graphViewEnabled ? (
        <div>
          <LineChartContainerComponent
            indices="nifty50"
            limitOfMoney={limitOfMoney}
          ></LineChartContainerComponent>
          <hr /> <hr /> <hr />
          <LineChartContainerComponent
            indices="niftyNext50"
            limitOfMoney={limitOfMoney}
          ></LineChartContainerComponent>
          <hr /> <hr /> <hr />
          <LineChartContainerComponent
            indices="niftyMidcap50"
            limitOfMoney={limitOfMoney}
          ></LineChartContainerComponent>
          <hr /> <hr /> <hr />
          <LineChartContainerComponent
            indices="niftySmallcap50"
            limitOfMoney={limitOfMoney}
          ></LineChartContainerComponent>
        </div>
      ) : (
        <div>
          <TableContainerComponent
            indices="nifty50"
            limitOfMoney={limitOfMoney}
          ></TableContainerComponent>
          <hr /> <hr /> <hr />
          <TableContainerComponent
            indices="niftyNext50"
            limitOfMoney={limitOfMoney}
          ></TableContainerComponent>
          <hr /> <hr /> <hr />
          <TableContainerComponent
            indices="niftyMidcap50"
            limitOfMoney={limitOfMoney}
          ></TableContainerComponent>
          <hr /> <hr /> <hr />
          <TableContainerComponent
            indices="niftySmallcap50"
            limitOfMoney={limitOfMoney}
          ></TableContainerComponent>
        </div>
      )}
    </div>
  );
}
