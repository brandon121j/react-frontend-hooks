import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { jwt }  from 'jsonwebtoken';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Signup from './components/Signup/Signup';
import Signin from './components/signin/Signin';
import SignOut from './components/signout/SignOut';
import Nav from './components/nav/Nav';
import { MainMovie } from './components/movies/MainMovie';
import { MainMovieDetail } from './components/movies/MainMovieDetail';
import Profile  from './components/signin/Profile'
require('dotenv').config();


function App() {
  const [user, setUser] = useState(null);
  const key = process.env.REACT_APP_JWT_SECRET;


  useEffect(() => {
    try {
      let jwtToken = localStorage.getItem('loginToken');
      if (jwtToken) {
        let decodedToken = jwt.verify(jwtToken, key);
        if (decodedToken.exp < Date.now() / 1000) {
          setUser(null)
        } else {
          setUser({
            email: decodedToken.email,
            username: decodedToken.username,
            userID: decodedToken.userID
          })
        }
      }
    } catch(e) {
      localStorage.removeItem("loginToken")
      setUser(null)
    }
  }, [])

	return (
		<div className="App">
			<Router>
				<ToastContainer
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
				<Nav user={user}/>
				<Routes>
					<Route path="/sign-up" element={<Signup/>} />
          <Route path="/sign-in" element={<Signin setUser={setUser}/>} />
					<Route path="/sign-out" element={<SignOut setUser={setUser}/>}/>
					<Route path="/" element={<MainMovie/>} />
          <Route path="/movie-details/:imdbID" element={<MainMovieDetail/>}/>
          <Route path='/profile' element={<Profile />}/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
