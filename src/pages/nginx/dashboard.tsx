import { Button, Card, Col, Divider, Result, Row, Spin, Statistic } from "antd";
import { Link, useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { HttpError, useCan, useCustom, useResource } from "@refinedev/core";
import { prettyResponse } from "../../types";
import PieChart from "../../components/visualizations/PieChart";
import BarChart from "../../components/visualizations/BarChart";
import Title from "antd/es/typography/Title";
import LineGraph from "../../components/visualizations/LineGraph";
import { valueType } from "antd/es/statistic/utils";
import { dashboardHeaderStyle } from "../../utils";

export const NginxDashboard = () => {
  const Formatter = (value: valueType): React.ReactNode => (
    <CountUp end={parseInt(value as string)} separator="," />
  );
  const { data } = useCustom<prettyResponse, HttpError>({
    method: "get",
    url: `nginx-logs/pretty`,
  });

  const canAccessNginxLogs = useCan({
    resource: "nginx-dashboard",
    action: "list",
  }).data?.can;

  const s = useResource();
  const navigate = useNavigate();
  if (
    s?.resource?.name === "nginx-dashboard" &&
    typeof canAccessNginxLogs !== "undefined" &&
    !canAccessNginxLogs
  ) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back Home
          </Button>
        }
      />
    );
  }

  if (!data?.data) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <div style={dashboardHeaderStyle}>
        <Title>Nginx Logs</Title>
        <Link to={`/logs/nginx/raw`}>View Raw</Link>
      </div>
      <Row gutter={16} style={{ maxWidth: "600px" }}>
        <Col span={24} md={12}>
          <Card bordered={false}>
            <Statistic
              title="Total Events"
              value={data.data.count}
              formatter={Formatter}
            />
          </Card>
        </Col>
        <Col span={24} md={12}>
          <Card bordered={false}>
            <Statistic
              title="Unique IP Address"
              value={data.data.uniqueIPCount}
              precision={2}
              formatter={Formatter}
            />
          </Card>
        </Col>
      </Row>
      <Divider />
      <Title level={3}>Most common IP Address</Title>
      <Row gutter={16}>
        <Col span={24} md={12}>
          <Card bordered={false}>
            <PieChart data={data?.data.mostCommonIP} title={"IP Address"} />
          </Card>
        </Col>
        <Col span={24} md={12}>
          <Card bordered={false}>
            <BarChart
              data={data?.data.mostCommonIP}
              title={"IP Address"}
              xLabel={"IPs"}
            />
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
            <BarChart data={data?.data.mostCommonHTTPMethod} xLabel={"HTTP Methods"} />
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
