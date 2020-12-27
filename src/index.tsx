import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<ThemeProvider theme={theme}>
		{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
		<>
			<CssBaseline />
			<App />
		</>
	</ThemeProvider>
	,
	document.querySelector('#root'),
);

serviceWorker.register(null);
