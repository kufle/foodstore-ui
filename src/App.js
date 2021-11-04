import React , { useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import 'upkit/dist/style.min.css';
import { listen } from './app/listener';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {
	
	useEffect(() => {
		listen();
	},[]);
	
	return (
		<Provider store={store}>
			<div className="App">
				<Router>
					<Switch>
						<Route path="/register" component={Register} />
						<Route path="/" component={Home} />
					</Switch>
				</Router>
			</div>
		</Provider>
	);
}

export default App;
