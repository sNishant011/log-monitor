import {
  DeleteButton,
  TagField,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { Space, Table } from "antd";
import { User } from "../../types";

export const UsersList: React.FC = () => {
  const { tableProps } = useTable<User>({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="_id">
        <Table.Column dataIndex="email" title="Email" />
        <Table.Column
          dataIndex="role"
          title="Role"
          render={(role) => (
            <TagField value={role} color={role === "admin" ? "blue" : "orange"} />
          )}
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
