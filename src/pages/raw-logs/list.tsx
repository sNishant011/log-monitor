import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { useTable, List, DateField, MarkdownField, TagField } from "@refinedev/antd";
import { Table } from "antd";

export const RawLogList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
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

