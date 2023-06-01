import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { BsCloudMoonFill, BsFillEmojiSunglassesFill } from "react-icons/bs";
import { useGetIdentity } from "@refinedev/core";
import { Layout as AntdLayout, Space, Switch, theme, Tag } from "antd";
import React, { useContext } from "react";
import { ColorModeContext } from "../../contexts/color-mode";
import { getTagColor } from "../../utils";

const { useToken } = theme;

type User = {
  _id?: string;
  email: string;
  role: "admin" | "apache" | "nginx";
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({ sticky }) => {
  const { token } = useToken();
  const { data: user } = useGetIdentity<User>();
  const { mode, setMode } = useContext(ColorModeContext);

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  return (
    <AntdLayout.Header style={headerStyles}>
      <Space>
        <Switch
          checkedChildren={<BsCloudMoonFill fontSize={"1.05rem"} />}
          unCheckedChildren={<BsFillEmojiSunglassesFill />}
          onChange={() => setMode(mode === "light" ? "dark" : "light")}
          defaultChecked={mode === "dark"}
        />
        <Space style={{ marginLeft: "8px" }} size="middle">
          {user?.role && (
            <Tag color={getTagColor(user.role)}>{user.role.toUpperCase()}</Tag>
          )}
        </Space>
      </Space>
    </AntdLayout.Header>
  );
};
