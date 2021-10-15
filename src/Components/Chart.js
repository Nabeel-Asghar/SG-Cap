import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import React from "react";

function Chart(props) {
  const chartData = props.chartData;

  return (
    props.chartData && (
      <BarChart
        width={750}
        height={500}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        onMouseOver={(data) =>
          data && props.handleChartClick(data.activePayload[0])
        }
        style={{ margin: "0 auto" }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="results" fill="#338f4d" />
      </BarChart>
    )
  );
}

export default Chart;
