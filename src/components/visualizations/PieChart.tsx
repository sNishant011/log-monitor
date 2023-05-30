import { Pie } from "@ant-design/plots";
import { valueCount } from "../../types";
import "./style.scss";

const PieChart = ({ data }: { data: valueCount[]; title?: string }) => {
  return (
    <Pie
      appendPadding={6}
      data={data}
      angleField="count"
      colorField="value"
      radius={0.8}
      legend={{
        position: "right",
      }}
      interactions={[
        {
          type: "element-active",
        },
      ]}
      label={{
        type: "inner",
        offset: "-30%",
        content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        style: {
          fontSize: 14,
          textAlign: "center",
        },
      }}
    />
  );
};

export default PieChart;
