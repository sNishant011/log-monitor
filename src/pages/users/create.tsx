import React from "react";
import { HttpError, IResourceComponentsProps, useCan } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { User } from "../../types";
import UserForm from "../../forms/UserForm";
import UnAuthorizedPage from "../../components/UnAuthorizedPage";

export const UserCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<User, HttpError, User>();

  const canAccess = useCan({
    resource: "user",
    action: "create",
  });

  if (canAccess.data && !canAccess.data?.can) {
    return <UnAuthorizedPage />;
  }
  return (
    <Create saveButtonProps={saveButtonProps}>
      <UserForm formProps={formProps} mode="create" />
    </Create>
  );
};
