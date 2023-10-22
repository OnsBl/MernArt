import logo from './logo.svg';
import './App.css';
import Navbar2 from './components/Navbar/Navbar2';
import ServicesSection from './components/Services/ServicesSection';
import Register from './components/Resigter/Register';
import { Routes,Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Feed from './components/feed/Feed';
import Works from './components/works/Works';
import Detail from './components/Detail/Detail';
import Orders from './components/orders/Orders';

function App() {
  return (
    <div className="App" >
    
    <Routes>

        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/Login' element={<Login></Login>}></Route>
        <Route path='/Feed' element={<Feed></Feed>}></Route>
        <Route path='/Works' element={<Works></Works>}></Route>
        <Route path='/detail' element={<Detail></Detail>}></Route>
        <Route path='/history' element={<Orders></Orders>}></Route>

    </Routes>

 

    </div>
  );
}

export default App;
