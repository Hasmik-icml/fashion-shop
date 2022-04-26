import Footer from "./Components/footer/Footer.jsx";
import "./App.css";
import Header from "./Components/header/Header";
import Home from "./Components/home/Home.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import Products from "./Components/products/products.jsx";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import LoginPage from "./Components/Login/Loginbutton.jsx";
import { useAuth0 } from '@auth0/auth0-react';
import Loading from "./Components/Loading/Loading.jsx";

function App() {
  const {isLoading} = useAuth0();
  return (
    <BrowserRouter>
   {isLoading ? <Loading/> :
      <div className="App">
          <Header className="ui fixed inverted main menu" />
          <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
        <Footer />
      </div>
}
    </BrowserRouter>
  );
}

export default App;
