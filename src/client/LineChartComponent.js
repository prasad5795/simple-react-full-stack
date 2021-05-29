import React from "react";
import "./app.css";
import {
  BarChart,
  LineChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const dateFormatter = (item) => new Date(item).toLocaleDateString();

export const LineChartComponent = ({ data, label }) => {
  console.log("LineChartComponent", data);
  return (
    <div className="graphDiv">
      <h3>{label}</h3>
      <ResponsiveContainer width="100%" height={300}>
        {/* <BarChart data={data}>
          <XAxis dataKey="time" tickFormatter={dateFormatter} />
          <YAxis />
          <Tooltip labelFormatter={dateFormatter} />
          <Bar dataKey="value" fill="rgba(106, 110, 229)" />
          <Line dataKey="totaltrades" />
        </BarChart> */}
        <LineChart data={data}>
          <XAxis dataKey="time" tickFormatter={dateFormatter} />
          <YAxis />
          <Tooltip labelFormatter={dateFormatter} />
          <Line dataKey="value" fill="red" />
          <Line dataKey="totaltrades" fill="green" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
