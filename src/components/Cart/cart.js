import React, { useContext, useEffect, useState } from "react";
import { Avatar, List, Card, Space } from "antd";
import Layout from "../Layout/layout";
import { ConsumerUsuario } from "../../contexts/global";
import { DeleteOutlined } from "@ant-design/icons";
import { getLocalStorage } from "../../utils";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const { user, addCar, setCurrent, setAddCart } = useContext(ConsumerUsuario);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);
  const navigate = useNavigate();

  const getData = () => {
    let { index, storages } = getLocalStorage(user);
    if (index !== -1 && storages) {
      setData(storages[index].products);
      setTotal(storages[index].total);
    }
  };

  const deleteProduct = (product) => {
    let copyData = [...data];
    if (product.cantidad > 1) {
      let findIndex = copyData.findIndex((da) => da.id === product.id);
      copyData[findIndex].cantidad = copyData[findIndex].cantidad - 1;
    } else {
      copyData = copyData.filter((da) => da.id !== product.id);
      setAddCart(addCar - 1);
    }
    setData(copyData);
    updateStorage(copyData, product);
  };

  const updateStorage = (updateData, product) => {
    let { index, storages } = getLocalStorage(user);
    if (index !== -1 && storages) {
      storages[index].products = updateData;
      storages[index].total = storages[index].total - product.cost;
    }
    setTotal(storages[index].total);
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
            <>
              <List.Item
                actions={[
                  <a
                    style={{ fontSize: 20, color: "red" }}
                    onClick={() => deleteProduct(item)}
                  >
                    <DeleteOutlined />
                  </a>,
                ]}
                extra={<div>{`${item.cantidad}`}</div>}
              >
                <List.Item.Meta
                  title={item.name}
                  description={item.description}
                />
                <div>{`$${item.cost}`}</div>
              </List.Item>
              {index === data.length - 1 && (
                <List.Item
                  style={{
                    fontSize: 20,
                    backgroundColor: "#434344",
                    borderRadius: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    color: "white",
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>Total</div>
                  <List.Item.Meta />
                  <div style={{ fontWeight: "bold" }}>${total}</div>
                </List.Item>
              )}
            </>
          )}
        />
      </div>
    </>
  );
}
