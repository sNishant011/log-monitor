import React from "react";
import { HttpError, IResourceComponentsProps, useCan, useShow } from "@refinedev/core";
import { Show, TagField, EmailField, TextField } from "@refinedev/antd";
import { Typography } from "antd";
import { User } from "../../types";
import { getTagColor } from "../../utils";
import UnAuthorizedPage from "../../components/UnAuthorizedPage";

const { Title } = Typography;

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<User, HttpError, User>();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const canAccess = useCan({
    resource: "user",
    action: "show",
  });

  if (canAccess.data && !canAccess.data?.can) {
    return <UnAuthorizedPage />;
  }
  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <TextField value={record?._id} />
      <Title level={5}>Email</Title>
      <EmailField value={record?.email} />
      <Title level={5}>Role</Title>
      {record?.role && <TagField value={record?.role} color={getTagColor(record.role)} />}
    </Show>
  );
};
