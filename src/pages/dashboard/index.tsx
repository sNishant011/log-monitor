import { Card, Col, Divider, Row, Spin, Statistic } from "antd";
import { Navigate, useParams } from "react-router-dom";
import CountUp from "react-countup";
import { HttpError, useCustom } from "@refinedev/core";
import { prettyResponse } from "../../types";
import PieChart from "../../components/visualizations/PieChart";
import BarChart from "../../components/visualizations/BarChart";
import Title from "antd/es/typography/Title";
import LineGraph from "../../components/visualizations/LineGraph";

const formatter = (value: number) => <CountUp end={value} separator="," />;

export const Dashboard = () => {
  const { serverType } = useParams();
  const { data } = useCustom<prettyResponse, HttpError>({
    method: "get",
    url: "apache-logs/pretty",
  });
  if (serverType && serverType !== "nginx" && serverType !== "apache") {
    return <Navigate to={"/404"} />;
  }
  if (!data?.data) {
    return <Spin size="large" />;
  }
  return (
    <div className="dashboard">
      <Title>{serverType === "apache" ? "Apache Logs" : "Nginx Logs"}</Title>
      <Row gutter={16} style={{ maxWidth: "600px" }}>
        <Col span={24} md={12}>
          <Card bordered={false}>
            <Statistic
              title="Total Events"
              value={data.data.count}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={24} md={12}>
          <Card bordered={false}>
            <Statistic
              title="Unique IP Address"
              value={data.data.uniqueIPCount}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>
      <Divider />
      <Title level={3}>IP Address</Title>
      <Row gutter={16}>
        <Col span={24} md={12}>
          <Card bordered={false}>
            <PieChart data={data?.data.mostCommonIP.slice(0, 6)} title={"IP Address"} />
          </Card>
        </Col>
        <Col span={24} md={12}>
          <Card bordered={false}>
            <BarChart data={data?.data.mostCommonIP} title={"IP Address"} />
          </Card>
        </Col>
      </Row>
      <Divider />
      <Title level={3}>Request Methods</Title>
      <Row gutter={16}>
        <Col span={24} md={12}>
          <Card bordered={false}>
            <PieChart data={data?.data.mostCommonHTTPMethod} />
          </Card>
        </Col>
        <Col span={24} md={12}>
          <Card bordered={false}>
            <BarChart data={data?.data.mostCommonHTTPMethod} />
          </Card>
        </Col>
      </Row>
      <Divider />
      <Title level={3}>Number of Events</Title>
      <Divider />
      <Title level={5}>Time</Title>
      <Row gutter={16}>
        <Col span={24} md={12}>
          <Card bordered={false}>
            <BarChart data={data?.data.requestByTime} />
          </Card>
        </Col>
        <Col span={24} md={12}>
          <Card bordered={false}>
            <LineGraph data={data?.data.requestByTime} />
          </Card>
        </Col>
      </Row>
      <Divider />
      <Title level={5}>Status Code</Title>
      <Row gutter={16}>
        <Col span={24} md={12}>
          <Card bordered={false}>
            <BarChart data={data?.data.requestCountByStatus} xLabel={"HTTP Status"} />
          </Card>
        </Col>
      </Row>

      <Divider />
      <Title level={5}>Payload Size</Title>
      <Row gutter={16}>
        <Col span={24} md={12}>
          <Card bordered={false}>
            <BarChart
              data={data?.data.requestCountByResponseSize}
              xLabel={"Response size in bytes"}
            />
          </Card>
        </Col>
        <Col span={24} md={12}>
          <Card bordered={false}>
            <PieChart data={data?.data.requestCountByResponseSize} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
