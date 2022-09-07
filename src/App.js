import {Routes, Route} from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import CssBaseline from '@mui/material/CssBaseline';
import ForgetPass from './Components/ForgetPass';

function App() {
  return (
    <CssBaseline>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="/forgetPass" element={<ForgetPass />} />

      </Routes>
    </CssBaseline>
  );
}

export default App;
