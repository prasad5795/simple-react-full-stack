import React, { useState } from "react";
import "./app.css";
import ReactImage from "./react.png";
import { analyzeDataWithoutMoneyLimit } from "./utils";
import { LineChartComponent } from "./LineChartComponent";
import LineChartContainerComponent from "./LineChartContainerComponent";
export default function App() {
  const username = "Shrikrishna";
  const [limitOfMoney,setlimitOfMoney] = useState(5000);
  const onChangeLimit = (e) => {
    console.log("e",e.target.value);
    setlimitOfMoney(Number(e.target.value))
  }
  return (
    <div>
      {username ? (
        <h1>{`Hello ${username}`}</h1>
      ) : (
        <h1>Loading.. please wait!</h1>
      )}
      <input onChange={onChangeLimit} value={limitOfMoney}/>
      <hr/>      <hr/>      <hr/>
      <LineChartContainerComponent indices="nifty50" limitOfMoney={limitOfMoney}></LineChartContainerComponent>
      <hr/>      <hr/>      <hr/>
      <LineChartContainerComponent indices="niftyNext50" limitOfMoney={limitOfMoney}></LineChartContainerComponent>
      <hr/>      <hr/>      <hr/>
      <LineChartContainerComponent indices="niftyMidcap50" limitOfMoney={limitOfMoney}></LineChartContainerComponent>
      <hr/>      <hr/>      <hr/>
      <LineChartContainerComponent indices="niftySmallcap50" limitOfMoney={limitOfMoney}></LineChartContainerComponent>
    </div>
  );
}
