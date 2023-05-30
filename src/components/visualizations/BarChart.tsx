import { Column } from "@ant-design/plots";
import { valueCount } from "../../types";

const BarChart = ({
  data,
  xLabel,
  yLabel,
}: {
  data: valueCount[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
}) => {
  return (
    <Column
      data={data}
      xField={"value"}
      yField={"count"}
      label={{
        position: "bottom",
        style: {
          fill: "$005dff",
        },
      }}
      yAxis={{
        title: {
          text: yLabel || "Count",
        },
      }}
      xAxis={{
        title: {
          text: xLabel || "Type",
        },
        label: {
          autoHide: true,
          autoRotate: false,
        },
      }}
    />
  );
};

export default BarChart;
