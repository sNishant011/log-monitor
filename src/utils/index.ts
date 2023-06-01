import { USER_KEY } from "../constants";
import { User } from "../types";
import axiosInstance from "./axiosInstance";

export const getTagColor = (role: "admin" | "apache" | "nginx") => {
  switch (role) {
    case "admin":
      return "blue";
    case "apache":
      return "red";
    case "nginx":
      return "green";
    default:
      return "grey";
  }
};

export const getCurrentUser = async () => {
  const localUser = localStorage.getItem(USER_KEY);
  if (localUser) {
    const user: User = JSON.parse(localUser);
    return Promise.resolve(user);
  } else {
    const response = await axiosInstance.get<User>("/user/profile");
    const user = response.data;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return Promise.resolve(user);
  }
};

export const dashboardHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
