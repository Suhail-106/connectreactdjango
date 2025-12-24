//import logo from './logo.svg';
import './App.css';
import ProductList from './context/ProductList';
// import routes form router dom;
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetails from './Product/ProductDetails';
//import product ProductProvider
import ProductProvider from "./context/Products";
import SidebarProvider from './context/SidebarContext';
import Header from './Pages/Header';
import CartProvider from './context/CartContext';
import RightCartSidebar from './Pages/RightSidebar';
import Finalpage from './Product/Finalpage';

function App() {


  return (
    <div >
      <CartProvider>
        <SidebarProvider>
          <ProductProvider>
            <Router>
              <Header />
              <RightCartSidebar/>
              <Routes>
                <Route path='/' element={<ProductList />} />
                <Route path='/product/:id' element={<ProductDetails />} />
                <Route path='/Last/:id' element={<Finalpage/>}/>
              </Routes>
            </Router>
          </ProductProvider>
        </SidebarProvider>
   </CartProvider>
      
   </div>
  );
}

export default App;
