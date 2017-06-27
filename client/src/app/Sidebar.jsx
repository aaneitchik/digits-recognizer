import React from 'react';
import PropTypes from 'prop-types';

import './Sidebar.scss';

const links = ['Try me', 'Statistics'];

const Sidebar = props =>
	<div className="sidebar">
		{getMenuItems(props.onMenuHover)}
	</div>;

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
