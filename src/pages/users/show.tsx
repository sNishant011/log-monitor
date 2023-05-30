import React from "react";
import { HttpError, IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, TagField, EmailField, TextField } from "@refinedev/antd";
import { Typography } from "antd";
import { User } from "../../types";

const { Title } = Typography;

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<User, HttpError, User>();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <TextField value={record?._id} />
      <Title level={5}>Email</Title>
      <EmailField value={record?.email} />
      <Title level={5}>Role</Title>
      <TagField
        value={record?.role}
        color={record?.role === "admin" ? "blue" : "orange"}
      />
    </Show>
  );
};
