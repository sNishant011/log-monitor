import { AuthPage } from "@refinedev/antd";
import Title from "../../components/themedLayout/title";

export const Login = () => {
  return (
    <AuthPage
      title={<Title collapsed={false} />}
      type="login"
      forgotPasswordLink={""}
      registerLink={""}
      formProps={{
        initialValues: { email: "user@admin.com", password: "Admin@011#" },
      }}
      rememberMe={false}
    />
  );
};
