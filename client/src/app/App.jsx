import React from 'react';

import Sidebar from './Sidebar';
import Algorithm from './Algorithm';
import Statistics from './Statistics';

import './App.scss';

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
		const content = this.state.route === 'Try me'
			? <Algorithm />
			: <Statistics />;
		return (
			<div className="app">
				<Sidebar onMenuHover={this.menuItemChanged} />
				<div className="content">
					{content}
				</div>
			</div>
		);
	}
}

export default App;
