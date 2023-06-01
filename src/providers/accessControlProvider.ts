import { AccessControlProvider } from "@refinedev/core";
import { getCurrentUser } from "../utils";

export const accessControlProvider: AccessControlProvider = {
  can: async ({ resource }) => {
    try {
      const user = await getCurrentUser();
      if (user.role === "admin") {
        return { can: true };
      } else {
        if (user.role === "apache" && resource?.includes("apache")) {
          return { can: true };
        } else if (user.role === "nginx" && resource?.includes("nginx")) {
          return { can: true };
        }
        return { can: false, reason: "No privileges" };
      }
    } catch (e) {
      return { can: false, reason: "Unauthorized" };
    }
  },
};
