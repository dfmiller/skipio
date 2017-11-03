import React, { Component } from 'react';
import Contacts from '../blocks/Contacts.js';
import '../css/App.css';

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			apiToken: null
		}
	}

	componentDidMount() {
		var apiToken = localStorage.getItem('apiToken')

		if (!apiToken) {
			apiToken = prompt('token')
			if (apiToken) {
				localStorage.setItem('apiToken', apiToken)
				this.setState({ apiToken: apiToken })
			}
		}
	}

	render() {

		var apiToken = localStorage.getItem('apiToken')

		if (!apiToken) {
			apiToken = prompt('token')
			if (apiToken) {
				localStorage.setItem('apiToken', apiToken)
			}
		}

		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Skipio</h1>
				</header>
				<Contacts apiToken={apiToken} />
			</div>
		);
	}
}

export default App;
