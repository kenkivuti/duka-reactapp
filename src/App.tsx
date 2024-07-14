import { Route, Routes } from "react-router-dom";
import Layout from "./Component/Layout";
import "./App.css";
import Home from "./Pages/Home.tsx";
import Dashboard from "./Pages/Dashboard.tsx";
import Products from "./Pages/Products.tsx";
import Sales from "./Pages/Sales.tsx";
import Register from "./Pages/Register.tsx";
import Login from "./Pages/Login.tsx";
import Protected from "./Component/ProtectedRoute.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route element={<Protected />}>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/Sales" element={<Sales />} />
          </Route>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
