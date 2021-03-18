import React from "react";
import PropTypes from "prop-types";
import { PieChart as RechartPie, Pie, Cell } from "recharts";

const RADIAN = Math.PI / 180;
export const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      fontWeight="bold"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {percent * 100 > 1 && `${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChart = ({ data }) => {
  return (
    <RechartPie width={300} height={300}>
      <Pie
        data={data}
        cx="150"
        cy="150"
        labelLine={false}
        // label={renderCustomizedLabel}
        innerRadius={70}
        outerRadius={130}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </RechartPie>
  );
};

PieChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default PieChart;
