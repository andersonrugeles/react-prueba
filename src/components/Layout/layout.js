import {
  ImportOutlined,
  HomeOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useContext, useEffect, useState } from "react";
import { ConsumerUsuario } from "../../contexts/global";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const { user, current, addCar, setCount, setUser, setCurrent } =
    useContext(ConsumerUsuario);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const location = {
    logout: "/",
    carrito: "/cart",
    home: "/home",
  };

  const onClick = (e) => {
    if (location[e.key]) {
      navigate(location[e.key]);
      setCurrent(location[e.key]);
    }
    if (e.key === "logout") {
      setUser({});
    }

    setCurrent(e.key);
  };

  const saveItems = (count) => {
    const item = [
      {
        label: "Inicio",
        key: "home",
        icon: <HomeOutlined />,
      },
      {
        label: `Carrito ${count}`,
        key: "carrito",
        icon: <ShoppingCartOutlined />,
      },
      {
        label: user.email,
        key: "SubMenu",
        icon: <TeamOutlined />,
        children: [
          {
            type: "group",
            children: [
              {
                label: "Cerrar sesion",
                key: "logout",
                icon: <ImportOutlined />,
              },
            ],
          },
        ],
      },
    ];
    setItems(item);
  };

  const verifyProducts = () => {
    let length = 0;
    let storageCart = localStorage.getItem("cart");
    if (storageCart) {
      let storages = JSON.parse(storageCart);
      let findUser = storages.findIndex(
        (storage) => storage.user === user.email
      );
      if (findUser !== -1) {
        length = storages[findUser].products.length;
        setCount(length);
      }
    }
    saveItems(length);
  };

  useEffect(() => {
    verifyProducts();
  }, [addCar]);

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      style={{
        display: "flex",
        justifyContent: "end",
        backgroundColor: "#434344",
        color: "white",
      }}
    />
  );
};
export default Layout;
