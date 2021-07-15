import { PageHeader, Popover, Avatar, Button } from "antd";
import { useRouter } from "next/router";
import { UserOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Link from "next/link";

const MainLayout = ({ children, title, subTitle, hasBack }) => {
  const [token, setToken] = useState();
  const Router = useRouter();
  const handleLogout = async () => {
    await Cookies.remove("token");
    await Cookies.remove("user");
    Router.reload();
  };

  const content = (
    <div>
      <Button onClick={handleLogout} type="primary" danger>
        Logout
      </Button>
    </div>
  );

  useEffect(() => {
    const value = Cookies.get("token");
    console.log(value);

    if (value != "undefined") setToken(value);
  }, []);

  return (
    <>
      {hasBack ? (
        <PageHeader
          className="site-page-header"
          title={title}
          subTitle={subTitle}
          onBack={() => Router.back()}
          extra={
            token
              ? [
                  <Popover trigger="click" placement="bottom" content={content}>
                    <Avatar size="large" icon={<UserOutlined />} />
                  </Popover>,
                ]
              : [
                  <>
                    <Link href={"/login"}>
                      <Button type="primary">Login</Button>
                    </Link>
                    <Link href={"/register"}>
                      <Button>Sign Up</Button>
                    </Link>
                  </>,
                ]
          }
        />
      ) : (
        <PageHeader
          className="site-page-header"
          title={title}
          subTitle={subTitle}
          extra={
            token
              ? [
                  <Popover trigger="click" placement="bottom" content={content}>
                    <Avatar size="large" icon={<UserOutlined />} />
                  </Popover>,
                ]
              : [
                  <>
                    <Link href={"/login"}>
                      <Button type="primary">Login</Button>
                    </Link>
                    <Link href={"/register"}>
                      <Button>Sign Up</Button>
                    </Link>
                  </>,
                ]
          }
        />
      )}

      <div className="container">{children}</div>
    </>
  );
};

export default MainLayout;
