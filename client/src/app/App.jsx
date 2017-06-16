import React from 'react';

import { Sidebar } from './Sidebar';
import Algorithm from './Algorithm';
import { Statistics } from './Statistics';

import './App.scss';

/* global window */

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			route: 'Try me'
		};
	}
	menuItemChanged = menuItem => {
		if (menuItem !== this.state.route) {
			this.setState({ route: menuItem });
		}
	};
	render() {
		const height = `${window.innerHeight}px`;
		const content = this.state.route === 'Try me'
			? <Algorithm />
			: <Statistics />;
		return (
			<div className="app">
				<Sidebar onMenuHover={this.menuItemChanged} />
				<div className="content" style={{ height }}>
					{content}
				</div>
			</div>
		);
	}
}

export default App;
