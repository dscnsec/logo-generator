import React from 'react';
import Home from './Home';
import { AuthProvider } from './context/AuthContext';
import {BrowserRouter, Switch, Route } from 'react-router-dom';




export default function App() {
	return (
		<>
		 <BrowserRouter>
		    <AuthProvider>
			  <Switch>
				  <Route path="/" component={Home} />
			  </Switch>
             {/* <Home /> */}
		    </AuthProvider>
		  </BrowserRouter>
		</>
	)
}
