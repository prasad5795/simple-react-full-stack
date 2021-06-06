import React, { useState } from "react";
import "./app.css";
import ReactImage from "./react.png";
import {
  analyzeDataWithoutMoneyLimit,
  analyzeDataWithMoneyLimit,
  groupByMonthAndYear,
  analyzeDataWithMoneyLimitAndRegularAdditionOfMoneyWithExtraCash,
} from "./utils";
import { LineChartComponent } from "./LineChartComponent";
import { JsonToTable } from "react-json-to-table";
// import { JSONToHTMLTable } from "@kevincobain2000/json-to-html-table";
export default function LineChartContainerComponent({
  indices,
  limitOfMoney = 5000,
  startDate,
  endDate
}) {
  const username = "Shrikrishna";
  const [results, setResults] = useState({});
  const [summary, setSummary] = useState({});
  const [stockwiseSummary, setStockwiseSummary] = useState([])
  const onBtnClick = () => {
    console.log("btn clickd");
    fetch("/api/getDataFromCSV/" + indices)
      .then((res) => res.json())
      .then((data) => {
        const dataReceived =
          analyzeDataWithMoneyLimitAndRegularAdditionOfMoneyWithExtraCash(
            data,
            limitOfMoney,
            startDate,
            endDate
          );
        setResults(groupByMonthAndYear(dataReceived.dataWithAdditionalInfo));
        console.log(dataReceived);
        const {
          currentInvestedAmount,
          profitAccumulated,
          newlyInvestedMoney,
          totalMoneyUsedForBuying,
          numberOfTradesReusedMoney,
          totalMoneyReused,
          winningTrades,
          loosingTrades,
          totalProfit,
          profitPercentage,
          totalLoss,
          cashInHandAfterTrade,
          stockTrades,
        } = dataReceived;
        setSummary({
          currentInvestedAmount,
          profitAccumulated,
          cashInHandAfterTrade,
          newlyInvestedMoney,
          totalMoneyUsedForBuying,
          numberOfTradesReusedMoney,
          totalMoneyReused,
          winningTrades,
          loosingTrades,
          totalProfit,
          profitPercentage,
          totalLoss,
        });
        let tempStockwiseSummary = Object.values(stockTrades);
        setStockwiseSummary(tempStockwiseSummary.map(stockwiseSummary=>{
            delete stockwiseSummary["buyTimestamp"]
            delete stockwiseSummary["buyPrice"]
            delete stockwiseSummary["sellTimestamp"]
            delete stockwiseSummary["totalTimeInvested"]
            return stockwiseSummary
            // delete stockwiseSummary[""]
            // delete stockwiseSummary[""]
            // delete stockwiseSummary[""]
        }))
      });
  };

  return (
    <div className="tradesDetailsDiv">
      <button onClick={onBtnClick}>Analyze {indices}</button>
      <div style={{ width: "30%", margin: "auto" }}>
        <JsonToTable json={summary}></JsonToTable>
      </div>

      <div>
        <JsonToTable json={stockwiseSummary}></JsonToTable>
      </div>
      {/* <div>
        <JsonToTable json={results}></JsonToTable>
      </div> */}
    </div>
  );
}
