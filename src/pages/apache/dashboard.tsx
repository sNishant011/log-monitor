import { Card, Col, Divider, Row, Spin, Statistic } from "antd";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { HttpError, useCan, useCustom, useResource } from "@refinedev/core";
import { prettyResponse } from "../../types";
import PieChart from "../../components/visualizations/PieChart";
import BarChart from "../../components/visualizations/BarChart";
import Title from "antd/es/typography/Title";
import LineGraph from "../../components/visualizations/LineGraph";
import { valueType } from "antd/es/statistic/utils";
import { dashboardHeaderStyle } from "../../utils";
import UnAuthorizedPage from "../../components/UnAuthorizedPage";

export const ApacheDashboard = () => {
  const Formatter = (value: valueType): React.ReactNode => (
    <CountUp end={parseInt(value as string)} separator="," />
  );
  const { data } = useCustom<prettyResponse, HttpError>({
    method: "get",
    url: `apache-logs/pretty`,
  });

  const canAccessApacheLogs = useCan({
    resource: "apache-dashboard",
    action: "list",
  }).data?.can;

  const s = useResource();
  if (
    s?.resource?.name === "apache-dashboard" &&
    typeof canAccessApacheLogs !== "undefined" &&
    !canAccessApacheLogs
  ) {
    return <UnAuthorizedPage />;
  }

  if (!data?.data) {
    return <Spin size="large" />;
  }

  return (
    <div className="dashboard">
      <div style={dashboardHeaderStyle}>
        <Title>Apache Logs</Title>
        <Link to={`/logs/apache/raw`}>View Raw</Link>
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
