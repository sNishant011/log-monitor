import { Line } from "@ant-design/plots";
import { valueCount } from "../../types";

const LineGraph = ({ data }: { data: valueCount[] }) => {
  return (
    <Line
      data={data}
      padding={"auto"}
      xField={"value"}
      yField={"count"}
      interactions={[
        {
          type: "pinch",
        },
      ]}
      xAxis={{
        title: {
          text: "Time",
        },
        tickCount: data.length,
      }}
      yAxis={{
        title: {
          text: "Event",
        },
      }}
    />
  );
};

export default LineGraph;
