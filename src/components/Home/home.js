import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row } from "antd";
import { ConsumerUsuario } from "../../contexts/global";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/layout";
import { products } from "../../api";
import { AppstoreAddOutlined } from "@ant-design/icons";

export default function Home() {
  const { user, setAddCart, addCar, setCurrent } = useContext(ConsumerUsuario);
  const [modal, contextHolder] = Modal.useModal();
  const [size, setSize] = useState("large");
  const navigate = useNavigate();

  const openModal = () => {
    modal.success({
      title: "Lo has hecho!",
      content: `Tu producto ha sido agregado correctamente`,
    });
  };

  const addCart = (product) => {
    let storageCart = localStorage.getItem("cart");
    let body = [];
    if (!storageCart) {
      body = [
        {
          user: user.email,
          products: [{ ...product, cantidad: 1 }],
          total: product.cost,
        },
      ];
      setAddCart(addCar + 1);
    } else {
      let storages = JSON.parse(storageCart);
      body = [...storages];
      let findUser = storages.findIndex(
        (storage) => storage.user === user.email
      );
      if (findUser != -1) {
        body = existProduct(storages, findUser, product);
      } else {
        body.push({
          user: user.email,
          products: [{ ...product, cantidad: 1 }],
          total: product.cost,
        });
      }
    }
    localStorage.setItem("cart", JSON.stringify(body));
    openModal();
  };

  const existProduct = (storages, indexUser, product) => {
    let index = storages[indexUser].products.findIndex(
      (cart) => cart.id === product.id
    );
    if (index != -1) {
      let cantidad = storages[indexUser].products[index].cantidad + 1;
      storages[indexUser].products[index].cantidad = cantidad;
    } else {
      setAddCart(addCar + 1);
      storages[indexUser].products.push({ ...product, cantidad: 1 });
    }
    storages[indexUser].total = storages[indexUser].total + product.cost;
    return storages;
  };

  useEffect(() => {
    if (user && !user.email) {
      navigate("/");
    }
    setCurrent("home");
  }, []);

  return (
    <div clasName="App">
      <Layout />
      {contextHolder}
      <header className="App-header">
        <h2>Lista de productos</h2>
        <Row gutter={16}>
          {products.map((product) => (
            <Col span={8} style={{ paddingTop: 15 }}>
              <Card
                title={product.name}
                extra={`$${product.cost}`}
                bordered={false}
              >
                {product.description}
                <div
                  style={{
                    paddingTop: 20,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    type="primary"
                    shape="round"
                    style={{ width: "100%" }}
                    icon={<AppstoreAddOutlined />}
                    size={size}
                    onClick={() => addCart(product)}
                  >
                    Agregar
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </header>
    </div>
  );
}
