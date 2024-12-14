import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home/Home'
import { Login } from './pages/Login/Login';
import { SignUp } from './pages/SignUp/SignUp';
import LandingPage from './LandingPage';

const routes = (
  <BrowserRouter>
    <Routes>
      <Route path='/dashboard' exact element={<Home/>}></Route>
      <Route path='/login' exact element={<Login/>}></Route>
      <Route path='/signup' exact element={<SignUp/>}></Route>
      <Route path='/' exact element={<LandingPage/>}></Route>
    </Routes>
  </BrowserRouter>
);

function App() {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App
