import React from 'react';
import Home from './Home';
import { AuthProvider } from './context/AuthContext';
import {BrowserRouter, Routes, Route } from 'react-router-dom';




export default function App() {
	return (
		<>
		 <BrowserRouter>
		    <AuthProvider>
			  <Routes>
				  <Route path="/" element={<Home />} />
			  </Routes>
             {/* <Home /> */}
		    </AuthProvider>
		  </BrowserRouter>
		</>
	)
}
