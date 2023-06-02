import React from "react";
import dayjs from "../../utils/dayjs";
import {
  HttpError,
  IResourceComponentsProps,
  LogicalFilter,
  useCan,
  useResource,
} from "@refinedev/core";
import { useTable, List } from "@refinedev/antd";
import {
  Button,
  Card,
  DatePicker,
  DatePickerProps,
  Divider,
  Form,
  Input,
  Result,
  Table,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { LogDocument } from "../../types";

export const NginxLogList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, searchFormProps, filters } = useTable<
    LogDocument,
    HttpError,
    {
      ipAddress: string;
      timestamp: DatePickerProps["value"];
    }
  >({
    onSearch: (params) => {
      console.log(params);
      const filters: LogicalFilter[] = [];
      const { timestamp, ipAddress } = params;
      filters.push({
        field: "ipAddress",
        operator: "eq",
        value: ipAddress,
      });
      filters.push({
        field: "date",
        operator: "eq",
        value: timestamp?.format("DD/MMM/YYYY:HH:mm"),
      });
      return filters;
    },
  });

  const prevTime = (filters as LogicalFilter[]).find(
    (filter) => filter.field === "date",
  )?.value;
  const initialFilterFormValues = {
    ipAddress: (filters as LogicalFilter[]).find((filter) => filter.field === "ipAddress")
      ?.value,
    timestamp: prevTime ? dayjs(prevTime, "DD/MMM/YYYY:HH:mm") : undefined,
  };
  searchFormProps.initialValues = initialFilterFormValues;
  const canAccessNginxLogs = useCan({
    resource: "nginx-logs",
    action: "list",
  }).data?.can;
  const s = useResource();
  const navigate = useNavigate();
  if (
    s.resource?.name === "nginx-logs" &&
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
  return (
    <List>
      <Card style={{ maxWidth: "400px" }}>
        <Form layout="vertical" {...searchFormProps}>
          <Form.Item label="Search" name="ipAddress">
            <Input placeholder="IP Address" prefix={<SearchOutlined />} />
          </Form.Item>
          <Form.Item label="Timestamp" name="timestamp">
            <DatePicker
              showTime={true}
              format={"YYYY-MM-DD HH:mm"}
              style={{ width: "100%" }}
            />
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

