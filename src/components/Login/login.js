import "../../App.css";
import {
  LockOutlined,
  UserOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../../api";
import { ConsumerUsuario } from "../../contexts/global";

export default function Login() {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const navigate = useNavigate();
  const { user, setUser } = useContext(ConsumerUsuario);
  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: "Email o password incorrectos",
      icon: <ExclamationCircleFilled />,
      content: "¡Intenta de nuevo!",
      onOk() {},
    });
  };

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
    if (user && user.email) {
      navigate("/home");
    }
  }, []);

  const onFinish = (values) => {
    let validation = users.find(
      (user) => user.email === values.email && user.password === values.password
    );
    if (validation) {
      setUser({ ...values });
      navigate("home");
    } else {
      showConfirm();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Form
          form={form}
          name="horizontal_login"
          layout="inline"
          onFinish={(e) => onFinish(e)}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor ingresa su email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Por favor ingresa su password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                style={{ color: "white" }}
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Ingresar
              </Button>
            )}
          </Form.Item>
        </Form>
      </header>
    </div>
  );
}
