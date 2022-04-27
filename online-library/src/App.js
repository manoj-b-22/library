import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Component/Home';
import Cart from './Component/Cart';
import SignUp from './Component/SignUp';
import SignIn from './Component/SignIn';
import Orders from "./Component/Orders";
import ManageBooks from "./Component/ManageBooks";
import Profile from './Component/Profile';
import AddBooks from './Component/AddBooks';
import LazyBooks from './Component/LazyBooks';
import LazyOrders from "./Component/LazyOrders";
import UpdateBooks from "./Component/UpdateBooks";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={< SignIn />}></Route>
          <Route exact path='/signup' element={< SignUp />}></Route>
          <Route exact path='/home' element={< Home />}></Route>
          <Route exact path='/profile' element={< Profile />}></Route>
          <Route exact path='/addbook' element={< AddBooks />}></Route>
          <Route exact path='/orders' element={< Orders />}></Route>
          <Route exact path='/cart' element={< Cart />}></Route>
          <Route exact path='/status' element={< LazyOrders />}></Route>
          <Route exact path='/books' element={< ManageBooks />}></Route>
          <Route exact path='/manage' element={< LazyBooks />}></Route>
          <Route exact path='/update' element={< UpdateBooks />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;