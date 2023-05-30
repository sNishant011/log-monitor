import { Col, Form, FormProps, Input, Row, Select } from "antd";
import { useWatch } from "antd/es/form/Form";
import { User } from "../types";

const UserForm = ({formProps, mode}: {formProps: FormProps<User>, mode?: "create" | "edit"}) => {
  const password = useWatch('password', formProps.form);
  const customOnFinish = (values: User & {confirmPassword?: string}) => {
  delete values.confirmPassword;
  delete values._id;
    if (formProps.onFinish) {
      formProps.onFinish(values);
    }
  };
  return (

        <Form {...formProps} layout="vertical"
      onFinish={customOnFinish}
    >
      <Row gutter={5}>
        <Col span={24} md={12}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter email",
              },
              {
                type: "email",
                message: "Not a valid email!",
              },
            ]}
            label={"Email"}
            name="email"
            key={"email"}
            hasFeedback
          >
            <Input type={"email"} />
          </Form.Item>
        </Col>


        <Col span={24} md={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Role is required",
              },
            ]}
            label={"Role"}
            key={"role"}
            name="role"
          >
            <Select
              style={{ width: "100%" }}
              options={[
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={5}>
        <Col span={24} md={12}>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: mode === "create" && true,
                message: "Please input password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password autoComplete="new-password" />
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              {
                required: (mode === "create" || password) && true,
                message: "Please confirm password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords that you entered do not match!"),
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password autoComplete="new-password" />
          </Form.Item>
        </Col>
      </Row>


            </Form>
  )
}

export default UserForm;
