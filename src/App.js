import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Signup from './components/Signup/Signup';
import Signin from './components/signin/Signin';
import Nav from './components/nav/Nav'

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
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
				<Nav />
				<Routes>
					<Route path="/sign-up" element={<Signup/>} />
					<Route path="/sign-in" element={<Signin/>} />
					<Route path="/" render={() => <h1>Home</h1>} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
