import React from "react";
import { HttpError, IResourceComponentsProps, useCan } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { User } from "../../types";
import UserForm from "../../forms/UserForm";
import UnAuthorizedPage from "../../components/UnAuthorizedPage";

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<User, HttpError, User>();

  const canAccess = useCan({
    resource: "user",
    action: "list",
  });

  if (canAccess.data && !canAccess.data?.can) {
    return <UnAuthorizedPage />;
  }
  return (
    <Edit saveButtonProps={saveButtonProps}>
      <UserForm formProps={formProps} mode="edit" />
    </Edit>
  );
};
