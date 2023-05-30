import { TitleProps } from "@refinedev/core";
import { FC, useContext } from "react";
import { ColorModeContext } from "../../contexts/color-mode";

const Title: FC<TitleProps> = ({ collapsed }) => {
  const { mode } = useContext(ColorModeContext);
  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        color: mode === "dark" ? "white" : "inherit",
      }}
    >
      <img src="/logo.png" style={{ height: "32px", width: "32px" }} />
      {!collapsed && <span>Log Monitor</span>}
    </div>
  );
};

export default Title;
