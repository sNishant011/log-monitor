import React from "react";
import { HttpError, IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { User } from "../../types";
import UserForm from "../../forms/UserForm";

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<User, HttpError, User>();
    return (
        <Edit saveButtonProps={saveButtonProps}>
          <UserForm formProps={formProps} mode="edit"/>
        </Edit>
    );
};

