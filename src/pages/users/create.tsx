import React from "react";
import { HttpError, IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { User } from "../../types";
import UserForm from "../../forms/UserForm";

export const UserCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<User, HttpError, User>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <UserForm formProps={formProps} mode="create" />
    </Create>
  );
};
