import Cookies from "js-cookie";
import { useState } from "react";
import { ApiLogin } from "../api";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, message, Form, Input, Checkbox } from "antd";

const Login = () => {
  const Router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleLogin = (phonePass) => {
    setLoading(true);
    ApiLogin(phonePass, (data, error) => {
      setLoading(false);
      if (error) return message.error("Invalid credentials");
      Cookies.set("token", data.token);
      Cookies.set("user", JSON.stringify(data.user));
      Router.push("/");
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <div className="stripe">
          <h1>FikraSpace</h1>
        </div>
        <div className="right-side">
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={handleLogin}
            onFinishFailed={onFinishFailed}
          >
            <p className="label">Phone Number</p>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <p className="label">Password</p>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                loading={loading}
                disabled={loading}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>

          {/* <form onSubmit={handleLogin}>
            <p className="label">Phone Number</p>
            <input
              required
              placeholder="00000000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
            />
            <p className="label">Password</p>
            <input
              required
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <Button
              size="large"
              className="submit-btn"
              htmlType="submit"
              type="primary"
              loading={loading}
              disabled={loading}
            >
              Login
            </Button>
            <Link href="forgotPassword">
              <p className="forgot-link">Forgot Password?</p>
            </Link>
            <div className="links-container">
              <p>Don't have an account?</p>
              <Link href="/register">
                <p className="sign-up-link">Sign Up</p>
              </Link>
            </div>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
