import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import jwt from 'jsonwebtoken'
import './App.css';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import Nav from './components/nav/Nav';

require('dotenv').config()

function App() {
  const [user, setUser] = useState(null);

  const key = process.env.REACT_APP_JWT_SECRET

  useEffect(() => {
    try{
      let jwtToken = localStorage.getItem("loginToken")
      if(jwtToken){
        let decodedToken = jwt.verify(jwtToken, key)
        if(decodedToken.exp < Date.now()/1000){
          setUser(null)
        }else{
          setUser({
            email: decodedToken.email,
            username : decodedToken.username,
            id: decodedToken.id
          })
        }
          
      }
    }catch(e){
      localStorage.removeItem("loginToken")
      setUser(null)
    }
    
    }, [])

  return (
    <div className="App">
      <Router>
      <Nav user={user}/>
        <Routes>
          <Route path='/signin' element={<Signin setUser={setUser}/>}/>
          <Route path='signup' element={<Signup />}/>
          <Route path/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
