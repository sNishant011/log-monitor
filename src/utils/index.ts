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
