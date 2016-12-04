import React from 'react';
import reactStamp from 'react-stamp';

import {Sidebar} from './Sidebar';
import Algorithm from './Algorithm';
import {Statistics} from './Statistics';

import 'react-select/dist/react-select.css';
import './App.scss';

const App = reactStamp(React).compose({
	state: {
		route: 'Try me',
		menuItemChanged(menuItem){
			if (menuItem !== this.state.route) {
				this.setState({route: menuItem});
			}
		},
	},
	menuItemChanged(menuItem){
		if (menuItem !== this.state.route) {
			this.setState({route: menuItem});
		}
	},
	render() {
		const height = window.innerHeight + 'px';
		const content = this.state.route === 'Try me' ? <Algorithm /> : <Statistics />;
		return (
			<div className="app">
				<Sidebar onMenuHover={this.menuItemChanged.bind(this)}/>
				<div className="content" style={{height}}>
					{content}
				</div>
			</div>
		);
	}
});

export default App;