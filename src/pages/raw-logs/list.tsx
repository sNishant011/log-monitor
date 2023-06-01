import React from "react";
import { IResourceComponentsProps, useCustom } from "@refinedev/core";
import { useTable, List } from "@refinedev/antd";
import { Button, Card, DatePicker, Divider, Form, Input, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export const RawLogList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, searchFormProps } = useTable({
    syncWithLocation: true,
  });

  const { data } = useCustom({
    url: "apache-logs/ip-addresses",
    method: "get",
  });
  console.log(data?.data);

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
      <Table {...tableProps} rowKey="id">
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
