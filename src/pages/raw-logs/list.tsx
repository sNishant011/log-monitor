import React from "react";
import { IResourceComponentsProps, useCan, useResource } from "@refinedev/core";
import { useTable, List } from "@refinedev/antd";
import { Button, Card, DatePicker, Divider, Form, Input, Result, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const RawLogList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, searchFormProps } = useTable({
    syncWithLocation: true,
  });

  const canAccessNginxLogs = useCan({
    resource: "nginx-logs",
    action: "list",
  }).data?.can;

  const canAccessApacheLogs = useCan({
    resource: "apache-logs",
    action: "list",
  }).data?.can;
  const s = useResource();
  const navigate = useNavigate();
  if (
    (s?.resource?.name === "nginx-logs" &&
      typeof canAccessNginxLogs !== "undefined" &&
      !canAccessNginxLogs) ||
    (s.resource?.name === "apache-logs" &&
      typeof canAccessNginxLogs !== "undefined" &&
      !canAccessApacheLogs)
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

  return (
    <List>
      <Card style={{ maxWidth: "400px" }}>
        <Form layout="vertical" {...searchFormProps}>
          <Form.Item label="Search" name="q">
            <Input placeholder="IP Address" prefix={<SearchOutlined />} />
          </Form.Item>
          <Form.Item label="Timestamp" name="timestamp">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Filter
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider />
      <Table {...tableProps} rowKey="_id">
        <Table.Column dataIndex="remote_ip" title="Remote IP" />
        <Table.Column dataIndex="timestamp" title="Timestamp" />
        <Table.Column dataIndex="http_method" title="Http Method" />
        <Table.Column dataIndex="bytes" title="Bytes" />
        <Table.Column dataIndex={["http_version"]} title="Http Version" />
        <Table.Column dataIndex="request_path" title="Request Path" />
        <Table.Column dataIndex="response_code" title="Response Code" />
        <Table.Column dataIndex={["event", "original"]} title="Raw" />
      </Table>
    </List>
  );
};
