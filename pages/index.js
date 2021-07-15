import Cookies from "js-cookie";
import RouteProtect from "../HOC/RouteProtect";
import { PageHeader, Avatar, Popover, Button, Spin } from "antd";
import { useState } from "react";

import { useEffect } from "react";
import { URL } from "../api";
import moment from "moment";
import Link from "next/link";
import PureCard from "../components/pureCard";
import MainLayout from "../components/MainLayout";
import { RightOutlined } from "@ant-design/icons";

const Home = () => {
  const [categories, setCategories] = useState();

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${URL}/categories`, requestOptions)
      .then((response) => response.json())
      .then((result) => setCategories(result.data))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <>
      <RouteProtect>
        <MainLayout title="FikraCamps Shop">
          <div className="hero-container">
            <div className="left">
              <span className="hero-type-wrapper">
                <h1 className="hero-type">
                  Welcome to <p className="hero-type main-color">FikraCamps</p>{" "}
                  Shop!
                </h1>
              </span>
              <Button size="large" className="hero-cta" type="primary">
                Start Shopping Now!
                <RightOutlined className="my-icon" />
              </Button>
            </div>
            <div className="right">
              <img src="./images/hero.svg" alt="" />
            </div>
          </div>

          <div className="home-content">
            {!!categories ? (
              categories?.[0].map((e) => (
                <PureCard item={e} link="/subCategories" />
              ))
            ) : (
              <Spin size="large" />
            )}
          </div>
        </MainLayout>
      </RouteProtect>
    </>
  );
};

export default Home;
