import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/login";
import "./App.css";
import { ProviderUsuario } from "./contexts/global";
import NotFound from "./components/404/notFound";
import Home from "./components/Home/home";
import Cart from "./components/Cart/cart";

export default function App() {
  const [user, setUser] = React.useState({ email: "", password: "" });
  const [count, setCount] = React.useState(0);
  const [addCar, setAddCart] = React.useState(0);
  const [current, setCurrent] = React.useState('');
  return (
    <ProviderUsuario
      value={{
        user,
        count,
        addCar,
        current,
        setCurrent,
        setAddCart,
        setCount,
        setUser,
      }}
    >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route index path="home" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ProviderUsuario>
  );
}
