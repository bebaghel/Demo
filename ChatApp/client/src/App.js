import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './pages/Nav';
import Footer from './pages/footer';
import PrivateComponent from './PrivateComponent';
import Signup from './pages/Signup';
import Login from './components/Login';
import Logout from './components/Logout';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>

          <Route path='/' element={<h1>Home page</h1>} />
          <Route element={<PrivateComponent />}>
            {/* <Route path='/login' element={<h1><Login /></h1>} /> */}
            <Route path='/logout' element={<h1><Logout /></h1>} />
          </Route>
          
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Login />} />
        </Routes>

      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
