import React, { useContext, useEffect, useState } from "react";
import { Avatar, List } from "antd";
import Layout from "../Layout/layout";
import { ConsumerUsuario } from "../../contexts/global";
import { DeleteOutlined } from "@ant-design/icons";
import { getLocalStorage } from "../../utils";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const { user, setCurrent } = useContext(ConsumerUsuario);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getData = () => {
    let { index, storages } = getLocalStorage(user);
    if (index !== -1 && storages) {
      setData(storages[index].products);
    }
  };

  const deleteProduct = (product) => {
    let copyData = [...data];
    let updateData = copyData.filter((da) => da.id !== product.id);
    setData(updateData);
    updateStorage(updateData);
  };

  const updateStorage = (updateData) => {
    let { index, storages } = getLocalStorage(user);
    if (index !== -1 && storages) {
      storages[index].products = updateData;
    }
    localStorage.setItem("cart", JSON.stringify(storages));
  };

  useEffect(() => {
    if (user && !user.email) {
      navigate("/");
    }
    getData();
    setCurrent("carrito");
  }, []);

  return (
    <>
      <Layout />
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Carrito de productos
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <List
          style={{ width: "50%", paddingTop: 60 }}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <a
                  style={{ fontSize: 20, color: "red" }}
                  onClick={() => deleteProduct(item)}
                >
                  <DeleteOutlined />
                </a>,
              ]}
            >
              <List.Item.Meta
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    </>
  );
}
