import React from 'react';
import PropTypes from 'prop-types';

import './Sidebar.scss';

const links = ['Try me', 'Statistics'];

/* global window */

const Sidebar = props => {
	const height = `${window.innerHeight}px`;
	return (
		<div className="sidebar" style={{ height }}>
			{getMenuItems(props.onMenuHover)}
		</div>
	);
};

function getMenuItems(hoverCallback) {
	return links.map(item =>
		<div
			key={item}
			className="sidebar-item"
			onMouseEnter={() => hoverCallback(item)}
		>
			<span>{item}</span>
		</div>
	);
}

Sidebar.propTypes = {
	onMenuHover: PropTypes.func.isRequired
};

export default Sidebar;
