import { TitleProps } from "@refinedev/core";
import { FC } from "react";

const Title: FC<TitleProps> = ({collapsed}) => {
  return (
      <div style={{display: "flex", gap: "0.5rem", alignItems: "center", justifyContent: 'center', width: '100%'}}>
      <img src="/logo.png" style={{height: '32px', width: '32px'}}/>
      {!collapsed && (
        <span>Log Monitor</span>
      )}
      </div>
  )
}

export default Title;
