
import Footer from "./Components/footer/Footer.jsx";
import "./App.css";
import Header from "./Components/header/Header";
import Home from "./Components/home/Home.jsx";
import Products from "./Components/products/products.jsx";
import { Route, BrowserRouter, Routes} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
     <div className="App">
     <Header className="ui fixed inverted main menu"/>
     <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>  
     </Routes>
    
     <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
