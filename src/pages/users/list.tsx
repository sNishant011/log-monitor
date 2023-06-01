import {
  DeleteButton,
  TagField,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { useCan } from "@refinedev/core";
import { Space, Table } from "antd";
import UnAuthorizedPage from "../../components/UnAuthorizedPage";
import { User } from "../../types";
import { getTagColor } from "../../utils";

export const UsersList: React.FC = () => {
  const { tableProps } = useTable<User>({
    syncWithLocation: true,
  });

  const canAccess = useCan({
    resource: "user",
    action: "list",
  });

  if (canAccess.data && !canAccess.data?.can) {
    return <UnAuthorizedPage />;
  }

  return (
    <List>
      <Table {...tableProps} rowKey="_id">
        <Table.Column dataIndex="email" title="Email" />
        <Table.Column
          dataIndex="role"
          title="Role"
          render={(role) => <TagField value={role} color={getTagColor(role)} />}
        />
        <Table.Column<User>
          title={"Actions"}
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record._id} />
              <ShowButton hideText size="small" recordItemId={record._id} />
              <DeleteButton hideText size="small" recordItemId={record._id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
