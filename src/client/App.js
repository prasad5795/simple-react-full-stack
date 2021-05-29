import React, { Component } from "react";
import "./app.css";
import ReactImage from "./react.png";
import { analyzeDataWithoutMoneyLimit } from "./utils";

export default function App() {
  const username = "Shrikrishna";

  const onBtnClick = () => {
    console.log("btn clickd");
    fetch("/api/getDataFromCSV")
      .then((res) => res.json())
      .then((data) => {
        console.log("data received", data);
        analyzeDataWithoutMoneyLimit(data);
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
    </div>
  );
}
