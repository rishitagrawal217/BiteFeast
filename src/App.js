import './App.css';
import { CartProvider } from './components/ContextReducer';

import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import MyOrders from './screens/MyOrders'; 

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
     <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<SignUp />} />
            <Route exact path="/myorders" element={<MyOrders />} /> {}
          </Routes>
        </div>
      </Router>
     </CartProvider>
  );
}

export default App;
